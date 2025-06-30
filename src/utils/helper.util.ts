import { PostMediaType } from "@/validations/post.validation"

export const sanitizeHashtag = (input: string): string => {
  return input.replace(/^#/, "").trim().toLowerCase()
}

export const processImageFile = (file: File): Promise<PostMediaType> => {
  return new Promise((resolve) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      resolve({
        url: e.target?.result as string,
        altText: file.name
      })
    }

    reader.readAsDataURL(file)
  })
}
