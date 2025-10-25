import api from "./axios";

const authApi = {
    login: (data) => api.post("/login", data),
    signup: (data) => api.post("/signup", data),
    logout: () => api.delete("/logout") 
}

export default authApi;