import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/",
    timeout: 0,
    headers: {
        // "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    }
});

export const login = async (email, password) => {
	try {
		const response = await api.post("auth/login", {
			email,
			password,
		});
		return response.data;
	} catch (error) {
		console.error("Erro ao fazer login:", error);
		return error;
	}
};
