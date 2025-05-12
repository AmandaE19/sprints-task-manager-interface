import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FiMail, FiLock } from "react-icons/fi";
import { login } from "../../services/ApiBackend";

import LogoImage from "../../assets/images/Logo.png";

import * as C from "./styled";

const LoginPage = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const handleEmail = (e) => {
		setEmail(e.target.value)
	}

	const handlePassword = (e) => {
		setPassword(e.target.value)
	}

	const handleLogin = async () => {
		if(email && password) {
			const response = await login(email, password);
			if(response.status === 401) {
				alert("E-mail ou senha inválido!");
				return;
			}

			const token = response.access_token ? response.access_token : "Unauthorized";

			if(token !== "Unauthorized") {
				localStorage.setItem("token", token);
				localStorage.setItem("name", response.username);
				localStorage.setItem("role", response.role);
				navigate("/tarefas");
			}else {
				alert("E-mail ou senha inválido!");
				return;
			}
		} else {
			alert("E-mail ou senha inválido!");
			return;
		}
	};

	return (
		<C.Container>
			<C.LoginContainer>
				<C.Logo src={LogoImage} alt="Logo do App" />
				{/* <C.AppName>Sprint Task Manager</C.AppName> */}
				<C.PageTitle>LogIn</C.PageTitle>

				<C.Input>
					<FiMail className="icon" />
					<input type="email" placeholder=" " onChange={(e) => handleEmail(e)} />
					<span>E-mail</span>
				</C.Input>

				<C.Input>
					<FiLock className="icon" />
					<input type="password" placeholder=" " onChange={(e) => handlePassword(e)}/>
					<span>Senha</span>
				</C.Input>

				<C.ButtonLogin onClick={handleLogin}>Sign In</C.ButtonLogin>
				<C.Presentation>Controle suas demandas de forma organizada!</C.Presentation>
			</C.LoginContainer>
		</C.Container>
	);
};

export default LoginPage;
