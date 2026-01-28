import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Clock, Globe } from "lucide-react";
import { getDemoAvailability, getDemoUser } from "@/lib/demo-data";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default async function AvailabilityPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const availability = getDemoAvailability(session.user.id);
  const user = getDemoUser(session.user.id);

  // Group by day
  const availabilityByDay = DAYS.map((day, index) => {
    const dayAvail = availability.find((a) => a.dayOfWeek === index && a.isActive);
    return {
      day,
      dayIndex: index,
      isActive: !!dayAvail,
      startTime: dayAvail?.startTime || "09:00",
      endTime: dayAvail?.endTime || "17:00",
    };
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Availability</h1>
        <p className="text-gray-600 mt-1">Set when you're available for bookings.</p>
      </div>

      {/* Timezone */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Timezone</p>
              <p className="text-sm text-gray-500">{user?.timezone || "America/New_York"}</p>
            </div>
          </div>
          <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">
            Change
          </button>
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Weekly Hours</h2>
          <p className="text-sm text-gray-500 mt-1">
            Set your regular working hours for each day of the week.
          </p>
        </div>

        <div className="divide-y divide-gray-100">
          {availabilityByDay.map((day) => (
            <div
              key={day.dayIndex}
              className={`flex items-center gap-6 p-4 ${!day.isActive ? "opacity-50" : ""}`}
            >
              {/* Toggle */}
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked={day.isActive}
                  disabled
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-indigo-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>

              {/* Day Name */}
              <div className="w-28">
                <span className="font-medium text-gray-900">{day.day}</span>
              </div>

              {/* Time Range */}
              {day.isActive ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <select
                      defaultValue={day.startTime}
                      disabled
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-black"
                    >
                      <option value="08:00">8:00 AM</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                    </select>
                  </div>
                  <span className="text-gray-400">-</span>
                  <select
                    defaultValue={day.endTime}
                    disabled
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-black"
                  >
                    <option value="16:00">4:00 PM</option>
                    <option value="17:00">5:00 PM</option>
                    <option value="18:00">6:00 PM</option>
                  </select>
                </div>
              ) : (
                <span className="text-gray-500 text-sm">Unavailable</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <button className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition">
          Save Changes
        </button>
      </div>
    </div>
  );
}
