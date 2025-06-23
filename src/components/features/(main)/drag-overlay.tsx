"use client"

import React from "react"

import { Upload } from "lucide-react"

interface DragOverlayProps {
  isExpanded: boolean
}

function DragOverlay({ isExpanded }: DragOverlayProps) {
  return (
    <div className="bg-primary/10 absolute inset-0 z-10 flex items-center justify-center rounded-lg backdrop-blur">
      <div className="flex flex-col items-center gap-2">
        <Upload size={isExpanded ? 40 : 28} color="var(--primary)" />

        {isExpanded && (
          <p className="text-primary text-lg font-medium">Drop images here to upload</p>
        )}
      </div>
    </div>
  )
}

export default DragOverlay
