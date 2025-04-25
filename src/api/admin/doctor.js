// src/api/admin/doctor.js
export const updateDoctor = (id, data) => {
    return api.put(`/api/admin/doctors/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data' // 支持医生头像上传
        }
    })
}