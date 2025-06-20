import { Globe, LockKeyhole, Users } from "lucide-react"

export enum Privacy {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
  FOLLOWERS_ONLY = "FOLLOWERS_ONLY"
}

export const getPrivacyInfo = (privacy: Privacy) => {
  switch (privacy) {
    case Privacy.PUBLIC:
      return {
        label: "Public",
        icon: Globe
      }
    case Privacy.PRIVATE:
      return {
        label: "Private",
        icon: LockKeyhole
      }
    case Privacy.FOLLOWERS_ONLY:
      return {
        label: "Followers Only",
        icon: Users
      }
    default:
      return {
        label: "Public",
        icon: Globe
      }
  }
}
