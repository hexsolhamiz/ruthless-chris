"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "sonner"

export function VideoManager() {

  const [newUrl, setNewUrl] = useState("")
  const [saved, setSaved] = useState(false)
  const [loading,setLoading] = useState(false); 

  const handleAddVideo = async () => {
    setLoading(true);
    if (newUrl.trim()) {     
      const response = await fetch("/api/videos", {   
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: newUrl }),
      });

      if (!response.ok) {
      toast.error("Failed to add video.");
      setLoading(false);
      return;
      } else {
        toast.success("Video added successfully!");
        setSaved(true);
        setNewUrl("");
        setTimeout(() => setSaved(false), 3000);
        setLoading(false);
    }
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

          <Button onClick={handleAddVideo} disabled={loading} className="flex items-center gap-2">
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
