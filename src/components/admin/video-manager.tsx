"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Trash2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

interface Videos {
  id : number;
  url : string;
  createdAt? : string;
}
export function VideoManager() {
  const [newUrl, setNewUrl] = useState("");
  const [videos, setVideos] = useState<Videos[]>([]);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  // -----------------------------
  // FETCH VIDEOS ON LOAD
  // -----------------------------
  const fetchVideos = async () => {
    try {
      const res = await fetch("/api/videos");
      if (!res.ok) throw new Error("Failed to fetch videos");

      const data = await res.json();
      setVideos(data);
    } catch (err) {
      toast.error("Error loading videos");
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleAddVideo = async () => {
    if (!newUrl.trim()) return;

    setLoading(true);
    const res = await fetch("/api/videos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: newUrl }),
    });

    if (!res.ok) {
      toast.error("Failed to add video.");
      setLoading(false);
      return;
    }

    toast.success("Video added successfully!");
    setSaved(true);
    setNewUrl("");
    setTimeout(() => setSaved(false), 3000);
    setLoading(false);

    fetchVideos(); // refresh list
  };

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/videos/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      toast.error("Failed to delete video");
      return;
    }

    toast.success("Video deleted");
    fetchVideos(); // refresh list
  };

  return (
    <div className="space-y-6">
      {/* Add New Video Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Video
          </CardTitle>
          <CardDescription>
            Add a new video link to your collection
          </CardDescription>
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

          <Button
            onClick={handleAddVideo}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Video
          </Button>

          {saved && (
            <Alert className="border-green-500 bg-green-500/10">
              <AlertCircle className="h-4 w-4 text-green-500" />
              <AlertDescription className="text-green-600">
                Video added successfully!
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Video List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Videos</CardTitle>
          <CardDescription>Manage uploaded video links</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {videos.length === 0 && (
            <p className="text-sm text-muted-foreground">No videos yet.</p>
          )}

          <div className="space-y-3">
            {videos.map((video) => (
              <div
                key={video.id}
                className="flex items-center justify-between border rounded-md p-3"
              >
                <span className="text-sm truncate max-w-[80%]">
                  {video.url}
                </span>

                <Button
                  variant="destructive"
                  size="icon"
                  className="hover:cursor-pointer"
                  onClick={() => handleDelete(video.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
