'use client'

import { useEffect, useState } from 'react'

type Row = {
  id: number
  day: string
  venue: string
  time: string
}

export default function ScheduleTable() {
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSchedule() {
      try {
        const response = await fetch('/api/schedule')
        if (!response.ok) {
          throw new Error('Failed to fetch schedule')
        }
        const data = await response.json()
        setRows(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchSchedule()
  }, [])

  if (loading) {
    return (
      <section aria-labelledby="schedule-title" className="w-full bg-blue-950">
        <div className="bg-blue-950 rounded-lg border text-card-foreground shadow-sm">
          <div className="p-4 md:p-6 text-center text-white">
            Loading schedule...
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section aria-labelledby="schedule-title" className="w-full bg-blue-950">
        <div className="bg-blue-950 rounded-lg border text-card-foreground shadow-sm">
          <div className="p-4 md:p-6 text-center text-red-400">
            Error: {error}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section aria-labelledby="schedule-title" className="w-full bg-blue-950">
      <div className="bg-blue-950 rounded-lg border text-card-foreground shadow-sm">
        <div className="p-4 md:p-6">
          <h2 id="schedule-title" className="text-center text-white text-xl font-semibold md:text-2xl">
            Show Schedule
          </h2>
          <p className="mt-1 text-sm text-center text-white">All times are local.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-t text-xs text-white">
            <caption className="sr-only">Weekly schedule for streams across platforms</caption>
            <thead className="bg-muted/50">
              <tr className="text-left">
                <th scope="col" className="px-4 py-3 font-medium text-foreground md:px-6">
                  Day
                </th>
                <th scope="col" className="px-4 py-3 font-medium text-foreground md:px-6">
                  Venues
                </th>
                <th scope="col" className="px-4 py-3 font-medium text-foreground md:px-6">
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t hover:bg-accent/40">
                  <th scope="row" className="px-4 py-3 font-medium md:px-6">
                    {r.day}
                  </th>
                  <td className="px-4 py-3 md:px-6">{r.venue}</td>
                  <td className="px-4 py-3 md:px-6">
                    <span className="whitespace-nowrap">{r.time}</span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t bg-muted/30">
              <tr>
                <td colSpan={3} className="px-4 py-3 text-right text-xs text-white md:px-6">
                  {rows.length} entries • Updated just now
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  )
}