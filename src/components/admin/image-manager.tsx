"use client";

import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, Loader2, AlertCircle, Image as ImageIcon, Pencil } from "lucide-react";
import Image from "next/image";

type ImageData = {
  id: number;
  url: string;
  type: string;
  createdAt: string;
  updatedAt: string;
};

export function ImageManager() {
  const [currentImage, setCurrentImage] = useState<ImageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch current banner image
  const fetchImage = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/images?type=banner");

      if (!response.ok) {
        if (response.status === 404) {
          console.log("No banner image found");
          setCurrentImage(null);
          return;
        }
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Fetched image:", data);
      setCurrentImage(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load image";
      console.error("Error fetching image:", err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }

      setSelectedFile(file);
      setError(null);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload and update image
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      setError("Please select an image");
      return;
    }

    try {
      setIsUploading(true);
      setError(null);

      // Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", selectedFile);

      console.log("Uploading image to Cloudinary...");
      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image to Cloudinary");
      }

      const { url } = await uploadResponse.json();
      console.log("Uploaded to Cloudinary:", url);

      // Update or create image record
      let imageResponse;
      if (currentImage) {
        console.log("Updating existing image...");
        imageResponse = await fetch(`/api/images/${currentImage.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url, type: "banner" }),
        });
      } else {
        console.log("Creating new image record...");
        imageResponse = await fetch("/api/images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url, type: "banner" }),
        });
      }

      if (!imageResponse.ok) {
        throw new Error("Failed to save image");
      }

      const updatedImage = await imageResponse.json();
      console.log("Image saved:", updatedImage);

      setCurrentImage(updatedImage);
      setIsDialogOpen(false);
      setSelectedFile(null);
      setPreviewUrl(null);

      // Refresh
      await fetchImage();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update image";
      console.error("Error updating image:", err);
      setError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Banner Image</h2>
          <p className="text-gray-400 text-sm mt-1">
            Manage your banner image displayed on the homepage
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Pencil className="h-4 w-4 mr-2" />
              Update Image
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Update Banner Image</DialogTitle>
                <DialogDescription>
                  Upload a new banner image. Recommended size: 500x500px
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="image">Image File</Label>
                  <input
                    ref={fileInputRef}
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {selectedFile ? selectedFile.name : "Choose Image"}
                  </Button>
                </div>

                {/* Preview */}
                {previewUrl && (
                  <div className="flex justify-center">
                    <div className="relative w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                      <Image
                        src={previewUrl}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setSelectedFile(null);
                    setPreviewUrl(null);
                    setError(null);
                  }}
                  disabled={isUploading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isUploading || !selectedFile}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    "Update Image"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Current Image Display */}
      {loading ? (
        <div className="flex justify-center items-center py-12 border border-gray-700 rounded-lg">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : currentImage ? (
        <div className="border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Current Banner</h3>
          <div className="flex justify-center items-center bg-white/10 rounded-2xl p-8">
            <div className="relative w-64 h-64">
              <Image
                src={currentImage.url}
                alt="Current banner"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-400 text-center">
            Last updated: {new Date(currentImage.updatedAt).toLocaleString()}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed border-gray-700 rounded-lg">
          <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400">No banner image found. Upload one to get started!</p>
        </div>
      )}
    </div>
  );
}