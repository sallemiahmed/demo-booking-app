// Demo users
export const DEMO_USERS = [
  {
    id: "user-001",
    name: "John Miller",
    email: "john@example.com",
    password: "demo123",
    image: "/images/avatars/john.png",
    timezone: "America/New_York",
    bio: "Product Designer & UX Consultant. 10+ years helping startups build better products.",
  },
  {
    id: "user-002",
    name: "Sarah Chen",
    email: "sarah@example.com",
    password: "demo123",
    image: "/images/avatars/sarah.png",
    timezone: "America/Los_Angeles",
    bio: "Software Engineer & Tech Lead. Open to mentorship and consulting.",
  },
  {
    id: "user-003",
    name: "Mike Johnson",
    email: "mike@example.com",
    password: "demo123",
    image: "/images/avatars/mike.png",
    timezone: "Europe/London",
    bio: "Business Coach & Startup Advisor. Helping entrepreneurs scale.",
  },
  {
    id: "user-004",
    name: "Emma Davis",
    email: "emma@example.com",
    password: "demo123",
    image: "/images/avatars/emma.png",
    timezone: "America/Chicago",
    bio: "Marketing Strategist. Specializing in growth and brand development.",
  },
  {
    id: "user-005",
    name: "Demo User",
    email: "demo@example.com",
    password: "demo123",
    image: "/images/avatars/demo.png",
    timezone: "America/New_York",
    bio: "Welcome to BookEasy! This is a demo account.",
  },
];

// Event types for each user
export const DEMO_EVENT_TYPES = [
  // John's event types
  {
    id: "evt-001",
    userId: "user-001",
    title: "Quick Chat",
    slug: "quick-chat",
    description: "A quick 15-minute call to discuss your project ideas.",
    duration: 15,
    color: "#6366f1",
    location: "Google Meet",
    isActive: true,
  },
  {
    id: "evt-002",
    userId: "user-001",
    title: "Design Consultation",
    slug: "design-consultation",
    description: "In-depth design review and UX consultation for your product.",
    duration: 60,
    color: "#8b5cf6",
    location: "Zoom",
    isActive: true,
  },
  {
    id: "evt-003",
    userId: "user-001",
    title: "Portfolio Review",
    slug: "portfolio-review",
    description: "Review your design portfolio and get actionable feedback.",
    duration: 30,
    color: "#ec4899",
    location: "Google Meet",
    isActive: true,
  },
  // Sarah's event types
  {
    id: "evt-004",
    userId: "user-002",
    title: "Technical Interview Prep",
    slug: "interview-prep",
    description: "Practice coding interviews with a senior engineer.",
    duration: 45,
    color: "#10b981",
    location: "Zoom",
    isActive: true,
  },
  {
    id: "evt-005",
    userId: "user-002",
    title: "Code Review Session",
    slug: "code-review",
    description: "Get your code reviewed by an experienced developer.",
    duration: 30,
    color: "#3b82f6",
    location: "Google Meet",
    isActive: true,
  },
  // Michael's event types
  {
    id: "evt-006",
    userId: "user-003",
    title: "Startup Strategy Session",
    slug: "strategy-session",
    description: "Strategic planning for early-stage startups.",
    duration: 60,
    color: "#f59e0b",
    location: "Zoom",
    isActive: true,
  },
  {
    id: "evt-007",
    userId: "user-003",
    title: "Investor Pitch Review",
    slug: "pitch-review",
    description: "Get feedback on your investor pitch deck.",
    duration: 45,
    color: "#ef4444",
    location: "In Person",
    isActive: true,
  },
  // Emily's event types
  {
    id: "evt-008",
    userId: "user-004",
    title: "Marketing Audit",
    slug: "marketing-audit",
    description: "Comprehensive review of your marketing strategy.",
    duration: 60,
    color: "#06b6d4",
    location: "Zoom",
    isActive: true,
  },
  // Demo user event types
  {
    id: "evt-009",
    userId: "user-005",
    title: "30 Minute Meeting",
    slug: "30min",
    description: "A standard 30-minute meeting for any purpose.",
    duration: 30,
    color: "#6366f1",
    location: "Google Meet",
    isActive: true,
  },
  {
    id: "evt-010",
    userId: "user-005",
    title: "15 Minute Call",
    slug: "15min",
    description: "Quick call for brief discussions.",
    duration: 15,
    color: "#10b981",
    location: "Phone",
    isActive: true,
  },
];

