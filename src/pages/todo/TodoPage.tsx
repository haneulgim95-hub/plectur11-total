import { useState, type SubmitEvent } from "react";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";

const Container = styled.div`
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const Title = styled.h2`
    font-size: 28px;
    font-weight: 800;
    color: ${props => props.theme.colors.primary};
`;

const InputSection = styled.form`
    display: flex;
    gap: 10px;
    padding: 20px;
    border-radius: 16px;
    background-color: ${props => props.theme.colors.background.paper};
    border: ${props => props.theme.colors.divider};
`;

const StyledInput = styled.input`
    flex: 1;
    padding: 12px 15px;
    border-radius: 8px;
    border: 1px solid ${props => props.theme.colors.divider};
    background-color: ${props => props.theme.colors.background.default};
    color: ${props => props.theme.colors.text.default};
    font-size: 16px;
    outline: none;

    &:focus {
        border-color: ${props => props.theme.colors.primary};
    }
`;

const AddButton = styled.button`
    padding: 0 20px;
    background-color: ${props => props.theme.colors.primary};
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s;

    &:hover {
        opacity: 0.9;
    }
`;

function TodoPage() {
    const [inputValue, setInputValue] = useState(""); // 인풋에 입력된 값을 관리
    const [todos, setTodos] = useState<string[]>([]); // 할 일 목록을 관리

    const handleAddTodo = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!inputValue.trim()) return;
        setTodos([...todos, inputValue]);

        setInputValue("");
    };

    return (
        <Container>
            <Title>Todo List</Title>
            <InputSection onSubmit={handleAddTodo}>
                <StyledInput
                    placeholder={"오늘의 할 일을 입력하세요."}
                    onChange={e => setInputValue(e.target.value)}
                    value={inputValue}></StyledInput>
                <AddButton type={"submit"}>
                    <FaPlus />
                </AddButton>
            </InputSection>

            <ul>
                {todos.map((value, index) => (
                    <li key={index}>{value}</li>
                ))}
            </ul>
        </Container>
    );
}

export default TodoPage;
