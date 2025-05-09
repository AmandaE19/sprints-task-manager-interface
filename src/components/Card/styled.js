import styled from "styled-components";

export const CardContainer = styled.div`
    position: relative;
	background: white;
	padding: 10px;
	border-radius: 6px;
	margin-bottom: 10px;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	cursor: pointer;
    display: flex;
    align-items: center;
`;

export const CardContent = styled.div`
    width: 80%;
    strong {
        display: block;
        margin-bottom: 4px;
    }
`;

export const MoveButton = styled.div`
    width: 50px;
    height: 50px;
    background-color: #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    border-radius: 4px;
    right: 10px;
`;