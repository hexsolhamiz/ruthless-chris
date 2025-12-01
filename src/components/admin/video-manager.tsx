"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface VideoItem {
  id: string
  title: string
  url: string
  addedAt: Date
}

export function VideoManager() {
  const [videos, setVideos] = useState<VideoItem[]>([
    {
      id: "1",
      title: "Introduction Video",
      url: "https://youtube.com/watch?v=example1",
      addedAt: new Date("2024-01-15"),
    },
    {
      id: "2",
      title: "Tutorial Part 1",
      url: "https://youtube.com/watch?v=example2",
      addedAt: new Date("2024-01-20"),
    },
    {
      id: "3",
      title: "Behind the Scenes",
      url: "https://youtube.com/watch?v=example3",
      addedAt: new Date("2024-02-01"),
    },
  ])

  const [newTitle, setNewTitle] = useState("")
  const [newUrl, setNewUrl] = useState("")
  const [saved, setSaved] = useState(false)

  const handleAddVideo = () => {
    if (newTitle.trim() && newUrl.trim()) {
      const newVideo: VideoItem = {
        id: Date.now().toString(),
        title: newTitle,
        url: newUrl,
        addedAt: new Date(),
      }
      setVideos([newVideo, ...videos])
      setNewTitle("")
      setNewUrl("")
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  }
  return (
    <div className="space-y-6">
      {/* Add New Video Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Video
          </CardTitle>
          <CardDescription>Add a new video link to your collection</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid">
            <div className="space-y-2">
              <Label htmlFor="video-url">Video URL</Label>
              <Input
                id="video-url"
                type="url"
                placeholder="https://youtube.com/watch?v=..."
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
              />
            </div>
          </div>

          <Button onClick={handleAddVideo} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Video
          </Button>

          {saved && (
            <Alert className="border-green-500 bg-green-500/10">
              <AlertCircle className="h-4 w-4 text-green-500" />
              <AlertDescription className="text-green-600">Video added successfully!</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
