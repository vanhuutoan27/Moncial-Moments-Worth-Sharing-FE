const BASE_URL = process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL

export const OPTIONS = {
  avatar: "w_100,h_100,c_fill,f_auto,q_auto,dpr_auto",
  post: "w_800,c_limit,f_auto,q_auto,dpr_auto"
}

export const getCloudinaryUrl = (publicId: string, type: keyof typeof OPTIONS) => {
  return `${BASE_URL}/${OPTIONS[type]}/${publicId}`
}
