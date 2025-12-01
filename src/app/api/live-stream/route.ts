import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const livestream = await prisma.liveStream.findFirst();

  if (!livestream) {
    return NextResponse.json({ status: 401, message: "No live stream found" });
  }

  return NextResponse.json({ status: 200, url: livestream.url });
}

export async function PUT(request: Request) {
  const { url } = await request.json();

  let livestream = await prisma.liveStream.findFirst();

  if (livestream) {
    livestream = await prisma.liveStream.update({
      where: { id: livestream.id },
      data: { url },
    });
  }
   
  
return NextResponse.json({ status: 200 , message : "Live Stream updated"});
}