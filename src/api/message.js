import request from '@/utils/request'

export function fetchPage(query) {
  return request({
    url: '/message/queryForPage',
    method: 'post',
    params: query
  })
}

export function setMessageStatus(ids) {
  return request({
    url: '/message/resetTasks',
    method: 'post',
    params: ids
  })
}

