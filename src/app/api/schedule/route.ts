// app/api/schedule/route.ts
import { NextResponse } from 'next/server'
import { prisma } from "@/lib/prisma";


export async function GET() {
  try {
    const schedules = await prisma.schedule.findMany({
      orderBy: {
        id: 'asc'
      }
    })
    
    return NextResponse.json(schedules)
  } catch (error) {
    console.error('Error fetching schedules:', error)
    return NextResponse.json(
      { error: 'Failed to fetch schedules' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { day, venue, time } = body

    if (!day || !time) {
      return NextResponse.json(
        { error: 'Day and time are required' },
        { status: 400 }
      )
    }

    const schedule = await prisma.schedule.create({
      data: {
        day,
        venue: venue || '',
        time
      }
    })

    return NextResponse.json(schedule, { status: 201 })
  } catch (error) {
    console.error('Error creating schedule:', error)
    return NextResponse.json(
      { error: 'Failed to create schedule' },
      { status: 500 }
    )
  }
}

