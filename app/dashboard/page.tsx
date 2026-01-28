import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  Users,
  ArrowRight,
  Video,
  MapPin,
  Phone,
} from "lucide-react";
import {
  getDemoEventTypes,
  getUpcomingBookings,
  getDemoUser,
  getDemoEventType,
} from "@/lib/demo-data";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const userId = session.user.id;
  const eventTypes = getDemoEventTypes(userId);
  const upcomingBookings = getUpcomingBookings(userId).slice(0, 5);

  const stats = {
    totalBookings: upcomingBookings.length,
    eventTypes: eventTypes.length,
    thisWeek: upcomingBookings.filter((b) => {
      const weekFromNow = new Date();
      weekFromNow.setDate(weekFromNow.getDate() + 7);
      return b.startTime < weekFromNow;
    }).length,
  };

  const getLocationIcon = (location: string) => {
    if (location?.toLowerCase().includes("zoom") || location?.toLowerCase().includes("meet")) {
      return <Video className="w-4 h-4" />;
    }
    if (location?.toLowerCase().includes("phone")) {
      return <Phone className="w-4 h-4" />;
    }
    return <MapPin className="w-4 h-4" />;
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {session.user.name?.split(" ")[0]}!
        </h1>
        <p className="text-gray-600 mt-1">Here's what's happening with your schedule.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
              <p className="text-sm text-gray-600">Upcoming bookings</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.eventTypes}</p>
              <p className="text-sm text-gray-600">Event types</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.thisWeek}</p>
              <p className="text-sm text-gray-600">Meetings this week</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Bookings */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Bookings</h2>
            <Link
              href="/bookings"
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {upcomingBookings.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No upcoming bookings. Share your link to get started!
              </div>
            ) : (
              upcomingBookings.map((booking) => {
                const eventType = getDemoEventType(booking.eventTypeId);
                return (
                  <div key={booking.id} className="p-4 hover:bg-gray-50 transition">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-1 h-12 rounded-full"
                        style={{ backgroundColor: eventType?.color || "#6366f1" }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900">{eventType?.title}</p>
                        <p className="text-sm text-gray-600">{booking.guestName}</p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {format(booking.startTime, "MMM d, yyyy")}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {format(booking.startTime, "h:mm a")}
                          </span>
                        </div>
                      </div>
                      {booking.meetingUrl && (
                        <a
                          href={booking.meetingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-lg hover:bg-indigo-100 transition"
                        >
                          Join
                        </a>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Event Types */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Your Event Types</h2>
            <Link
              href="/event-types"
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
            >
              Manage <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {eventTypes.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No event types yet. Create one to get started!
              </div>
            ) : (
              eventTypes.map((eventType) => (
                <div key={eventType.id} className="p-4 hover:bg-gray-50 transition">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${eventType.color}20` }}
                    >
                      <Clock className="w-5 h-5" style={{ color: eventType.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">{eventType.title}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                        <span>{eventType.duration} min</span>
                        {eventType.location && (
                          <span className="flex items-center gap-1">
                            {getLocationIcon(eventType.location)}
                            {eventType.location}
                          </span>
                        )}
                      </div>
                    </div>
                    <div
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        eventType.isActive
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {eventType.isActive ? "Active" : "Inactive"}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
