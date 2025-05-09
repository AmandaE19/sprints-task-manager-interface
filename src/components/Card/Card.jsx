import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { IoIosMove } from "react-icons/io"

import * as C from "./styled";

const Card = ({ task, onMouseDown, onMouseUp, openTaskModal }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab'
  };

  return (
    <C.CardContainer style={style} id={task.id} >
      <C.CardContent 
        onClick={(e)=>openTaskModal(task, e)}
        onMouseUp={onMouseUp}
      >
        <strong>{task.title}</strong>
        <p>{task.responsible}</p>
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