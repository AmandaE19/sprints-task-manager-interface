import styled from "styled-components";

export const Container = styled.div`
	width: 100dvw;
	height: 100dvh;
	display: flex;
	align-items: center;
	justify-content: center;
	background: linear-gradient(to bottom, #0d1117, #1f2a37);
	font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

export const LoginContainer = styled.div`
	background-color: #f5f6f8;
	padding: 40px 30px;
	border-radius: 16px;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
	width: 100%;
	max-width: 400px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const AppName = styled.h1`
	color: #1f2a37;
	font-size: 28px;
	font-weight: bold;
	margin-bottom: 10px;
`;

export const PageTitle = styled.h2`
	color: #3a3a3a;
	font-size: 20px;
	margin-bottom: 30px;
`;

export const Presentation = styled.p`
	margin-top: 20px;
	color: #ccc;
	font-size: 12px;
	text-align: center;
`;

export const Logo = styled.img`
	width: 150px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 12px;
`;

export const Input = styled.label`
	position: relative;
	width: 100%;
	margin-bottom: 25px;

	.icon {
		position: absolute;
		top: 50%;
		left: 12px;
		transform: translateY(-50%);
		color: #888;
		font-size: 18px;
		pointer-events: none;
	}

	input {
		width: 100%;
		height: 42px;
		padding: 10px 10px 10px 38px;
		border: 1px solid #cfd8dc;
		border-radius: 6px;
		font-size: 14px;
		background-color: #fff;
		color: #333;
		transition: all 0.3s ease;
	}

	span {
		position: absolute;
		top: 12px;
		left: 38px;
		font-size: 14px;
		color: #666;
		background-color: #f5f6f8;
		padding: 0 4px;
		transition: 0.3s ease all;
		pointer-events: none;
	}

	input:focus + span,
	input:not(:placeholder-shown) + span {
		top: -10px;
		left: 28px;
		font-size: 12px;
		color: #1f3f5e;
	}

	input:focus {
		border: 1px solid #1f3f5e;
	}
`;

export const ButtonLogin = styled.button`
	width: 100%;
	height: 42px;
	border: none;
	border-radius: 6px;
	background-color: #1f3f5e;
	color: #fff;
	font-size: 16px;
	margin-top: 10px;
	transition: background-color 0.3s ease, transform 0.2s ease;

	&:hover {
		background-color: #152e47;
		transform: scale(1.02);
		cursor: pointer;
	}
`;
