import styled from "styled-components";
import { useNavigate } from "react-router";
import { type ChangeEvent, type SubmitEvent, useState } from "react";

const Box = styled.form`
    width: 100%;
    display: flex;
    gap: 8px;
`;

const Input = styled.input`
    flex: 1;
    padding: 12px;
    border-radius: 6px;
    border: 1px solid #9b9b9b;

    &:focus {
        outline: none;
        border-color: dodgerblue;
    }
`;

const Button = styled.button`
    padding: 12px 24px;
    border-radius: 6px;
    border: none;
    background-color: #d4d3d3;
    color: #2a2a2a;
    cursor: pointer;
    transition: all 0.3s;
    font-weight: 600;
    &:hover {
        background-color: dodgerblue;
        color: white;
    }
`;

function MovieSearchBar() {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const onSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!keyword.trim()) return;

        navigate(`/movie?keyword=${encodeURIComponent(keyword)}`);
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value);


    return (
        <Box onSubmit={onSubmit}>
            <Input onChange={onChange} placeholder={"영화를 검색해주세요."}></Input>
            <Button type={"submit"}>검색</Button>
        </Box>
    );
}

export default MovieSearchBar;