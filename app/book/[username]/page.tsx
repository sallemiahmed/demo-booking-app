"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Video, Phone, MapPin, ArrowRight } from "lucide-react";
import { DEMO_USERS, DEMO_EVENT_TYPES } from "@/lib/demo-data";

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    params.then((p) => setUsername(p.username));
  }, [params]);

  if (!username) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Find user
  const user = DEMO_USERS.find(
    (u) => u.name.toLowerCase().replace(/\s+/g, "-") === username
  );

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">User Not Found</h1>
          <p className="text-gray-600 mb-4">This booking page doesn't exist.</p>
          <Link href="/" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Go home
          </Link>
        </div>
      </div>
    );
  }

  const eventTypes = DEMO_EVENT_TYPES.filter((e) => e.userId === user.id && e.isActive);

  const getLocationIcon = (location: string) => {
    const loc = location?.toLowerCase() || "";
    if (loc.includes("zoom") || loc.includes("meet")) return <Video className="w-4 h-4" />;
    if (loc.includes("phone")) return <Phone className="w-4 h-4" />;
    return <MapPin className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <Calendar className="w-6 h-6 text-indigo-600" />
            <span className="font-semibold text-gray-900">BookEasy</span>
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Profile Header */}
        <div className="text-center mb-12">
          <Image
            src={user.image}
            alt={user.name}
            width={96}
            height={96}
            className="rounded-full mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h1>
          {user.bio && <p className="text-gray-600 max-w-md mx-auto">{user.bio}</p>}
        </div>

        {/* Event Types */}
        <div className="space-y-4">
          {eventTypes.length === 0 ? (
            <div className="text-center text-gray-500">
              No event types available.
            </div>
          ) : (
            eventTypes.map((eventType) => (
              <Link
                key={eventType.id}
                href={`/book/${username}/${eventType.slug}`}
                className="block bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-indigo-200 transition group"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-1 h-16 rounded-full flex-shrink-0"
                    style={{ backgroundColor: eventType.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-lg group-hover:text-indigo-600 transition">
                      {eventType.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
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
                    {eventType.description && (
                      <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                        {eventType.description}
                      </p>
                    )}
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition flex-shrink-0 mt-2" />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-sm text-gray-500">
        Powered by{" "}
        <Link href="/" className="text-indigo-600 hover:text-indigo-700 font-medium">
          BookEasy
        </Link>
      </div>
    </div>
  );
}
