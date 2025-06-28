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
        "https://res.cloudinary.com/zotaeus27/image/upload/w_100,h_100,c_fill,f_auto,q_auto,dpr_auto/v1751095373/28a9df75-5841-4351-9f4a-78b209514b10_fj79mu.jpg"
    },
    caption: "Hẹn gặp lại trong tương lai ❤️🎓",
    location: "Quận 9",
    images: [
      {
        url: "https://res.cloudinary.com/zotaeus27/image/upload/w_800,c_limit,f_auto,q_auto,dpr_auto/v1751095413/z6727416922650_39604402004315f1ac8f76f9ecc86784_aacvaq.jpg",
        altText: "Post Image 1"
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
        "https://res.cloudinary.com/zotaeus27/image/upload/w_100,h_100,c_fill,f_auto,q_auto,dpr_auto/v1751095373/28a9df75-5841-4351-9f4a-78b209514b10_fj79mu.jpg"
    },
    caption: "Thế giới đôi khi bé thôi, 1 vòng tay là đủ ôm trọn 🌍",
    location: "Đà Lạt",
    images: [
      {
        url: "https://res.cloudinary.com/zotaeus27/image/upload/w_800,c_limit,f_auto,q_auto,dpr_auto/v1751095415/z6743961260636_9475a6f13635712ac48a311a3b965094_ac7nhi.jpg",
        altText: "Post Image 2"
      }
    ],
    privacy: Privacy.PUBLIC,
    hashtags: ["vanhuutoan27", "dalat", "may2025"],
    likesCount: 0,
    commentsCount: 0,
    sharesCount: 0,
    bookmarksCount: 0,
    createdAt: "2025-05-20T00:00:00.000Z",
    updatedAt: "2025-05-20T00:00:00.000Z"
  },
  // {
  //   id: "p3",
  //   authorId: "a094db3e-d897-4e6b-9588-8fec7029a923",
  //   author: {
  //     id: "a094db3e-d897-4e6b-9588-8fec7029a923",
  //     fullName: "Văn Hữu Toàn",
  //     username: "vanhuutoan27",
  //     avatarUrl:
  //       "https://res.cloudinary.com/zotaeus27/image/upload/w_100,h_100,c_fill,f_auto,q_auto,dpr_auto/v1751095373/28a9df75-5841-4351-9f4a-78b209514b10_fj79mu.jpg"
  //   },
  //   caption: "Vì 1 ngày mới bắt đầu khi trời còn chưa lên ☀️",
  //   location: "Đà Lạt",
  //   images: [
  //     {
  //       url: "https://res.cloudinary.com/zotaeus27/video/upload/v1751095389/c1b06cfa-236c-4eb0-8847-8b95e688e569_ppsfby.mp4",
  //       altText: "Post Image 3"
  //     }
  //   ],
  //   privacy: Privacy.PUBLIC,
  //   hashtags: ["vanhuutoan27", "dalat", "may2025"],
  //   likesCount: 0,
  //   commentsCount: 0,
  //   sharesCount: 0,
  //   bookmarksCount: 0,
  //   createdAt: "2025-05-20T00:00:00.000Z",
  //   updatedAt: "2025-05-20T00:00:00.000Z"
  // },
  {
    id: "p4",
    authorId: "a094db3e-d897-4e6b-9588-8fec7029a923",
    author: {
      id: "a094db3e-d897-4e6b-9588-8fec7029a923",
      fullName: "Văn Hữu Toàn",
      username: "vanhuutoan27",
      avatarUrl:
        "https://res.cloudinary.com/zotaeus27/image/upload/w_100,h_100,c_fill,f_auto,q_auto,dpr_auto/v1751095373/28a9df75-5841-4351-9f4a-78b209514b10_fj79mu.jpg"
    },
    caption: "Đà Lạt tháng 5 có em ❤️🫶",
    location: "Đà Lạt",
    images: [
      {
        url: "https://res.cloudinary.com/zotaeus27/image/upload/w_800,c_limit,f_auto,q_auto,dpr_auto/v1751095203/z6721318316095_26b3285972561beebb73510195577192_rt9mo0.jpg",
        altText: "Post Image 4"
      }
    ],
    privacy: Privacy.PUBLIC,
    hashtags: ["vanhuutoan27", "dalat", "may2025"],
    likesCount: 200,
    commentsCount: 30,
    sharesCount: 15,
    bookmarksCount: 25,
    createdAt: "2025-05-20T00:00:00.000Z",
    updatedAt: "2025-05-20T00:00:00.000Z"
  },
  {
    id: "p5",
    authorId: "a094db3e-d897-4e6b-9588-8fec7029a923",
    author: {
      id: "a094db3e-d897-4e6b-9588-8fec7029a923",
      fullName: "Văn Hữu Toàn",
      username: "vanhuutoan27",
      avatarUrl:
        "https://res.cloudinary.com/zotaeus27/image/upload/w_100,h_100,c_fill,f_auto,q_auto,dpr_auto/v1751095373/28a9df75-5841-4351-9f4a-78b209514b10_fj79mu.jpg"
    },
    caption: "Mình xa thành phố tìm về 1 nơi thật an nhiên ❄️🫶",
    location: "Đà Lạt",
    images: [
      {
        url: "https://res.cloudinary.com/zotaeus27/image/upload/w_800,c_limit,f_auto,q_auto,dpr_auto/v1751095202/z6687477819732_e0db4afc5aae1f583e360609f165d2ba_zgoiom.jpg",
        altText: "Post Image 4-1"
      },
      {
        url: "https://res.cloudinary.com/zotaeus27/image/upload/w_800,c_limit,f_auto,q_auto,dpr_auto/v1751095202/z6721224280372_2760cf6faffb7d582351b07bf2722ddc_c6mdag.jpg",
        altText: "Post Image 4-2"
      },
      {
        url: "https://res.cloudinary.com/zotaeus27/image/upload/w_800,c_limit,f_auto,q_auto,dpr_auto/v1751095203/z6721224271229_e5e9dd4900284cd0f72c06a5781471ce_cmxnwq.jpg",
        altText: "Post Image 4-3"
      },
      {
        url: "https://res.cloudinary.com/zotaeus27/image/upload/w_800,c_limit,f_auto,q_auto,dpr_auto/v1751095203/z6721224298051_f8a5c07d986912755fb45deb6d6c0628_wgdorx.jpg",
        altText: "Post Image 4-4"
      }
    ],
    privacy: Privacy.PUBLIC,
    hashtags: ["zotaeus", "vanhuutoan27", "dalat", "may2025"],
    likesCount: 120,
    commentsCount: 45,
    sharesCount: 10,
    bookmarksCount: 30,
    createdAt: "2025-05-21T00:00:00.000Z",
    updatedAt: "2025-05-21T00:00:00.000Z"
  }
]
