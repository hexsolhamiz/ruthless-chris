import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (isNaN(Number(id))) {
      return NextResponse.json(
        { error: "Invalid schedule ID" },
        { status: 400 }
      );
    }
    // Check if schedule exists
    const existingSchedule = await prisma.schedule.findUnique({
      where: { id : Number(id)},
    });

    if (!existingSchedule) {
      return NextResponse.json(
        { error: "Schedule not found" },
        { status: 404 }
      );
    }
    // Delete the schedule
    await prisma.schedule.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      { message: "Schedule deleted successfully", id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting schedule:", error);
    return NextResponse.json(
      { error: "Failed to delete schedule" },
      { status: 500 }
    );
  }
}
