import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  Video,
  Mail,
  MessageSquare,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock3,
} from "lucide-react";
import { getUpcomingBookings, getPastBookings, getDemoEventType } from "@/lib/demo-data";

export default async function BookingsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const upcomingBookings = getUpcomingBookings(session.user.id);
  const pastBookings = getPastBookings(session.user.id);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
            <CheckCircle className="w-3 h-3" />
            Confirmed
          </span>
        );
      case "cancelled":
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
            <XCircle className="w-3 h-3" />
            Cancelled
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
            <Clock3 className="w-3 h-3" />
            {status}
          </span>
        );
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
        <p className="text-gray-600 mt-1">Manage your upcoming and past meetings.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button className="px-4 py-2 text-sm font-medium text-indigo-600 border-b-2 border-indigo-600 -mb-px">
          Upcoming ({upcomingBookings.length})
        </button>
        <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
          Past ({pastBookings.length})
        </button>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {upcomingBookings.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming bookings</h3>
            <p className="text-gray-500">Share your booking link to start receiving appointments.</p>
          </div>
        ) : (
          upcomingBookings.map((booking) => {
            const eventType = getDemoEventType(booking.eventTypeId);
            return (
              <div
                key={booking.id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition"
              >
                <div className="flex items-start gap-6">
                  {/* Date Block */}
                  <div className="text-center min-w-[80px]">
                    <div className="text-sm font-medium text-gray-500 uppercase">
                      {format(booking.startTime, "EEE")}
                    </div>
                    <div className="text-3xl font-bold text-gray-900">
                      {format(booking.startTime, "d")}
                    </div>
                    <div className="text-sm text-gray-500">{format(booking.startTime, "MMM")}</div>
                  </div>

                  {/* Color bar */}
                  <div
                    className="w-1 h-20 rounded-full flex-shrink-0"
                    style={{ backgroundColor: eventType?.color || "#6366f1" }}
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{eventType?.title}</h3>
                        <p className="text-gray-600">with {booking.guestName}</p>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {format(booking.startTime, "h:mm a")} - {format(booking.endTime, "h:mm a")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {booking.guestEmail}
                      </span>
                    </div>

                    {booking.guestNotes && (
                      <div className="flex items-start gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <p>{booking.guestNotes}</p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {booking.meetingUrl && (
                      <a
                        href={booking.meetingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition"
                      >
                        <Video className="w-4 h-4" />
                        Join Meeting
                      </a>
                    )}
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
