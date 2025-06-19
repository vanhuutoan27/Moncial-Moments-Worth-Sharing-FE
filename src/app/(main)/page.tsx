"use client"

import React from "react"

import PostCard from "@/components/features/(main)/post-card"

import { Privacy } from "@/constants/enums/Privacy"

function HomePage() {
  const postsData = [
    {
      id: "p1",
      authorId: "u1",
      author: {
        id: "u1",
        fullName: "Zotaeus",
        username: "zotaeus",
        avatarUrl:
          "https://firebasestorage.googleapis.com/v0/b/diamoondb-1412.appspot.com/o/Moncial%2Fusers%2Fz6687477819732_e0db4afc5aae1f583e360609f165d2ba.jpg?alt=media&token=4d589775-25cd-4ee1-8221-4fd935691264"
      },
      caption: "Mình xa thành phố tìm về 1 nơi thật an nhiên ❄️🫶",
      location: "Da Lat",
      images: [
        {
          url: "https://firebasestorage.googleapis.com/v0/b/diamoondb-1412.appspot.com/o/Moncial%2Fusers%2Fz6687477819732_e0db4afc5aae1f583e360609f165d2ba.jpg?alt=media&token=4d589775-25cd-4ee1-8221-4fd935691264",
          altText: "Da Lat 1"
        },
        {
          url: "https://firebasestorage.googleapis.com/v0/b/diamoondb-1412.appspot.com/o/Moncial%2Fusers%2Fz6721224280372_2760cf6faffb7d582351b07bf2722ddc.jpg?alt=media&token=0b125542-88d6-4ce3-981e-453abc29d0ba",
          altText: "Da Lat 2"
        },
        {
          url: "https://firebasestorage.googleapis.com/v0/b/diamoondb-1412.appspot.com/o/Moncial%2Fusers%2Fz6721224271229_e5e9dd4900284cd0f72c06a5781471ce.jpg?alt=media&token=0a0fd4e8-dbf0-4a33-97fc-f4e92b439bb7",
          altText: "Da Lat 3"
        },
        {
          url: "https://firebasestorage.googleapis.com/v0/b/diamoondb-1412.appspot.com/o/Moncial%2Fusers%2Fz6721224298051_f8a5c07d986912755fb45deb6d6c0628.jpg?alt=media&token=86831c11-c2b3-4d65-bc53-5593d3c70125",
          altText: "Da Lat 4"
        }
      ],
      privacy: Privacy.PUBLIC,
      hashtags: ["zotaeus", "vanhuutoan27", "dalat"],
      likesCount: 120,
      commentsCount: 45,
      sharesCount: 10,
      bookmarksCount: 30,
      createdAt: "2025-06-18T12:00:00Z",
      updatedAt: "2025-06-18T12:00:00Z"
    },
    {
      id: "p2",
      authorId: "u1",
      author: {
        id: "u1",
        fullName: "Zotaeus",
        username: "zotaeus",
        avatarUrl:
          "https://firebasestorage.googleapis.com/v0/b/diamoondb-1412.appspot.com/o/Moncial%2Fusers%2Fz6687477819732_e0db4afc5aae1f583e360609f165d2ba.jpg?alt=media&token=4d589775-25cd-4ee1-8221-4fd935691264"
      },
      caption: "Mình xa thành phố tìm về 1 nơi thật an nhiên ❄️🫶",
      location: "Da Lat",
      images: [
        {
          url: "https://firebasestorage.googleapis.com/v0/b/diamoondb-1412.appspot.com/o/Moncial%2Fusers%2Fz6721318316095_26b3285972561beebb73510195577192.jpg?alt=media&token=a62d1f6e-36c6-4ad9-a93b-01f357304a40",
          altText: "Da Lat 1"
        }
      ],
      privacy: Privacy.PUBLIC,
      hashtags: ["zotaeus", "vanhuutoan27", "dalat"],
      likesCount: 120,
      commentsCount: 45,
      sharesCount: 10,
      bookmarksCount: 30,
      createdAt: "2025-06-18T12:00:00Z",
      updatedAt: "2025-06-18T12:00:00Z"
    }
  ]

  return (
    <div className="flex flex-col items-center space-y-6">
      {postsData.map((post) => (
        <PostCard key={post.id} postData={post} />
      ))}
    </div>
  )
}

export default HomePage
