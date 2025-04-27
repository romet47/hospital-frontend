import request from '@/utils/request';

export function fetchUsers() {
    return request({
        url: '/api/admin/users',
        method: 'get'
    });
}

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

export function fetchDepartments() {
    return request({
        url: '/api/admin/departments',
        method: 'get'
    });
}

export function fetchDepartmentById(id) {
    return request({
        url: `/api/admin/departments/${id}`,
        method: 'get'
    });
}

export function addDepartment(department) {
    return request({
        url: '/api/admin/departments',
        method: 'post',
        data: department
    });
}

export function updateDepartment(department) {
    return request({
        url: `/api/admin/departments/${department.id}`,
        method: 'put',
        data: department
    });
}

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