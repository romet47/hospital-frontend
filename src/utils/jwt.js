// src/utils/jwt.js
export const parseJwt = (token) => {
    if (!token) return null
    try {
        const base64Url = token.split('.')[1]
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        return JSON.parse(atob(base64))
    } catch (e) {
        console.error('JWT解析失败:', e)
        return null
    }
}