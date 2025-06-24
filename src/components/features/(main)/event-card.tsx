"use client"

import React from "react"

import { Calendar } from "lucide-react"

interface EventCardProps {
  event: {
    id: number
    title: string
    date: string
    time: string
    location: string
    attendees: number
  }
}

function EventCard({ event }: EventCardProps) {
  return (
    <div className="hover:bg-border flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 duration-200">
      <Calendar size={16} color="var(--primary)" className="opacity-70" />

      <div className="flex-1 space-y-2">
        <h4 className="line-clamp-2 text-left text-sm font-medium">{event.title}</h4>

        <div className="space-y-1">
          <p className="text-muted-foreground text-xs">
            {new Date(event.date).toLocaleDateString("vi-VN")} • {event.location}
          </p>
          <p className="text-muted-foreground text-xs">{event.attendees} attendees</p>
        </div>
      </div>
    </div>
  )
}

export default EventCard
