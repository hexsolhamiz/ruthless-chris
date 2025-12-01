import { prisma } from "@/lib/prisma";

export async function GET() {
  const videos = await prisma.videos.findMany({});

  if (!videos || videos.length === 0) {
    return new Response(JSON.stringify([]), { status: 400 });
  }

  return new Response(JSON.stringify(videos), { status: 200 });
}

export async function POST(request: Request) {
    const { url } = await request.json();
    const newVideo = await prisma.videos.create({
        data: { 
            url,
        },
        });
    return new Response(JSON.stringify(newVideo), { status: 201 });
}