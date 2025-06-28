"use client"

import React, { useMemo } from "react"

import { Search } from "lucide-react"

import EventCard from "../features/(main)/event-card"
import HashtagCard from "../features/(main)/hashtag-card"
import UserCard from "../shared/user-card"
import { Input } from "../ui/input"
import { Separator } from "../ui/separator"

const TRENDING_HASHTAGS = [
  { id: 1, tag: "travel", count: 2400, trend: "up" },
  { id: 2, tag: "food", count: 1850, trend: "up" },
  { id: 3, tag: "nature", count: 1200, trend: "stable" },
  { id: 4, tag: "art", count: 980, trend: "up" },
  { id: 5, tag: "health", count: 756, trend: "down" }
] as const

const UPCOMING_EVENTS = [
  {
    id: 1,
    title: "Triển lãm Tranh Sơn Mài",
    date: "2025-07-15",
    time: "09:00 AM",
    location: "Bảo tàng Mỹ thuật",
    attendees: 234
  },
  {
    id: 2,
    title: "Food Tour Sài Gòn",
    date: "2025-07-20",
    time: "06:00 PM",
    location: "Quận 1, TP.HCM",
    attendees: 89
  },
  {
    id: 3,
    title: "Chuyến đi Sa Pa",
    date: "2025-07-25",
    time: "05:30 AM",
    location: "Sa Pa, Lào Cai",
    attendees: 156
  }
] as const

const ONLINE_USERS = [
  {
    id: "a094db3e-d897-4e6b-9588-8fec7029a923",
    fullName: "Văn Hữu Toàn",
    username: "vanhuutoan27",
    avatarUrl:
      "https://res.cloudinary.com/zotaeus27/image/upload/w_100,h_100,c_fill,f_auto,q_auto,dpr_auto/v1751095373/28a9df75-5841-4351-9f4a-78b209514b10_fj79mu.jpg",
    status: "online",
    lastSeen: "2m"
  },
  {
    id: "20b539db-1764-4236-a46b-595d11e9e7d6",
    fullName: "Phan Khải",
    username: "khaitoir",
    avatarUrl:
      "https://res.cloudinary.com/zotaeus27/image/upload/w_100,h_100,c_fill,f_auto,q_auto,dpr_auto/v1751095376/500762646_1506618343655976_1461943053375761717_n_xgz6o3.jpg",
    status: "offline",
    lastSeen: "5m"
  },
  {
    id: "3e479fcc-ccaa-491e-9173-fb8bd12e73f0",
    fullName: "Nguyễn Quốc Đại",
    username: "shadownnguyen",
    avatarUrl:
      "https://res.cloudinary.com/zotaeus27/image/upload/w_100,h_100,c_fill,f_auto,q_auto,dpr_auto/v1751095369/272977218_917566738909962_2404494298328639775_n_gk1zof.jpg",
    status: "offline",
    lastSeen: "10m"
  },
  {
    id: "13df0ce6-57ac-49fb-983a-81c02f76d615",
    fullName: "Duy Phạm",
    username: "saophadao1472",
    avatarUrl:
      "https://res.cloudinary.com/zotaeus27/image/upload/w_100,h_100,c_fill,f_auto,q_auto,dpr_auto/v1751095384/501264081_2439519409751669_7817836673522694058_n_vpmkbm.jpg",
    status: "offline",
    lastSeen: "1h"
  },
  {
    id: "b13b39f0-8afe-43da-811c-a5c0885848ca",
    fullName: "Nguyễn Phạm Khanh",
    username: "teagon",
    avatarUrl:
      "https://res.cloudinary.com/zotaeus27/image/upload/w_100,h_100,c_fill,f_auto,q_auto,dpr_auto/v1751095372/497834851_684220240988007_6550764112132279883_n_eoepwv.jpg",
    status: "offline",
    lastSeen: "2h"
  }
] as const

function RightSidebar() {
  const itemGroups = useMemo(
    () => [
      { key: "trending", label: "Trending Hashtags", items: TRENDING_HASHTAGS.slice(0, 5) },
      { key: "events", label: "Upcoming Events", items: UPCOMING_EVENTS.slice(0, 3) },
      { key: "users", label: "Online Users", items: ONLINE_USERS.slice(0, 20) }
    ],
    []
  )

  return (
    <div>
      {itemGroups.map((group, index) => (
        <div key={group.key}>
          {group.items.length > 0 && (
            <div>
              <h3 className="text-foreground my-2 text-sm font-semibold">{group.label}</h3>

              <div className="space-y-2">
                {group.key === "users" && (
                  <div className="relative">
                    <Input type="text" placeholder="Search users..." />

                    <Search
                      size={16}
                      color="var(--primary)"
                      className="absolute top-1/2 right-3 -translate-y-1/2 opacity-70"
                    />
                  </div>
                )}

                {group.items.map((item) => {
                  if ("tag" in item) {
                    return <HashtagCard key={item.id} hashtag={item} />
                  } else if ("date" in item) {
                    return <EventCard key={item.id} event={item} />
                  } else {
                    return <UserCard key={item.id} user={item} />
                  }
                })}
              </div>
            </div>
          )}

          {index < itemGroups.length - 1 && group.items.length > 0 && (
            <Separator className="my-2" />
          )}
        </div>
      ))}
    </div>
  )
}

export default RightSidebar
