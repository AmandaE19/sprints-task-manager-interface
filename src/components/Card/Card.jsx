import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { IoIosMove } from "react-icons/io"

import * as C from "./styled";
import { updateTaskOwner } from '../../services/ApiBackend';

const Card = ({ task, onMouseDown, onMouseUp, openTaskModal }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab'
  };

  const handleAssign = async (taskId) => {
    try {
      const username = localStorage.getItem("name");
      if (!username) {
        alert("Usuário não encontrado.");
        return;
      }

      const response = await updateTaskOwner(taskId, username);

      if (response.status === 200 || response.status === 201) {
        window.location.reload();
      } else {
        alert("Erro ao atribuir tarefa.");
      }
    } catch (error) {
      alert("Erro ao atribuir tarefa.");
      console.error(error);
    }
  };


  return (
    <C.CardContainer style={style} id={task._id} >
      <C.CardContent
        onClick={(e) => openTaskModal(task, e)}
        onMouseUp={onMouseUp}
      >
        <strong>{task.name}</strong>
        <p>{task.assignedTo || "Sem responsável"}</p>
        {task.assignedTo === "" && (
          <C.AssignButton onClick={() => handleAssign(task._id)}>Atribuir-me</C.AssignButton>
        )}


      </C.CardContent>
      <C.MoveButton
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        onMouseDown={onMouseDown} // Detecta o início do arraste
      >
        <IoIosMove />
      </C.MoveButton>
    </C.CardContainer>
  );
};

export default Card;