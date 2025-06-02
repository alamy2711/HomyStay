<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Http\Requests\StoreNotificationRequest;
use App\Http\Requests\UpdateNotificationRequest;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Send a notification to a user.
     */
    public function sendNotification($type, $subject, $content, $receiverId, $senderId = null)
    {
        Notification::create([
            'type' => $type,
            'subject' => $subject,
            'content' => $content,
            'receiver_id' => $receiverId,
            'sender_id' => $senderId,
        ]);
    }

    /**
     * Mark notification as seen.
     */
    public function markAsSeen(Request $request, Notification $notification)
    {
        if ($request->user()->id !== $notification->receiver_id) {
            return response()->json(['error' => 'Unauthorized.'], 403);
        }

        $notification->update(['is_seen' => true]);

        return response()->json(['message' => 'Notification marked as seen.']);
    }

    /**
     * Fetch notifications for authenticated user.
     */
    public function index(Request $request)
    {
        $notifications = Notification::where('receiver_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($notifications);
    }

    public function destroy(Notification $notification)
    {
        $notification->delete();
        return response()->json(['message' => 'Notification deleted successfully.']);
    }
}