// Availability schedule (Monday-Friday 9am-5pm for most users)
export const DEMO_AVAILABILITY = [
  // Alex - Mon-Fri 9am-5pm
  { id: "avail-001", userId: "user-001", dayOfWeek: 1, startTime: "09:00", endTime: "17:00", isActive: true },
  { id: "avail-002", userId: "user-001", dayOfWeek: 2, startTime: "09:00", endTime: "17:00", isActive: true },
  { id: "avail-003", userId: "user-001", dayOfWeek: 3, startTime: "09:00", endTime: "17:00", isActive: true },
  { id: "avail-004", userId: "user-001", dayOfWeek: 4, startTime: "09:00", endTime: "17:00", isActive: true },
  { id: "avail-005", userId: "user-001", dayOfWeek: 5, startTime: "09:00", endTime: "17:00", isActive: true },
  // Sarah - Mon-Fri 10am-6pm (West Coast)
  { id: "avail-006", userId: "user-002", dayOfWeek: 1, startTime: "10:00", endTime: "18:00", isActive: true },
  { id: "avail-007", userId: "user-002", dayOfWeek: 2, startTime: "10:00", endTime: "18:00", isActive: true },
  { id: "avail-008", userId: "user-002", dayOfWeek: 3, startTime: "10:00", endTime: "18:00", isActive: true },
  { id: "avail-009", userId: "user-002", dayOfWeek: 4, startTime: "10:00", endTime: "18:00", isActive: true },
  { id: "avail-010", userId: "user-002", dayOfWeek: 5, startTime: "10:00", endTime: "18:00", isActive: true },
  // Michael - Mon-Thu 8am-4pm (UK)
  { id: "avail-011", userId: "user-003", dayOfWeek: 1, startTime: "08:00", endTime: "16:00", isActive: true },
  { id: "avail-012", userId: "user-003", dayOfWeek: 2, startTime: "08:00", endTime: "16:00", isActive: true },
  { id: "avail-013", userId: "user-003", dayOfWeek: 3, startTime: "08:00", endTime: "16:00", isActive: true },
  { id: "avail-014", userId: "user-003", dayOfWeek: 4, startTime: "08:00", endTime: "16:00", isActive: true },
  // Emily - Mon-Fri 9am-5pm
  { id: "avail-015", userId: "user-004", dayOfWeek: 1, startTime: "09:00", endTime: "17:00", isActive: true },
  { id: "avail-016", userId: "user-004", dayOfWeek: 2, startTime: "09:00", endTime: "17:00", isActive: true },
  { id: "avail-017", userId: "user-004", dayOfWeek: 3, startTime: "09:00", endTime: "17:00", isActive: true },
  { id: "avail-018", userId: "user-004", dayOfWeek: 4, startTime: "09:00", endTime: "17:00", isActive: true },
  { id: "avail-019", userId: "user-004", dayOfWeek: 5, startTime: "09:00", endTime: "17:00", isActive: true },
  // Demo user - Mon-Fri 9am-6pm
  { id: "avail-020", userId: "user-005", dayOfWeek: 1, startTime: "09:00", endTime: "18:00", isActive: true },
  { id: "avail-021", userId: "user-005", dayOfWeek: 2, startTime: "09:00", endTime: "18:00", isActive: true },
  { id: "avail-022", userId: "user-005", dayOfWeek: 3, startTime: "09:00", endTime: "18:00", isActive: true },
  { id: "avail-023", userId: "user-005", dayOfWeek: 4, startTime: "09:00", endTime: "18:00", isActive: true },
  { id: "avail-024", userId: "user-005", dayOfWeek: 5, startTime: "09:00", endTime: "18:00", isActive: true },
];

// Sample bookings
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const nextWeek = new Date(today);
nextWeek.setDate(nextWeek.getDate() + 7);

