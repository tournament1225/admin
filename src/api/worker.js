import request from '@/utils/request'

export function fetchPage(query) {
  return request({
    url: '/worker/queryForPage',
    method: 'post',
    params: query
  })
}

export function setStatus(ids) {
  return request({
    url: '/worker/resetWorkers',
    method: 'post',
    params: ids
  })
}
