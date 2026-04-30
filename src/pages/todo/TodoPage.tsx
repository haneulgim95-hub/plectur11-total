import { useState, type SubmitEvent, useEffect } from "react";
import styled from "styled-components";
import { FaCheck, FaPlus, FaTrash } from "react-icons/fa";

type TodoType = {
    id: number;
    text: string;
    isCompleted: boolean;
}

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

const TodoItem = styled.li<{ $isCompleted: boolean}>` 
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
        color: ${props => props.$isCompleted ? props.theme.colors.text.disabled : props.theme.colors.text.default};
        text-decoration: ${props => props.$isCompleted ? "line-through" : "none"};
    }
`;

const IconButton = styled.button<{ $colorType: "success" | "error"}>`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
    display: flex;
    align-items: center;
    opacity: 0.6;
    transition: all 0.3s;
    /* color: ${props => props.$colorType === "success" ? props.theme.colors.success : props.theme.colors.error}; */
    color: ${props => props.theme.colors[props.$colorType]};
    // 마침표 연결법을 쓸 떄에는 꼭 key가 영어 이어야 함 (변수 x ). props.$colorType은 props로 전달한 변수이기 때문에.
    
    &:hover {
        opacity: 1;
    }
`;

function TodoPage() {
    const [inputValue, setInputValue] = useState(""); // 인풋에 입력된 값을 관리
    const [todos, setTodos] = useState<TodoType[]>(() => {
        // todos라는 state가 TodoPage 컴포넌트가 불러와질 때 마련되는데,
        // 그 저장소의 초기값은 이 함수에서 리턴된 값으로 결정됨
        // localStorage에서 "todos"라는 키를 가진 값을 불러오고
        // 그 값이 있으면 Javascript의 객체(배열) 형태로 변환해서 저장하고, 없으면 빈 배열을 리턴
        const storedTodos = localStorage.getItem("todos");
        return storedTodos ? JSON.parse(storedTodos) : [];
    }); // 할 일 목록을 관리

    const handleAddTodo = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!inputValue.trim()) return;
        const newTodo: TodoType = {
            id: Date.now(),     // 고유값으로, 사용자가 "저장하는 지금 시간"을 id로 쓰겠다.
            text: inputValue,
            isCompleted: false
        }
        setTodos([...todos, newTodo]);

        setInputValue("");
    };

    useEffect(() => {
        // todos라는 state는 현재 Array를 저장하고 있기 때문에
        // 그 값을 localStorage에 저장하기 위해서(문자열만 저장 가능) 객체나 배열은 JSON형식으로 바꿔줄 필요가 있음
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const toggleTodo = (id: number) => {
        setTodos(todos.map((value) => {
            return value.id === id ? { ...value, isCompleted: !value.isCompleted} : value;
        }));
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(value => value.id !== id));
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
                         {/*(event) => {} 만 쓰면, event에는 우리가 필요한 value.id라고 하는 존재가 없다*/}
                        <IconButton $colorType={"success"} onClick={() => toggleTodo(value.id)}>
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

export default TodoPage;
