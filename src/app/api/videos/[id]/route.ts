import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  try {
    if (!id) {
      return NextResponse.json({ error: "Missing video ID" }, { status: 400 });
    }

    const existing = await prisma.videos.findUnique({
      where: { id: Number(id) },
    });

    if (!existing) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    await prisma.videos.delete({ where: { id: Number(id) } });

    return NextResponse.json({ message: "Video deleted" });
  } catch (error) {
    console.error("DELETE /api/videos/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
