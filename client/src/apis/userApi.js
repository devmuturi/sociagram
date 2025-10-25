import api from "./axios";

const userApi = {
    getAll: () => api.get("/api/users"),
    getById: (id) => api.get(`/api/users/${id}`),
    update: (id, data) => api.post(`/api/users/${id}`, {user: data}),
    delete: (id) => api.delete(`/api/users/${id}`)
}

export default userApi;