"use client"

import React, { useState } from "react"

import { MapPin } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { formatPostCount } from "@/utils/formatters"

const LOCATIONS = [
  { name: "Thành phố Hồ Chí Minh", posts: 12847 },
  { name: "Hà Nội", posts: 9234 },
  { name: "Đà Nẵng", posts: 3456 },
  { name: "Hội An", posts: 2187 },
  { name: "Nha Trang", posts: 1923 },
  { name: "Phú Quốc", posts: 1654 },
  { name: "Sapa", posts: 1432 },
  { name: "Huế", posts: 1298 },
  { name: "Đà Lạt", posts: 987 },
  { name: "Cần Thơ", posts: 654 }
] as const

interface LocationSectionProps {
  locationQuery: string
  onLocationChange: (value: string) => void
  onLocationSelect: (location: string) => void
}

function LocationSection({
  locationQuery,
  onLocationChange,
  onLocationSelect
}: LocationSectionProps) {
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false)

  const filteredLocations = LOCATIONS.filter((location) =>
    location.name.toLowerCase().includes(locationQuery.toLowerCase())
  ).slice(0, 5)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    onLocationChange(value)
    setShowSuggestions(value.length > 0)
  }

  const handleFocus = () => {
    if (locationQuery.length > 0) setShowSuggestions(true)
  }

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200)
  }

  const selectLocation = (location: string) => {
    onLocationSelect(location)
    setShowSuggestions(false)
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="location">Location</Label>

      <div className="relative">
        <Input
          id="location"
          type="text"
          value={locationQuery}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Where did this adventure take you?"
        />

        {showSuggestions && filteredLocations.length > 0 && (
          <div className="bg-popover absolute top-full right-0 left-0 z-50 mt-2 rounded-md border p-1 shadow-md">
            {filteredLocations.map((location) => (
              <div
                key={location.name}
                className="hover:bg-border hover:text-accent-foreground flex cursor-default items-center justify-between rounded-sm px-2 py-1.5 text-sm outline-hidden select-none"
                onClick={() => selectLocation(location.name)}
              >
                <div className="flex items-center gap-2">
                  <MapPin size={16} color="var(--primary)" className="opacity-70" />
                  {location.name}
                </div>
                <span className="text-muted-foreground text-xs">
                  {formatPostCount(location.posts)} posts
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default LocationSection
