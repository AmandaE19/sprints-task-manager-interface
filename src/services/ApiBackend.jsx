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

export const handleSprints = async () => {
	try {
		const response = await api.get(`/tasks/sprints`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`
				}
			}
		)
		return response.data;
	} catch (error) {
		console.log("Erro ao pegas sprints: ", error);
		return error;
	}
}

export const tasksBySprint = async (sprintName) => {
	try {
		const response = await api.get(`/tasks/sprint/${sprintName}`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`
				}
			}
		)
		return response.data;
	} catch (error) {
		console.error("Erro ao pegar tarefas:", error);
		return error;
	}
}

export const createTask = async (taskName, taskDesc, taskSprint, taskOwner) => {
	try {
		const response = await api.post("/tasks",
			{
				name: taskName, 
				description: taskDesc, 
				status: "TODO",
				sprint: taskSprint, 
				assignedTo: taskOwner
			},
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`
				}
			}
		)
		return response;
	} catch (error) {
		console.error("Erro ao pegar tarefas:", error);
		return error;
	}
}

export const updateTask = async (taskId, taskName, taskDesc, taskStatus, taskSprint, taskOwner) => {
	try {
		const response = await api.put(`/tasks/${taskId}`,
			{
				name: taskName, 
				description: taskDesc, 
				status: taskStatus,
				sprint: taskSprint, 
				assignedTo: taskOwner
			},
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`
				}
			}
		)
		return response;
	} catch (error) {
		console.error("Erro ao atualizar tarefa:", error);
		return error;
	}
}

export const updateTaskOwner = async (taskId, newOwnerId) => {
	try {
		const response = await api.patch(`/tasks/${taskId}/responsible`, {
			assignedTo: newOwnerId
		}, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`
			}
		});
		return response;
	} catch (error) {
		console.error("Erro ao atualizar responsável:", error);
		return error;
	}
};

export const updateTaskStatus = async (taskId, newStatus) => {
	try {
		const response = await api.patch(`/tasks/${taskId}/status`, {
			status: newStatus
		}, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`
			}
		});
		return response;
	} catch (error) {
		console.error("Erro ao atualizar status:", error);
		return error;
	}
};
