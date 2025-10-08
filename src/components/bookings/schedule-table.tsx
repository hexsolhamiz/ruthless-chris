type Row = {
  day: string
  names: string
  time: string
  streaming: string
}

const rows: Row[] = [
  { day: "Monday", names: "Ava Chen, Liam Patel", time: "8:00 AM", streaming: "YouTube" },
  { day: "Tuesday", names: "Noah Singh", time: "12:30 PM", streaming: "Twitch" },
  { day: "Wednesday", names: "Sofia Garcia, Eli Park", time: "6:00 PM", streaming: "Netflix" },
  { day: "Thursday", names: "Maya Lewis", time: "9:00 AM", streaming: "Hulu" },
  { day: "Friday", names: "Oliver Kim", time: "4:00 PM", streaming: "Disney+" },
  { day: "Saturday", names: "Zoe Nguyen, Theo Brooks", time: "10:00 AM", streaming: "Prime Video" },
  { day: "Sunday", names: "Isa Lopez", time: "2:00 PM", streaming: "Apple TV+" },
]

function StreamingPill({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
      aria-label={`Streaming platform: ${label}`}
    >
      {label}
    </span>
  )
}

export default function ScheduleTable() {
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
                  Names
                </th>
                <th scope="col" className="px-4 py-3 font-medium text-foreground md:px-6">
                  Time
                </th>
                <th scope="col" className="px-4 py-3 font-medium text-foreground md:px-6">
                  Streaming
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={`${r.day}-${i}`} className="border-t hover:bg-accent/40">
                  <th scope="row" className="px-4 py-3 font-medium md:px-6">
                    {r.day}
                  </th>
                  <td className="px-4 py-3 md:px-6">{r.names}</td>
                  <td className="px-4 py-3 md:px-6">
                    <span className="whitespace-nowrap">{r.time}</span>
                  </td>
                  <td className="px-4 py-3 md:px-6">
                    <StreamingPill label={r.streaming} />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t bg-muted/30">
              <tr>
                <td colSpan={4} className="px-4 py-3 text-right text-xs text-white md:px-6">
                  7 entries • Updated just now
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  )
}
