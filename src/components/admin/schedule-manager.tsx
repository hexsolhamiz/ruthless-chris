"use client";

import { useState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Plus, Trash2, Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

type Schedule = {
    id: number;
    day: string;
    venue: string;
    time: string;
    createdAt: string;
    updatedAt: string;
};

export function ScheduleManager() {
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        day: "",
        venue: "",
        time: "",
    });

    // Fetch schedules
    const fetchSchedules = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch("/api/schedule");

            if (!response.ok) {
                throw new Error(`Failed to fetch schedules: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Fetched schedules:", data);
            setSchedules(data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to load schedules";
            console.error("Error fetching schedules:", err);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSchedules();
    }, []);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.day || !formData.time) {
            setError("Day and time are required");
            return;
        }

        try {
            setIsSubmitting(true);
            setError(null);

            console.log("Submitting schedule:", formData);

            const response = await fetch("/api/schedule", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Failed to create schedule: ${response.statusText}`);
            }

            const newSchedule = await response.json();
            console.log("Created schedule:", newSchedule);

            setSchedules([...schedules, newSchedule]);
            setFormData({ day: "", venue: "", time: "" });
            setIsDialogOpen(false);

            // Refresh the list
            await fetchSchedules();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to create schedule";
            console.error("Error creating schedule:", err);
            setError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle delete
    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this schedule?")) {
            return;
        }

        try {
            setDeletingId(id);
            setError(null);

            console.log("Deleting schedule:", id);

            const response = await fetch(`/api/schedule/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Failed to delete schedule: ${response.statusText}`);
            }

            console.log("Deleted schedule:", id);
            setSchedules(schedules.filter((s) => s.id !== id));
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to delete schedule";
            console.error("Error deleting schedule:", err);
            setError(errorMessage);
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header with Add Button */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-white">Schedule Management</h2>
                    <p className="text-gray-400 text-sm mt-1">
                        Manage your weekly schedule
                    </p>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Schedule
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <form onSubmit={handleSubmit}>
                            <DialogHeader>
                                <DialogTitle>Add New Schedule</DialogTitle>
                                <DialogDescription>
                                    Create a new schedule entry. Click save when you&apos;re done.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="day">Day *</Label>
                                    <Input
                                        id="day"
                                        placeholder="e.g., Monday"
                                        value={formData.day}
                                        onChange={(e) =>
                                            setFormData({ ...formData, day: e.target.value })
                                        }
                                        required
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="venue">Venue</Label>
                                    <Input
                                        id="venue"
                                        placeholder="e.g., Community Centre, London"
                                        value={formData.venue}
                                        onChange={(e) =>
                                            setFormData({ ...formData, venue: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="time">Time *</Label>
                                    <Input
                                        id="time"
                                        type="time"
                                        value={formData.time}
                                        onChange={(e) =>
                                            setFormData({ ...formData, time: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                            </div>

                            <DialogFooter>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsDialogOpen(false)}
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        "Save Schedule"
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

            {/* Loading State */}
            {loading ? (
                <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </div>
            ) : schedules.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-gray-700 rounded-lg">
                    <p className="text-gray-400">No schedules found. Add your first schedule!</p>
                </div>
            ) : (
                /* Schedules Table */
                <div className="border border-gray-700 rounded-lg overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-gray-700">
                                <TableHead className="text-white">Day</TableHead>
                                <TableHead className="text-white">Names</TableHead>
                                <TableHead className="text-white">Time</TableHead>
                                <TableHead className="text-white text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {schedules.map((schedule) => (
                                <TableRow key={schedule.id} className="border-gray-700">
                                    <TableCell className="font-medium text-white">
                                        {schedule.day}
                                    </TableCell>
                                    <TableCell className="text-gray-300">
                                        {schedule.venue || "-"}
                                    </TableCell>
                                    <TableCell className="text-gray-300">
                                        {schedule.time}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(schedule.id)}
                                            disabled={deletingId === schedule.id}
                                            className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                                        >
                                            {deletingId === schedule.id ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <Trash2 className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
}