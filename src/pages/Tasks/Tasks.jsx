import { useEffect, useState } from 'react';
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
import { handleSprints, tasksBySprint, updateTaskStatus } from '../../services/ApiBackend';
import ModalNewTask from '../../components/ModalNewTask/ModalNewTask';

const DroppableColumn = ({ id, children }) => {
  const { setNodeRef } = useDroppable({ id });
  return <C.Column ref={setNodeRef}>{children}</C.Column>;
};

const columns = ['TODO', 'DOING', 'DONE'];

const Tasks = () => {
  const navigate = useNavigate();
  const [sprints, setSprints] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [modalTask, setModalTask] = useState(null);
  const [selectedSprint, setSelectedSprint] = useState('Selecione uma Sprint');
  const [modalNewTask, setModalNewTask] = useState();
  const [activeTask, setActiveTask] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);

  const isAdmin = localStorage.getItem("role") === "admin";

  useEffect(() => {
    const getSprints = async () => {
      try {
        const sprints = await handleSprints();
        setSprints(sprints);
      } catch (error) {
        console.error("Erro ao buscar sprints:", error);
      }
    }
    getSprints();
  }, [])

  useEffect(() => {
    if (selectedSprint === "Selecione uma Sprint") {
      return;
    }

    const fetchTasks = async () => {
      try {
        const tasks = await tasksBySprint(selectedSprint);
        setTasks(tasks);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    };

    fetchTasks();
  }, [selectedSprint]);

  const sensors = useSensors(useSensor(PointerSensor));

  const tasksByStatus = {
    "TODO": tasks.filter((t) => t.status === "TODO"),
    "DOING": tasks.filter((t) => t.status === "DOING"),
    "DONE": tasks.filter((t) => t.status === "DONE"),
  };

  const handleDragStart = (event) => {
    setIsDragging(true);
    const draggedId = event.active.id;
    const draggedTask = tasks.find((t) => t._id === draggedId);
    setActiveTask(draggedTask);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setActiveTask(null);
    setIsDragging(false);

    if (!over) return;

    const activeTaskId = active.id;
    let newStatus = over.id;

    if (newStatus !== "TODO" && newStatus !== "DOING" && newStatus !== "DONE") {
      newStatus = "TODO";
    }

    const taskToUpdate = tasks.find((task) => task._id === activeTaskId);

    if (taskToUpdate && taskToUpdate.status !== newStatus) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === activeTaskId ? { ...task, status: newStatus } : task
        )
      );

      try {
        await updateTaskStatus(activeTaskId, newStatus);
      } catch (error) {
        console.error("Erro ao atualizar status da tarefa:", error);
      }
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
          {isAdmin &&
            <C.Button onClick={() => setModalNewTask(true)}>
              <IoMdAdd />
              <span>Nova Tarefa</span>
            </C.Button>
          }

          <C.FilterBar>
            <select id="sprint" value={selectedSprint} onChange={(e) => setSelectedSprint(e.target.value)}>
              <option value="Selecione uma Sprint" disabled>Selecione uma Sprint</option>
              {sprints.length > 0 && sprints.map((sprint) => (
                <option value={sprint}>{sprint}</option>
              ))}
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
                  items={tasksByStatus[column].map((task) => task._id)}
                  strategy={verticalListSortingStrategy}
                >
                  {tasksByStatus[column].map((task) => (
                    <Card
                      key={task._id}
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
                  <strong>{activeTask.name}</strong>
                  <p>{activeTask.assignedTo}</p>
                </C.TaskCard>
              ) : null}
            </DragOverlay>
          </DndContext>
        </C.Board>

        {
          modalTask && <ModalTask task={modalTask} setModalTask={setModalTask} />
        }

        {
          modalNewTask && <ModalNewTask onClose={() => setModalNewTask(false)} />
        }

      </C.Content>
    </C.Container>
  );
};

export default Tasks;
