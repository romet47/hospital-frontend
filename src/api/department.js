import api from './http'

export const getDepartments = () => {
  return api.get('/api/departments') // 会自动携带 Token
}