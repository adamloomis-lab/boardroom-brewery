import { useEffect, useState } from 'react'
import { upcomingEvents, holidayHours, filterUpcomingEvents, upcomingHolidayHours } from '../data/site'

// Dated content is filtered once at build time (what the prerendered HTML
// shows) and again after mount, so a visitor arriving days after the last
// deploy never sees an event or holiday that has already passed. The first
// client render matches the server, so hydration stays clean.
export function useUpcoming() {
  const [events, setEvents] = useState(upcomingEvents)
  const [holidays, setHolidays] = useState(holidayHours)
  useEffect(() => {
    const now = new Date()
    setEvents(filterUpcomingEvents(now))
    setHolidays(upcomingHolidayHours(now))
  }, [])
  return { events, holidays }
}
