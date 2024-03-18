import request from '@/utils/request'

export const candidatesGetListService = (params) =>
  request.post('/candidate/list', { params })

export const hello = () => request.get('/candidate')