export const DEMO_BOOKINGS = [
  {
    id: "book-001",
    eventTypeId: "evt-001",
    hostId: "user-001",
    guestId: "user-002",
    guestName: "Sarah Chen",
    guestEmail: "sarah@example.com",
    guestNotes: "Want to discuss a potential collaboration on a design project.",
    startTime: new Date(tomorrow.setHours(10, 0, 0, 0)),
    endTime: new Date(tomorrow.setHours(10, 15, 0, 0)),
    status: "confirmed",
    meetingUrl: "https://meet.google.com/abc-defg-hij",
  },
  {
    id: "book-002",
    eventTypeId: "evt-002",
    hostId: "user-001",
    guestId: null,
    guestName: "John External",
    guestEmail: "john@external.com",
    guestNotes: "Need help with our app redesign.",
    startTime: new Date(new Date(nextWeek).setHours(14, 0, 0, 0)),
    endTime: new Date(new Date(nextWeek).setHours(15, 0, 0, 0)),
    status: "confirmed",
    meetingUrl: "https://zoom.us/j/123456789",
  },
  {
    id: "book-003",
    eventTypeId: "evt-004",
    hostId: "user-002",
    guestId: "user-005",
    guestName: "Demo User",
    guestEmail: "demo@example.com",
    guestNotes: "Preparing for FAANG interviews.",
    startTime: new Date(new Date(tomorrow).setHours(14, 0, 0, 0)),
    endTime: new Date(new Date(tomorrow).setHours(14, 45, 0, 0)),
    status: "confirmed",
    meetingUrl: "https://zoom.us/j/987654321",
  },
  {
    id: "book-004",
    eventTypeId: "evt-006",
    hostId: "user-003",
    guestId: null,
    guestName: "Lisa Startup",
    guestEmail: "lisa@startup.io",
    guestNotes: "Series A preparation discussion.",
    startTime: new Date(new Date(nextWeek).setHours(9, 0, 0, 0)),
    endTime: new Date(new Date(nextWeek).setHours(10, 0, 0, 0)),
    status: "confirmed",
    meetingUrl: "https://zoom.us/j/111222333",
  },
  {
    id: "book-005",
    eventTypeId: "evt-009",
    hostId: "user-005",
    guestId: null,
    guestName: "Test Guest",
    guestEmail: "test@guest.com",
    guestNotes: "Testing the booking system.",
    startTime: new Date(new Date(today).setHours(15, 0, 0, 0)),
    endTime: new Date(new Date(today).setHours(15, 30, 0, 0)),
    status: "confirmed",
    meetingUrl: "https://meet.google.com/xyz-uvwx-yz",
  },
];

// Helper functions
export function getDemoUser(id: string) {
  return DEMO_USERS.find((u) => u.id === id);
}

export function getDemoUserByEmail(email: string) {
  return DEMO_USERS.find((u) => u.email === email);
}

export function getDemoEventTypes(userId: string) {
  return DEMO_EVENT_TYPES.filter((e) => e.userId === userId);
}

export function getDemoEventType(id: string) {
  return DEMO_EVENT_TYPES.find((e) => e.id === id);
}

export function getDemoEventTypeBySlug(userId: string, slug: string) {
  return DEMO_EVENT_TYPES.find((e) => e.userId === userId && e.slug === slug);
}

export function getDemoAvailability(userId: string) {
  return DEMO_AVAILABILITY.filter((a) => a.userId === userId);
}

export function getDemoBookings(userId: string) {
  return DEMO_BOOKINGS.filter((b) => b.hostId === userId || b.guestId === userId);
}

export function getDemoBookingsAsHost(userId: string) {
  return DEMO_BOOKINGS.filter((b) => b.hostId === userId);
}

export function getDemoBookingsAsGuest(userId: string) {
  return DEMO_BOOKINGS.filter((b) => b.guestId === userId);
}

export function getUpcomingBookings(userId: string) {
  const now = new Date();
  return DEMO_BOOKINGS.filter(
    (b) => (b.hostId === userId || b.guestId === userId) && b.startTime > now && b.status === "confirmed"
  ).sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
}

export function getPastBookings(userId: string) {
  const now = new Date();
  return DEMO_BOOKINGS.filter(
    (b) => (b.hostId === userId || b.guestId === userId) && b.startTime < now
  ).sort((a, b) => b.startTime.getTime() - a.startTime.getTime());
}

// Generate time slots for a given day
export function generateTimeSlots(
  date: Date,
  availability: typeof DEMO_AVAILABILITY,
  duration: number,
  existingBookings: typeof DEMO_BOOKINGS
) {
  const dayOfWeek = date.getDay();
  const dayAvailability = availability.find((a) => a.dayOfWeek === dayOfWeek && a.isActive);

  if (!dayAvailability) return [];

  const slots: { time: string; available: boolean }[] = [];
  const [startHour, startMin] = dayAvailability.startTime.split(":").map(Number);
  const [endHour, endMin] = dayAvailability.endTime.split(":").map(Number);

  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;

  for (let minutes = startMinutes; minutes + duration <= endMinutes; minutes += 30) {
    const hour = Math.floor(minutes / 60);
    const min = minutes % 60;
    const timeStr = `${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`;

    // Check if slot conflicts with existing booking
    const slotStart = new Date(date);
    slotStart.setHours(hour, min, 0, 0);
    const slotEnd = new Date(slotStart);
    slotEnd.setMinutes(slotEnd.getMinutes() + duration);

    const isBooked = existingBookings.some((booking) => {
      const bookingStart = new Date(booking.startTime);
      const bookingEnd = new Date(booking.endTime);
      return (
        booking.status === "confirmed" &&
        ((slotStart >= bookingStart && slotStart < bookingEnd) ||
          (slotEnd > bookingStart && slotEnd <= bookingEnd) ||
          (slotStart <= bookingStart && slotEnd >= bookingEnd))
      );
    });

    slots.push({ time: timeStr, available: !isBooked });
  }

  return slots;
}
