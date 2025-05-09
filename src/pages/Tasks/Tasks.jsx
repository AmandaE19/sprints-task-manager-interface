import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  DragOverlay
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import * as C from './styled';
import { FiLogOut } from 'react-icons/fi';

const DroppableColumn = ({ id, children }) => {
  const { setNodeRef } = useDroppable({ id });
  return <C.Column ref={setNodeRef}>{children}</C.Column>;
};

const columns = ['To Do', 'Doing', 'Done'];

const initialTasks = [
  { id: '1', title: 'Criar layout', responsible: 'Amanda', status: 'To Do', description: 'Fazer layout da página inicial' },
  { id: '2', title: 'Integração backend', responsible: 'Bruno', status: 'Doing', description: 'Conectar API de tarefas' },
  { id: '3', title: 'Testes', responsible: 'Carlos', status: 'Done', description: 'Cobertura de testes unitários' }
];

const TaskCardSortable = ({ task, onMouseDown, onClick }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab'
  };

  return (
    <C.TaskCard
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      onMouseDown={onMouseDown} // Detecta o início do arraste
      onClick={onClick}  // Abre o modal
    >
      <strong>{task.title}</strong>
      <p>{task.responsible}</p>
    </C.TaskCard>
  );
};

const Tasks = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [modalTask, setModalTask] = useState(null);
  const [selectedSprint, setSelectedSprint] = useState('Sprint 1');
  const [activeTask, setActiveTask] = useState(null);
  const [isDragging, setIsDragging] = useState(false); // Estado do arraste
  const [mouseDown, setMouseDown] = useState(false); // Para verificar se o clique foi de fato um arraste

  const sensors = useSensors(useSensor(PointerSensor));

  const tasksByStatus = {
    "To Do": tasks.filter((t) => t.status === "To Do"),
    "Doing": tasks.filter((t) => t.status === "Doing"),
    "Done": tasks.filter((t) => t.status === "Done"),
  };

  const handleDragStart = (event) => {
    setIsDragging(true); // Inicia o arraste
    const draggedId = event.active.id;
    const draggedTask = tasks.find((t) => t.id === draggedId);
    setActiveTask(draggedTask);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveTask(null);
    setIsDragging(false); // Fim do arraste

    if (!over) return;

    const activeTaskId = active.id;
    const newStatus = over.id;

    const taskToUpdate = tasks.find((task) => task.id === activeTaskId);

    if (taskToUpdate && taskToUpdate.status !== newStatus) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === activeTaskId ? { ...task, status: newStatus } : task
        )
      );
    }
  };

  const handleMouseDown = () => {
    setMouseDown(true); // Quando o mouse é pressionado, sabemos que o usuário pode estar arrastando
  };

  const handleMouseUp = () => {
    setMouseDown(false); // O mouse foi solto, já sabemos se foi um clique ou arraste
  };

  const openTaskModal = (task, e) => {
    e.stopPropagation();  // Impede que o clique dispare o arraste
    if (isDragging || mouseDown) return; // Só abre o modal se não estiver arrastando ou segurando o clique
    setModalTask(task);
  };

  const closeTaskModal = () => {
    setModalTask(null);
  };

  return (
    <C.Container>
      <C.Header>
        <h1>Painel de Tarefas</h1>
        <C.LogoutButton><FiLogOut /> Sair</C.LogoutButton>
      </C.Header>

      <C.FilterBar>
        <label htmlFor="sprint">Sprint:</label>
        <select id="sprint" value={selectedSprint} onChange={(e) => setSelectedSprint(e.target.value)}>
          <option value="Sprint 1">Sprint 1</option>
          <option value="Sprint 2">Sprint 2</option>
        </select>
      </C.FilterBar>

      <C.Board>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {columns.map((column) => (
            <DroppableColumn key={column} id={column}>
              <h2>{column}</h2>
              <SortableContext
                items={tasksByStatus[column].map((task) => task.id)}
                strategy={verticalListSortingStrategy}
              >
                {tasksByStatus[column].map((task) => (
                  <TaskCardSortable
                    key={task.id}
                    task={task}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onClick={(e) => openTaskModal(task, e)}
                  />
                ))}
              </SortableContext>
            </DroppableColumn>
          ))}

          <DragOverlay>
            {activeTask ? (
              <C.TaskCard>
                <strong>{activeTask.title}</strong>
                <p>{activeTask.responsible}</p>
              </C.TaskCard>
            ) : null}
          </DragOverlay>
        </DndContext>
      </C.Board>

      {modalTask && (
        <C.ModalOverlay onClick={closeTaskModal}>
          <C.ModalContent onClick={(e) => e.stopPropagation()}>
            <h2>{modalTask.title}</h2>
            <p><strong>Responsável:</strong> {modalTask.responsible}</p>
            <p><strong>Descrição:</strong> {modalTask.description}</p>
            <button onClick={closeTaskModal}>Fechar</button>
          </C.ModalContent>
        </C.ModalOverlay>
      )}
    </C.Container>
  );
};

export default Tasks;
