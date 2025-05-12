import styled from "styled-components";

export const ModalContainer = styled.div`
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

export const Input = styled.div`
	position: relative;
	width: 100%;
	margin-bottom: 15px;

	label {
		position: absolute;
		top: 12px;
		left: 12px;
		color: #666;
		font-size: 14px;
		background-color: #fff;
		padding: 0 4px;
		transition: 0.2s ease all;
		pointer-events: none;
	}

	input {
		width: 100%;
		height: 42px;
		padding: 10px 10px 10px 12px;
		border: 1px solid #cfd8dc;
		border-radius: 6px;
		font-size: 14px;
		background-color: #fff;
		color: #333;
		transition: all 0.3s ease;
	}

	input:focus {
		border-color: #1f3f5e;
	}

	input:focus + label,
	input:not(:placeholder-shown) + label {
		top: -8px;
		left: 8px;
		font-size: 12px;
		color: #1f3f5e;
		background-color: #fff;
	}
`;

export const ModalContent = styled.div`
	background: white;
	padding: 20px;
	border-radius: 8px;
	width: 300px;
    height: fit-content;

    ${Input}:first-of-type {
		margin-top: 15px;
	}

    span {
        font-weight: bold;
        font-size: 16px;
    }

	button {
		margin-right: 10px;
		padding: 6px 12px;
		background: #262626;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

    button:hover {
        background: #26262690;
    }
`;