import useFetch from "@/hooks/use-fetch"
import { useState } from "react"
import type { Results } from "@/types/fetch"

interface PageStateType<T = undefined> {
  lists: T[]
  loading: boolean
  page: number
  pageSize: number
  total: number
}

type UpdatePageState = Pick<PageStateType, "page" | "pageSize">

export const usePageQuery = <T, Q = undefined>(url: string) => {
  const fetch = useFetch()
  const [pageState, setPageState] = useState<PageStateType<T>>({
    lists: [],
    loading: false,
    page: 1,
    pageSize: 20,
    total: 0,
  })

  const updatePageState = (params: Partial<UpdatePageState>) => {
    setPageState({
      ...pageState,
      ...params,
    })
  }

  const query = (params?: Q) => {
    setPageState({
      ...pageState,
      loading: true,
    })

    fetch
      .get<Results<T>>(url, {
        params,
      })
      .then((result) => {
        const { page, pageSize, total, rows } = result

        setPageState({
          ...pageState,
          page,
          pageSize,
          total,
          lists: rows,
        })
      })
      .finally(() => {
        setPageState({
          ...pageState,
          loading: false,
        })
      })
  }

  return {
    pageState,
    query,
    updatePageState,
  }
}
