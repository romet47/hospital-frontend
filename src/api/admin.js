import request from '@/utils/request'

export const fetchDepartments = () => {
    return request.get('/api/admin/departments') // 确保是GET方法
}

export function fetchUsers() {
    return request({
        url: '/api/admin/users',
        method: 'get'
    });
}

// 添加科室
export const addDepartment = (data) => {
    return request.post('/api/admin/departments', data);
};

export function fetchUserById(id) {
    return request({
        url: `/api/admin/users/${id}`,
        method: 'get'
    });
}

export function addUser(user) {
    return request({
        url: '/api/admin/users',
        method: 'post',
        data: user
    });
}

export function updateUser(user) {
    return request({
        url: `/api/admin/users/${user.id}`,
        method: 'put',
        data: user
    });
}

export function deleteUser(id) {
    return request({
        url: `/api/admin/users/${id}`,
        method: 'delete'
    });
}

export const fetchDepartmentById = (id) => {
    return request.get(`/api/admin/departments/${id}`);
};

export const updateDepartment = (id, data) => {
    return request.put(`/api/admin/departments/${id}`, data);
};

export function deleteDepartment(id) {
    return request({
        url: `/api/admin/departments/${id}`,
        method: 'delete'
    });
}

// 医生相关API
export const fetchDoctors = () => {
    return request({
        url: '/api/admin/doctors',
        method: 'get'
    });
};

export const addDoctor = (data) => {
    return request({
        url: '/api/admin/doctors',
        method: 'post',
        data: data
    });
};

export const updateDoctor = (id, data) => {
    return request({
        url: `/api/admin/doctors/${id}`,
        method: 'put',
        data: data
    });
};

export function deleteDoctor(id) {
    return request({
        url: `/api/admin/doctors/${id}`,
        method: 'delete'
    });
}

export function deleteSchedule(id) {
    return request({
        url: `/api/admin/schedules/${id}`,
        method: 'delete'
    });
}

export function fetchDepartmentStats() {
    return request({
        url: '/api/admin/stats/departments',
        method: 'get'
    });
}

// 排班相关API
export const fetchSchedules = () => {
    return request({
        url: '/api/admin/schedules',
        method: 'get'
    });
};

export const fetchScheduleById = (id) => {
    return request({
        url: `/api/admin/schedules/${id}`,
        method: 'get'
    });
};

export const addSchedule = (data) => {
    return request({
        url: '/api/admin/schedules',
        method: 'post',
        data: data
    });
};

export const updateSchedule = (data) => {
    return request({
        url: `/api/admin/schedules/${data.id}`,
        method: 'put',
        data: data
    });
};