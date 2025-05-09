import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import LoginPage from "../pages/Login/LoginPage";
import Tasks from "../pages/Tasks/Tasks";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route 
          path="/tarefas" 
          element={
            <ProtectedRoutes>
              <Tasks />
            </ProtectedRoutes>
          } 
        />
        <Route 
          path="/painel-administrador" 
          element={
            <ProtectedRoutes>
              <>Painel ADM</>
            </ProtectedRoutes>
          } 
        />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;