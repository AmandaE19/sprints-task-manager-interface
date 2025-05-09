import { useState } from 'react';
import { useNavigate } from "react-router-dom";
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
  verticalListSortingStrategy
} from '@dnd-kit/sortable';

import * as C from './styled';
import { FiLogOut } from 'react-icons/fi';
import { IoMdAdd } from "react-icons/io"
import Card from '../../components/Card/Card';
import ModalTask from '../../components/ModalTask/ModalTask';

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

const Tasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(initialTasks);
  const [modalTask, setModalTask] = useState(null);
  const [selectedSprint, setSelectedSprint] = useState('Sprint 1');
  const [optionNew, setOptionNew] = useState();
  const [activeTask, setActiveTask] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  const tasksByStatus = {
    "To Do": tasks.filter((t) => t.status === "To Do"),
    "Doing": tasks.filter((t) => t.status === "Doing"),
    "Done": tasks.filter((t) => t.status === "Done"),
  };

  const handleDragStart = (event) => {
    setIsDragging(true);
    const draggedId = event.active.id;
    const draggedTask = tasks.find((t) => t.id === draggedId);
    setActiveTask(draggedTask);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveTask(null);
    setIsDragging(false);

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

  const handleLogout = () => {
    localStorage.clear();
    navigate("/")
  }

  return (
    <C.Container>
      <C.Header>
        <span>Gestão de Tarefas</span>
        <C.LogoutButton onClick={handleLogout}><FiLogOut /> Sair</C.LogoutButton>
      </C.Header>

      <C.Content>
        <C.Buttons>
          <C.Button onClick={(e) => setOptionNew("sprint")}>
            <IoMdAdd />
            <span>Nova Sprint</span>
          </C.Button>

          <C.Button onClick={(e) => setOptionNew("task")}>
            <IoMdAdd />
            <span>Nova Tarefa</span>
          </C.Button>

          <C.FilterBar>
            <select id="sprint" value={selectedSprint} onChange={(e) => setSelectedSprint(e.target.value)}>
              <option value="Sprint 1">Sprint 1</option>
              <option value="Sprint 2">Sprint 2</option>
            </select>
          </C.FilterBar>
        </C.Buttons>

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
                    <Card
                      key={task.id}
                      task={task}
                      onMouseDown={handleMouseDown}
                      onMouseUp={handleMouseUp}
                      openTaskModal={openTaskModal}
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

        {
          modalTask && <ModalTask task={modalTask} setModalTask={setModalTask} />
        }

      </C.Content>
    </C.Container>
  );
};

export default Tasks;
