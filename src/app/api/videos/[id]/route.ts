import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // adjust this path to your prisma instance

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // Check if video exists
    const existing = await prisma.videos.findUnique({
      where: { id: Number(id) },
    });

    if (!existing) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    // Delete
    await prisma.videos.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Video deleted" });
  } catch (error) {
    console.error("DELETE /api/videos/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete video" },
      { status: 500 }
    );
  }
}
