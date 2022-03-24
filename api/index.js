import axios from "axios"

const cms = axios.create({
  baseURL: "https://esogugpa-backend.herokuapp.com/",
})

export const fetchDepartmentModules = async () => {
  let start = 0
  let limit = 100
  let total = 0
  let res = []
  while (start <= total) {
    let tmp = await cms.get(
      `api/modules?pagination[start]=${start}&pagination[limit]=${limit}`
    )

    res = res.data
      ? {
          ...res,
          data: {
            data: [...res.data.data, ...tmp.data.data],
            meta: tmp.data.meta,
          },
        }
      : tmp

    total = res.data.meta.pagination.total
    start += limit
  }
  return res
}
