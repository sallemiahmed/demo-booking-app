"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  Calendar,
  LayoutDashboard,
  Clock,
  CalendarDays,
  Users,
  Settings,
  LogOut,
  Link as LinkIcon,
  Copy,
  Check,
} from "lucide-react";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Event Types", href: "/event-types", icon: Clock },
  { name: "Bookings", href: "/bookings", icon: CalendarDays },
  { name: "Availability", href: "/availability", icon: Calendar },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [copied, setCopied] = useState(false);

  const bookingLink = `bookeasy.app/${session?.user?.name?.toLowerCase().replace(/\s+/g, "-") || "demo"}`;

  const copyLink = () => {
    navigator.clipboard.writeText(`https://${bookingLink}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
        {/* Logo */}
        <div className="h-16 flex items-center gap-2 px-6 border-b border-gray-200">
          <Calendar className="w-8 h-8 text-indigo-600" />
          <span className="text-xl font-bold text-gray-900">BookEasy</span>
        </div>

        {/* Booking Link */}
        <div className="p-4 border-b border-gray-200">
          <div className="text-xs font-medium text-gray-500 mb-2">Your booking link</div>
          <button
            onClick={copyLink}
            className="w-full flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition group"
          >
            <LinkIcon className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-700 truncate flex-1 text-left">{bookingLink}</span>
            {copied ? (
              <Check className="w-4 h-4 text-emerald-500" />
            ) : (
              <Copy className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-indigo-600" : "text-gray-400"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center gap-3 mb-3">
            <Image
              src={session?.user?.image || "/images/avatars/demo.jpg"}
              alt={session?.user?.name || "User"}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{session?.user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{session?.user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-64">
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
