import { formatDistanceToNow } from "date-fns"

export const formatTimeAgo = (date: string): string => {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export const formatPostCount = (count: number): string => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`
  }

  return count.toString()
}
