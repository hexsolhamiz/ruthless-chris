import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { url, type } = body;

    console.log("url:", url, type);
    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const image = await prisma.images.update({
      where: { id: String(id) },
      data: { url, ...(type && { type }) },
    });

    return NextResponse.json(image);
  } catch (error) {
    console.error("Error updating image:", error);
    return NextResponse.json(
      { error: "Failed to update image" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await prisma.images.delete({
      where: { id: String(id) },
    });

    return NextResponse.json(
      { message: "Image deleted successfully", id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}
