import { CommentType } from "@/schemas/comment-schema";

export const commentsData: CommentType[] = [
  // Comments for post p1 (graduation post)
  {
    id: "c1",
    authorId: "b123db3e-d897-4e6b-9588-8fec7029a924",
    author: {
      id: "b123db3e-d897-4e6b-9588-8fec7029a924",
      fullName: "Nguyễn Minh Anh",
      username: "minhanh2k3",
      avatarUrl: ""
    },
    postId: "p1",
    content: "Chúc mừng bạn đã tốt nghiệp! 🎉🎓 Thật tự hào về bạn!",
    isEdited: false,
    createdAt: "2025-05-09T16:15:00.000Z",
    updatedAt: "2025-05-09T16:15:00.000Z"
  },
  {
    id: "c2",
    authorId: "c456db3e-d897-4e6b-9588-8fec7029a925",
    author: {
      id: "c456db3e-d897-4e6b-9588-8fec7029a925",
      fullName: "Trần Văn Đức",
      username: "duc_tran",
      avatarUrl: ""
    },
    postId: "p1",
    content: "Tuyệt vời! Chúc bạn có những bước tiến mới trong tương lai ❤️",
    isEdited: false,
    createdAt: "2025-05-09T16:30:00.000Z",
    updatedAt: "2025-05-09T16:30:00.000Z"
  },
  {
    id: "c3",
    authorId: "d789db3e-d897-4e6b-9588-8fec7029a926",
    author: {
      id: "d789db3e-d897-4e6b-9588-8fec7029a926",
      fullName: "Lê Thị Hương",
      username: "huong_le",
      avatarUrl: ""
    },
    postId: "p1",
    content: "MonHealth project nhìn rất impressive đó! Keep up the good work! 💪",
    isEdited: true,
    createdAt: "2025-05-09T17:00:00.000Z",
    updatedAt: "2025-05-09T17:05:00.000Z"
  },

  // Comments for post p2 (Đà Lạt travel post)
  {
    id: "c4",
    authorId: "e012db3e-d897-4e6b-9588-8fec7029a927",
    author: {
      id: "e012db3e-d897-4e6b-9588-8fec7029a927",
      fullName: "Phạm Quang Minh",
      username: "quangminh97",
      avatarUrl: ""
    },
    postId: "p2",
    content: "Đà Lạt đẹp quá! Mình cũng muốn đi du lịch ở đây 😍",
    isEdited: false,
    createdAt: "2025-05-20T08:30:00.000Z",
    updatedAt: "2025-05-20T08:30:00.000Z"
  },

  // Comments for post p4 (Đà Lạt with someone special)
  {
    id: "c5",
    authorId: "f345db3e-d897-4e6b-9588-8fec7029a928",
    author: {
      id: "f345db3e-d897-4e6b-9588-8fec7029a928",
      fullName: "Võ Thị Mai",
      username: "mai_vo",
      avatarUrl: ""
    },
    postId: "p4",
    content: "Couple goals! Đà Lạt tháng 5 thật romantic 💕",
    isEdited: false,
    createdAt: "2025-05-20T10:15:00.000Z",
    updatedAt: "2025-05-20T10:15:00.000Z"
  },
  {
    id: "c6",
    authorId: "g678db3e-d897-4e6b-9588-8fec7029a929",
    author: {
      id: "g678db3e-d897-4e6b-9588-8fec7029a929",
      fullName: "Hoàng Anh Tuấn",
      username: "tuan_hoang",
      avatarUrl: ""
    },
    postId: "p4",
    content: "Ảnh đẹp quá bạn ơi! Chụp ở đâu vậy?",
    isEdited: false,
    createdAt: "2025-05-20T11:00:00.000Z",
    updatedAt: "2025-05-20T11:00:00.000Z"
  },
  {
    id: "c7",
    authorId: "a094db3e-d897-4e6b-9588-8fec7029a923",
    author: {
      id: "a094db3e-d897-4e6b-9588-8fec7029a923",
      fullName: "Văn Hữu Toàn",
      username: "vanhuutoan27",
      avatarUrl: ""
    },
    postId: "p4",
    content: "@tuan_hoang Mình chụp ở công viên Yersin bạn nhé! View đẹp lắm 📸",
    isEdited: false,
    createdAt: "2025-05-20T11:30:00.000Z",
    updatedAt: "2025-05-20T11:30:00.000Z"
  },

  // Comments for post p5 (Multiple photos in Đà Lạt)
  {
    id: "c8",
    authorId: "h901db3e-d897-4e6b-9588-8fec7029a930",
    author: {
      id: "h901db3e-d897-4e6b-9588-8fec7029a930",
      fullName: "Bùi Thị Lan",
      username: "lan_bui",
      avatarUrl: ""
    },
    postId: "p5",
    content: "Set ảnh này quá đỉnh! Đà Lạt mùa này đẹp thật 🌸",
    isEdited: false,
    createdAt: "2025-05-21T09:00:00.000Z",
    updatedAt: "2025-05-21T09:00:00.000Z"
  },
  {
    id: "c9",
    authorId: "i234db3e-d897-4e6b-9588-8fec7029a931",
    author: {
      id: "i234db3e-d897-4e6b-9588-8fec7029a931",
      fullName: "Ngô Văn Hùng",
      username: "hung_ngo",
      avatarUrl: ""
    },
    postId: "p5",
    content: "Caption hay quá bạn! Thật sự Đà Lạt là nơi để tìm về sự an nhiên 🏔️",
    isEdited: false,
    createdAt: "2025-05-21T10:30:00.000Z",
    updatedAt: "2025-05-21T10:30:00.000Z"
  },
  {
    id: "c10",
    authorId: "j567db3e-d897-4e6b-9588-8fec7029a932",
    author: {
      id: "j567db3e-d897-4e6b-9588-8fec7029a932",
      fullName: "Đặng Thị Thu",
      username: "thu_dang",
      avatarUrl: ""
    },
    postId: "p5",
    content: "Mình cũng đang plan đi Đà Lạt tháng sau, có recommend chỗ nào không bạn? 🗺️",
    isEdited: false,
    createdAt: "2025-05-21T14:15:00.000Z",
    updatedAt: "2025-05-21T14:15:00.000Z"
  },
  {
    id: "c11",
    authorId: "a094db3e-d897-4e6b-9588-8fec7029a923",
    author: {
      id: "a094db3e-d897-4e6b-9588-8fec7029a923",
      fullName: "Văn Hữu Toàn",
      username: "vanhuutoan27",
      avatarUrl: ""
    },
    postId: "p5",
    content:
      "@thu_dang Mình recommend cafe Cộng, chợ đêm Đà Lạt và hồ Xuân Hương nha! Must-visit places 😊",
    isEdited: false,
    createdAt: "2025-05-21T15:00:00.000Z",
    updatedAt: "2025-05-21T15:00:00.000Z"
  }
]
