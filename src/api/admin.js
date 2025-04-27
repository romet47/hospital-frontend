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