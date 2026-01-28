"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isPast, getDay, addMonths, subMonths } from "date-fns";
import {
  Calendar,
  Clock,
  Video,
  Phone,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Check,
  Globe,
} from "lucide-react";
import {
  DEMO_USERS,
  DEMO_EVENT_TYPES,
  DEMO_AVAILABILITY,
  DEMO_BOOKINGS,
  generateTimeSlots,
} from "@/lib/demo-data";

interface BookingPageProps {
  params: Promise<{ username: string; eventSlug: string }>;
}

export default function BookingPage({ params }: BookingPageProps) {
  const [resolvedParams, setResolvedParams] = useState<{ username: string; eventSlug: string } | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<"calendar" | "form" | "confirmed">("calendar");
  const [formData, setFormData] = useState({ name: "", email: "", notes: "" });

  // Resolve params properly with useEffect
  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  if (!resolvedParams) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const { username, eventSlug } = resolvedParams;

  // Find user and event type
  const user = DEMO_USERS.find(
    (u) => u.name.toLowerCase().replace(/\s+/g, "-") === username
  );
  const eventType = DEMO_EVENT_TYPES.find(
    (e) => e.userId === user?.id && e.slug === eventSlug
  );

  if (!user || !eventType) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Not Found</h1>
          <p className="text-gray-600 mb-4">This booking page doesn't exist.</p>
          <Link href="/" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Go home
          </Link>
        </div>
      </div>
    );
  }

  const userAvailability = DEMO_AVAILABILITY.filter((a) => a.userId === user.id);
  const userBookings = DEMO_BOOKINGS.filter((b) => b.hostId === user.id);

  // Calendar helpers - using proper immutable date operations
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startPadding = getDay(monthStart);

  const goToPrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const goToNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const isDateAvailable = (date: Date) => {
    if (isPast(date) && !isToday(date)) return false;
    const dayOfWeek = getDay(date);
    return userAvailability.some((a) => a.dayOfWeek === dayOfWeek && a.isActive);
  };

  const timeSlots = selectedDate
    ? generateTimeSlots(selectedDate, userAvailability, eventType.duration, userBookings)
    : [];

  const getLocationIcon = () => {
    const loc = eventType.location?.toLowerCase() || "";
    if (loc.includes("zoom") || loc.includes("meet")) return <Video className="w-4 h-4" />;
    if (loc.includes("phone")) return <Phone className="w-4 h-4" />;
    return <MapPin className="w-4 h-4" />;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("confirmed");
  };

  if (step === "confirmed") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Your meeting with {user.name} has been scheduled.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: eventType.color }}
              />
              <span className="font-medium text-gray-900">{eventType.title}</span>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {selectedDate && format(selectedDate, "EEEE, MMMM d, yyyy")}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {selectedTime} ({eventType.duration} min)
              </div>
              <div className="flex items-center gap-2">
                {getLocationIcon()}
                {eventType.location}
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            A confirmation email has been sent to {formData.email}
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
          >
            Done
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <Calendar className="w-6 h-6 text-indigo-600" />
            <span className="font-semibold text-gray-900">BookEasy</span>
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-[320px_1fr]">
            {/* Left sidebar - Event info */}
            <div className="p-8 border-r border-gray-200 bg-gray-50">
              <button
                onClick={() => {
                  if (step === "form") {
                    setStep("calendar");
                    setSelectedTime(null);
                  }
                }}
                className={`flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6 ${
                  step === "calendar" ? "invisible" : ""
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <Image
                src={user.image}
                alt={user.name}
                width={64}
                height={64}
                className="rounded-full mb-4"
              />
              <p className="text-gray-600 text-sm mb-1">{user.name}</p>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{eventType.title}</h1>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4" />
                  <span>{eventType.duration} min</span>
                </div>
                {eventType.location && (
                  <div className="flex items-center gap-3">
                    {getLocationIcon()}
                    <span>{eventType.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4" />
                  <span>{user.timezone}</span>
                </div>
              </div>

              {eventType.description && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600">{eventType.description}</p>
                </div>
              )}

              {selectedDate && selectedTime && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="text-sm font-medium text-gray-900">
                      {format(selectedDate, "EEEE, MMMM d")}
                    </p>
                    <p className="text-sm text-gray-600">{selectedTime}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right side - Calendar or Form */}
            <div className="p-8">
              {step === "calendar" ? (
                <>
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Select a Date & Time</h2>
                  <div className="grid md:grid-cols-[1fr_200px] gap-8">
                    {/* Calendar */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-gray-900">
                          {format(currentMonth, "MMMM yyyy")}
                        </h3>
                        <div className="flex gap-2">
                          <button
                            onClick={goToPrevMonth}
                            className="p-2 hover:bg-gray-100 rounded-lg transition"
                          >
                            <ChevronLeft className="w-5 h-5 text-gray-600" />
                          </button>
                          <button
                            onClick={goToNextMonth}
                            className="p-2 hover:bg-gray-100 rounded-lg transition"
                          >
                            <ChevronRight className="w-5 h-5 text-gray-600" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-7 gap-1 text-center text-sm">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                          <div key={day} className="py-2 text-gray-500 font-medium">
                            {day}
                          </div>
                        ))}
                        {Array.from({ length: startPadding }).map((_, i) => (
                          <div key={`pad-${i}`} />
                        ))}
                        {calendarDays.map((day) => {
                          const available = isDateAvailable(day);
                          const selected = selectedDate && isSameDay(day, selectedDate);
                          return (
                            <button
                              key={day.toISOString()}
                              onClick={() => available && setSelectedDate(day)}
                              disabled={!available}
                              className={`
                                py-3 rounded-full text-sm font-medium transition
                                ${selected ? "bg-indigo-600 text-white" : ""}
                                ${!selected && available ? "hover:bg-indigo-50 text-gray-900" : ""}
                                ${!available ? "text-gray-300 cursor-not-allowed" : ""}
                                ${isToday(day) && !selected ? "ring-2 ring-indigo-200" : ""}
                              `}
                            >
                              {format(day, "d")}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Time slots */}
                    <div>
                      {selectedDate ? (
                        <>
                          <h4 className="font-medium text-gray-900 mb-4">
                            {format(selectedDate, "EEE, MMM d")}
                          </h4>
                          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                            {timeSlots.length === 0 ? (
                              <p className="text-sm text-gray-500">No available slots</p>
                            ) : (
                              timeSlots.map((slot) => (
                                <button
                                  key={slot.time}
                                  onClick={() => {
                                    if (slot.available) {
                                      setSelectedTime(slot.time);
                                      setStep("form");
                                    }
                                  }}
                                  disabled={!slot.available}
                                  className={`
                                    w-full py-3 px-4 rounded-lg text-sm font-medium border transition
                                    ${slot.available
                                      ? "border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-400"
                                      : "border-gray-200 text-gray-300 cursor-not-allowed line-through"
                                    }
                                  `}
                                >
                                  {slot.time}
                                </button>
                              ))
                            )}
                          </div>
                        </>
                      ) : (
                        <p className="text-sm text-gray-500">Select a date to view available times</p>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Enter Your Details</h2>
                  <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Additional notes
                      </label>
                      <textarea
                        rows={4}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Please share anything that will help prepare for our meeting."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
                    >
                      Schedule Event
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
