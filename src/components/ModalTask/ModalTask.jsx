import * as C from "./styled";

const ModalTask = ({ task, setModalTask }) => {
    return (
        <C.ModalOverlay >
            <C.ModalContent onClick={(e) => e.stopPropagation()}>
                <h2>{task.title}</h2>
                <p><strong>Responsável:</strong> {task.responsible}</p>
                <p><strong>Descrição:</strong> {task.description}</p>
                <button onClick={()=>setModalTask()}>Fechar</button>
            </C.ModalContent>
        </C.ModalOverlay >
    )
}

export default ModalTask
