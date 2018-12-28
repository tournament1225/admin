import request from '@/utils/request'

export function fetchEnumObj(enumName) {
  return request({
    url: '/common/enumOptionObj/' + enumName,
    method: 'post'
  })
}

export function fetchEnumList(enumName) {
  return request({
    url: '/common/enumOptionList/' + enumName,
    method: 'post'
  })
}
