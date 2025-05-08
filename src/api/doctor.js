import api from '@/api/http'

// 获取当前医生的信息
export const getDoctorInfo = () => {
    return api.get('/api/doctors/me')
}

// 获取医生排班信息
export const getDoctorSchedules = () => {
    return api.get('/api/schedules/my')
}

// 获取今日患者队列
export const getTodayAppointments = () => {
    return api.get('/api/appointments/today')
}
