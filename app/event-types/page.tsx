import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Clock, Plus, Copy, ExternalLink, Video, Phone, MapPin, MoreVertical } from "lucide-react";
import { getDemoEventTypes, getDemoUser } from "@/lib/demo-data";

export default async function EventTypesPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const eventTypes = getDemoEventTypes(session.user.id);
  const user = getDemoUser(session.user.id);
  const username = user?.name?.toLowerCase().replace(/\s+/g, "-") || "demo";

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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Event Types</h1>
          <p className="text-gray-600 mt-1">Create and manage your meeting types.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition">
          <Plus className="w-5 h-5" />
          New Event Type
        </button>
      </div>

      {/* Event Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventTypes.map((eventType) => (
          <div
            key={eventType.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition group"
          >
            {/* Color bar */}
            <div className="h-2" style={{ backgroundColor: eventType.color }} />

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{eventType.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">/{eventType.slug}</p>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition opacity-0 group-hover:opacity-100">
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {eventType.description || "No description"}
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {eventType.duration} min
                </span>
                {eventType.location && (
                  <span className="flex items-center gap-1">
                    {getLocationIcon(eventType.location)}
                    {eventType.location}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition">
                  <Copy className="w-4 h-4" />
                  Copy Link
                </button>
                <Link
                  href={`/book/${username}/${eventType.slug}`}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-50 rounded-lg transition"
                >
                  <ExternalLink className="w-4 h-4" />
                  Preview
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Card */}
        <button className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center text-gray-500 hover:border-indigo-400 hover:text-indigo-600 transition min-h-[250px]">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
            <Plus className="w-6 h-6" />
          </div>
          <span className="font-medium">Create Event Type</span>
        </button>
      </div>
    </div>
  );
}
