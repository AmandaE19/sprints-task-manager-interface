import styled from 'styled-components';

export const Container = styled.div`
	position: relative;
	padding: 20px;
    width: 100dvw;
    height: fit-content;
    min-height: 100dvh;
    background-color: #f2f2f2;
`;

export const Header = styled.header`
	width: 100%;
	height: fit-content;
	padding: 20px;
	position: absolute;
	top: 0px;
	left: 0px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #262626;
	color: #fafbfc;

	span {
		font-size: 24px;
		font-weight: bold;
	}
`;

export const LogoutButton = styled.button`
	background: none;
	border: none;
	color: #fafbfc;
	font-weight: bold;
	display: flex;
	align-items: center;
	gap: 6px;
	cursor: pointer;
`;

export const Content = styled.div`
	margin-top: 84px;
	display: flex;
	flex-direction: column;
`;

export const Buttons = styled.div`
	display: flex;
`;

export const Button = styled.div`
	margin: 0px 20px 20px 0px;
	width: 150px;
	padding: 5px;
	border-radius: 4px;
	display: flex;
	align-items: center;
	background-color: #262626;
	color: #fff;
	transition: background-color 0.3s ease, transform 0.2s ease;

	span {
		margin-left: 10px;
	}

	&:hover {
		background-color: #26262690;
		cursor: pointer;
	}
`;

export const FilterBar = styled.div`
	margin-bottom: 20px;

	select {
		width: 150px;
		padding: 5px;
	}
`;

export const Board = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 20px;
`;

export const Column = styled.div`
	flex: 1;
	background: #d9d9d9;
	border-radius: 8px;
	padding: 10px;
	min-height: 400px;

	h3 {
		text-align: center;
		margin-bottom: 10px;
	}
`;

export const TaskCard = styled.div`
	background: white;
	padding: 10px;
	border-radius: 6px;
	margin-bottom: 10px;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	cursor: pointer;

	strong {
		display: block;
		margin-bottom: 4px;
	}
`;

export const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.4);
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const ModalContent = styled.div`
	background: white;
	padding: 20px;
	border-radius: 8px;
	width: 300px;

	button {
		margin-top: 10px;
		padding: 6px 12px;
		background: #3498db;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}
`;