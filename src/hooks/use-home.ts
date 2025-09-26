import useFetch from "@/hooks/use-fetch"
import type { QueryType } from "@/types/home"

export const useHome = () => {
  const fetch = useFetch()

  // 保存目录
  const save = (query: QueryType) => {
    return fetch.post("/function/folder/save", query)
  }

  return {
    save,
  }
}
