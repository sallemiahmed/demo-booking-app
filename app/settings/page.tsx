import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { User, Mail, Globe, Link as LinkIcon, Bell, Shield, Trash2 } from "lucide-react";
import { getDemoUser } from "@/lib/demo-data";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = getDemoUser(session.user.id);
  const username = user?.name?.toLowerCase().replace(/\s+/g, "-") || "demo";

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account and preferences.</p>
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Profile</h2>
          <p className="text-sm text-gray-500 mt-1">Your public profile information.</p>
        </div>
        <div className="p-6 space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-6">
            <Image
              src={user?.image || "/images/avatars/demo.jpg"}
              alt={user?.name || "User"}
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
            <div>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition text-sm">
                Change Photo
              </button>
              <p className="text-xs text-gray-500 mt-2">JPG, GIF or PNG. 1MB max.</p>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                defaultValue={user?.name}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                defaultValue={user?.email}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
              />
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                defaultValue={username}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">bookeasy.app/{username}</p>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              defaultValue={user?.bio}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
            />
          </div>

          {/* Timezone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                defaultValue={user?.timezone}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white text-black"
              >
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                <option value="Europe/London">London (GMT)</option>
                <option value="Europe/Paris">Paris (CET)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-medium text-gray-900">Email notifications</p>
              <p className="text-sm text-gray-500">Receive emails for new bookings</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 text-indigo-600 rounded" />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-medium text-gray-900">Booking reminders</p>
              <p className="text-sm text-gray-500">Get reminded before your meetings</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 text-indigo-600 rounded" />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-medium text-gray-900">Cancellation alerts</p>
              <p className="text-sm text-gray-500">Be notified when bookings are cancelled</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 text-indigo-600 rounded" />
          </label>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-xl border border-red-200 overflow-hidden">
        <div className="p-6 border-b border-red-200 bg-red-50">
          <h2 className="font-semibold text-red-900 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Danger Zone
          </h2>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Delete account</p>
              <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 font-medium rounded-lg hover:bg-red-50 transition text-sm">
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
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
