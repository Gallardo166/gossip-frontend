import { format } from "date-fns"

export function getDate() {
  return format(new Date(), "yyyy-MM-dd kk:mm:ss")
}