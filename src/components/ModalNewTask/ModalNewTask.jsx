import { useState } from "react";
import * as C from "./styled";
import { createTask } from "../../services/ApiBackend";

const ModalNewTask = ({ onClose }) => {
    const [taskName, setTaskName] = useState("");
    const [taskDesc, setTaskDesc] = useState("");
    const [taskSprint, setTaskSprint] = useState("");
    const [taskOwner, setTaskOwner] = useState("");

    const createNewTask = async () => {
        try{
            const response = await createTask(taskName, taskDesc, taskSprint, taskOwner);
            response.status === 201 && alert("Tarefa Criada");
            window.location.reload();
        }catch(error){
            alert("Erro ao criar tarefa");
            console.log("Erro ao criar nova tarefa: ", error)
            return error;
        }
    }

    return (
        <C.ModalContainer>
            <C.ModalContent>
                <span>Nova Tarefa</span>

                <C.Input>
                    <input
                        id="taskName"
                        placeholder=" "
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                    <label htmlFor="taskName">Nome da Tarefa</label>
                </C.Input>

                <C.Input>
                    <input
                        id="taskDesc"
                        placeholder=" "
                        value={taskDesc}
                        onChange={(e) => setTaskDesc(e.target.value)}
                    />
                    <label htmlFor="taskDesc">Descrição da Tarefa</label>
                </C.Input>

                <C.Input>
                    <input
                        id="taskSprint"
                        placeholder=" "
                        value={taskSprint}
                        onChange={(e) => setTaskSprint(e.target.value)}
                    />
                    <label htmlFor="taskSprint">Sprint da Tarefa</label>
                </C.Input>

                <C.Input>
                    <input
                        id="taskOwner"
                        placeholder=" "
                        value={taskOwner}
                        onChange={(e) => setTaskOwner(e.target.value)}
                    />
                    <label htmlFor="taskOwner">Responsável pela Tarefa</label>
                </C.Input>

                <button onClick={createNewTask}>Criar</button>
                <button onClick={onClose}>Cancelar</button>
            </C.ModalContent>
        </C.ModalContainer >
    )
}

export default ModalNewTask
