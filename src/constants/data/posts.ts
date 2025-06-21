import { PostType } from "@/schemas/post-schema"

import { Privacy } from "../enums/privacy"

export const postsData: PostType[] = [
  {
    id: "p1",
    authorId: "a094db3e-d897-4e6b-9588-8fec7029a923",
    author: {
      id: "a094db3e-d897-4e6b-9588-8fec7029a923",
      fullName: "Văn Hữu Toàn",
      username: "vanhuutoan27",
      avatarUrl:
        "https://firebasestorage.googleapis.com/v0/b/diamoondb-1412.appspot.com/o/Moncial%2Fusers%2F28a9df75-5841-4351-9f4a-78b209514b10.jpg?alt=media&token=e316d291-6534-4c7c-ae96-a8ff35a3a946"
    },
    caption: "Hẹn gặp lại trong tương lai ❤️🎓",
    location: "Quận 9",
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/diamoondb-1412.appspot.com/o/Moncial%2Fposts%2Fz6727416922650_39604402004315f1ac8f76f9ecc86784.jpg?alt=media&token=2a64c3ed-f54c-4ef4-b973-856b7bcc5ae0",
        altText: ""
      }
    ],
    privacy: Privacy.PUBLIC,
    hashtags: ["fpt", "university", "graduation", "thesis", "defense", "2025", "monhealth"],
    likesCount: 287,
    commentsCount: 42,
    sharesCount: 18,
    bookmarksCount: 35,
    createdAt: "2025-05-09T16:00:00.207Z",
    updatedAt: "2025-05-09T16:00:00.207Z"
  },
  {
    id: "p2",
    authorId: "a094db3e-d897-4e6b-9588-8fec7029a923",
    author: {
      id: "a094db3e-d897-4e6b-9588-8fec7029a923",
      fullName: "Văn Hữu Toàn",
      username: "vanhuutoan27",
      avatarUrl:
        "https://firebasestorage.googleapis.com/v0/b/diamoondb-1412.appspot.com/o/Moncial%2Fusers%2F28a9df75-5841-4351-9f4a-78b209514b10.jpg?alt=media&token=e316d291-6534-4c7c-ae96-a8ff35a3a946"
    },
    caption: "Mình xa thành phố tìm về 1 nơi thật an nhiên ❄️🫶",
    location: "Đà Lạt",
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/diamoondb-1412.appspot.com/o/Moncial%2Fposts%2Fz6687477819732_e0db4afc5aae1f583e360609f165d2ba.jpg?alt=media&token=c409b329-221a-40bd-a431-577f162a0f9f",
        altText: "Da Lat 1"
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/diamoondb-1412.appspot.com/o/Moncial%2Fusers%2F28a9df75-5841-4351-9f4a-78b209514b10.jpg?alt=media&token=e316d291-6534-4c7c-ae96-a8ff35a3a946",
        altText: "Da Lat 2"
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/diamoondb-1412.appspot.com/o/Moncial%2Fposts%2Fz6721224271229_e5e9dd4900284cd0f72c06a5781471ce.jpg?alt=media&token=5923be03-c9ed-405f-b71f-6c77af8d037f",
        altText: "Da Lat 3"
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/diamoondb-1412.appspot.com/o/Moncial%2Fposts%2Fz6721224298051_f8a5c07d986912755fb45deb6d6c0628.jpg?alt=media&token=b4a2bd29-925d-4abe-bec1-85999920f763",
        altText: "Da Lat 4"
      }
    ],
    privacy: Privacy.PUBLIC,
    hashtags: ["zotaeus", "vanhuutoan27", "dalat"],
    likesCount: 120,
    commentsCount: 45,
    sharesCount: 10,
    bookmarksCount: 30,
    createdAt: "2025-06-19T15:03:18.207Z",
    updatedAt: "2025-06-19T15:03:18.207Z"
  },
  {
    id: "p3",
    authorId: "a094db3e-d897-4e6b-9588-8fec7029a923",
    author: {
      id: "a094db3e-d897-4e6b-9588-8fec7029a923",
      fullName: "Văn Hữu Toàn",
      username: "vanhuutoan27",
      avatarUrl:
        "https://firebasestorage.googleapis.com/v0/b/diamoondb-1412.appspot.com/o/Moncial%2Fusers%2F28a9df75-5841-4351-9f4a-78b209514b10.jpg?alt=media&token=e316d291-6534-4c7c-ae96-a8ff35a3a946"
    },
    caption: "Đà Lạt tháng 5 có em ❤️🫶",
    location: "Đà Lạt",
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/diamoondb-1412.appspot.com/o/Moncial%2Fposts%2Fz6721318316095_26b3285972561beebb73510195577192.jpg?alt=media&token=47c1f5aa-4dd0-4e05-9635-8f188a317a8c",
        altText: "Da Lat"
      }
    ],
    privacy: Privacy.PUBLIC,
    hashtags: ["vanhuutoan27", "dalat", "may2025"],
    likesCount: 200,
    commentsCount: 30,
    sharesCount: 15,
    bookmarksCount: 25,
    createdAt: "2025-06-19T15:03:18.207Z",
    updatedAt: "2025-06-19T15:03:18.207Z"
  }
]
