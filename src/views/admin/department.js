// src/api/admin/department.js
import api from '../http'

export const getDepartments = (params) => {
    return api.get('/api/admin/departments', { params })
}

export const createDepartment = (data) => {
    return api.post('/api/admin/departments', data)
}

export const updateDepartment = (id, data) => {
    return api.put(`/api/admin/departments/${id}`, data)
}

export const deleteDepartment = (id) => {
    return api.delete(`/api/admin/departments/${id}`)
}