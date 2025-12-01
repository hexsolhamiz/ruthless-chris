"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Radio, Save, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function LiveStreamManager() {
  const [liveLink, setLiveLink] = useState("")
  const [isLive, setIsLive] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    if (liveLink.trim()) {
      setIsLive(true)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  }

  const handleGoOffline = () => {
    setIsLive(false)
    setLiveLink("")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Radio className="h-5 w-5" />
            Live Stream Link
          </CardTitle>
          <CardDescription>Add or update your live stream URL. This will be displayed to your viewers.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="live-link">Stream URL</Label>
            <Input
              id="live-link"
              type="url"
              placeholder="https://youtube.com/live/..."
              value={liveLink}
              onChange={(e) => setLiveLink(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Live Link
            </Button>
            {isLive && (
              <Button variant="destructive" onClick={handleGoOffline}>
                Go Offline
              </Button>
            )}
          </div>

          {saved && (
            <Alert className="border-green-500 bg-green-500/10">
              <AlertCircle className="h-4 w-4 text-green-500" />
              <AlertDescription className="text-green-600">Live stream link saved successfully!</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

    </div>
  )
}
