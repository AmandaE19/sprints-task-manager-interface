import { useState } from "react";
import * as C from "./styled";
import { updateTask } from "../../services/ApiBackend";

const ModalTask = ({ task, setModalTask }) => {
	const [taskName, setTaskName] = useState(task.name);
	const [taskDesc, setTaskDesc] = useState(task.description);
	const [taskStatus, setTaskStatus] = useState(task.status);
	const [taskSprint, setTaskSprint] = useState(task.sprint);
	const [taskOwner, setTaskOwner] = useState(task.assignedTo);

	const isAdmin = localStorage.getItem("role") === "admin";

	const handleUpdateTask = async () => {
		try {
			const response = await updateTask(
				task._id,
				taskName,
				taskDesc,
				taskStatus,
				taskSprint,
				taskOwner
			);
			console.log(response);
			if (response.status === 200) alert("Tarefa atualizada com sucesso");
			window.location.reload();
		} catch (error) {
			alert("Erro ao atualizar tarefa");
			console.error("Erro ao criar nova tarefa: ", error);
		}
	};

	return (
		<C.ModalOverlay>
			<C.ModalContent onClick={(e) => e.stopPropagation()}>
				<h2>Detalhes</h2>

				<C.Input>
					<input
						id="taskName"
						placeholder=" "
						value={taskName}
						onChange={(e) => setTaskName(e.target.value)}
						readOnly={!isAdmin}
					/>
					<label htmlFor="taskName">Nome da Tarefa</label>
				</C.Input>

				<C.Input>
					<input
						id="taskDesc"
						placeholder=" "
						value={taskDesc}
						onChange={(e) => setTaskDesc(e.target.value)}
						readOnly={!isAdmin}
					/>
					<label htmlFor="taskDesc">Descrição da Tarefa</label>
				</C.Input>

				<C.Input>
					<select
						id="taskStatus"
						value={taskStatus}
						onChange={(e) => setTaskStatus(e.target.value)}
						disabled={!isAdmin}
					>
						<option value="TODO">To do</option>
						<option value="DOING">Doing</option>
						<option value="DONE">Done</option>
					</select>
					<label htmlFor="taskStatus">Status da Tarefa</label>
				</C.Input>

				<C.Input>
					<input
						id="taskSprint"
						placeholder=" "
						value={taskSprint}
						onChange={(e) => setTaskSprint(e.target.value)}
						readOnly={!isAdmin}
					/>
					<label htmlFor="taskSprint">Sprint da Tarefa</label>
				</C.Input>

				<C.Input>
					<input
						id="taskOwner"
						placeholder=" "
						value={taskOwner}
						onChange={(e) => setTaskOwner(e.target.value)}
						readOnly={!isAdmin}
					/>
					<label htmlFor="taskOwner">Responsável pela Tarefa</label>
				</C.Input>

				{isAdmin && <button onClick={handleUpdateTask}>Editar</button>}
				<button onClick={() => setModalTask()}>Fechar</button>
			</C.ModalContent>
		</C.ModalOverlay>
	);
};

export default ModalTask
