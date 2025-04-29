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
export const fetchDoctors = (page = 0, size = 10) => {
    return request({
        url: '/api/admin/doctors',
        method: 'get',
        params: { page, size, sort: 'id,desc' },
        transformResponse: [(data) => {
            try {
                const parsed = JSON.parse(data);
                return parsed.content || parsed; // 确保返回数组
            } catch (e) {
                return data;
            }
        }]
    });
};
export const fetchDoctorById = (id) => {
    return request({
        url: `/api/admin/doctors/${id}`,
        method: 'get',
        transformResponse: [
            function (data) {
                try {
                    const parsed = JSON.parse(data);
                    // 统一数据结构
                    return {
                        id: parsed.id,
                        name: parsed.name,
                        title: parsed.title,
                        specialty: parsed.specialty,
                        department: parsed.department || { id: parsed.departmentId }
                    };
                } catch (e) {
                    return data;
                }
            }
        ]
    });
};

export const addDoctor = (data) => {
    return request({
        url: '/api/admin/doctors',
        method: 'post',
        data: data
    });
};

// 更新医生
export const updateDoctor = (data) => {
    return request({
        url: `/api/admin/doctors/${data.id}`,
        method: 'put',
        data: {
            name: data.name,
            title: data.title,
            specialty: data.specialty,
            introduction: data.introduction,
            department: {
                id: data.department.id
            }
        }
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