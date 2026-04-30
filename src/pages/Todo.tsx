import { FaCheck, FaPlus, FaTrash } from "react-icons/fa";
import styled from "styled-components";
import { useState, type SubmitEvent, useEffect } from "react";

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

const TodoList = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const TodoItem = styled.li<{ $isCompleted: boolean }>`
    background-color: ${props => props.theme.colors.background.paper};
    padding: 15px 20px;
    border-radius: 12px;
    border: 1px solid ${props => props.theme.colors.divider};
    display: flex;
    align-items: center;
    gap: 15px;
    transition: all 0.5s;

    &:hover {
        border-color: ${props => props.theme.colors.primary};
    }

    span {
        flex: 1;
        font-size: 16px;
        color: ${props =>
            props.$isCompleted
                ? props.theme.colors.text.disabled
                : props.theme.colors.text.default};
        text-decoration: ${props => (props.$isCompleted ? "line-through" : "none")};
    }
`;

const IconButton = styled.button<{ $colorType: "success" | "error" }>`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
    display: flex;
    align-items: center;
    opacity: 0.6;
    transition: all 0.3s;
    color: ${props => props.theme.colors[props.$colorType]};

    &:hover {
        opacity: 1;
    }
`;

type TodoType = {
    text: string;
    id: number;
    isCompleted: boolean;
};

function Todo() {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState<TodoType[]>(() => {
        const savedTodos = localStorage.getItem("todos");
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const handleAddTodo = (e: SubmitEvent<HTMLFormElement>) => {
        // 초기화 막기
        e.preventDefault();

        // 인풋에 아무것도 입력되지 않으면 리턴.
        if (!inputValue.trim()) return;

        // TodoType의 newTodo 생성(초기값 설정)
        const newTodo: TodoType = {
            text: inputValue,
            id: Date.now(),
            isCompleted: false,
        };

        // setTodos
        setTodos([...todos, newTodo]);

        // inputValue 초기화
        setInputValue("");
    };

    const toggleTodo = (id: number) => {
        setTodos(
            todos.map(value => {
                return value.id === id ? { ...value, isCompleted: !value.isCompleted } : value;
            }),
        );
    };

    const deleteTodo = (id: number) => {
        setTodos(
            todos.filter(value => {
                return value.id !== id;
            }),
        );
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
            <TodoList>
                {todos.map((value, index) => (
                    <TodoItem key={index} $isCompleted={value.isCompleted}>
                        <IconButton
                            $colorType={"success"}
                            onClick={() => {
                                toggleTodo(value.id);
                            }}>
                            <FaCheck />
                        </IconButton>
                        <span>{value.text}</span>
                        <IconButton $colorType={"error"} onClick={() => deleteTodo(value.id)}>
                            <FaTrash />
                        </IconButton>
                    </TodoItem>
                ))}
            </TodoList>
        </Container>
    );
}

export default Todo;
