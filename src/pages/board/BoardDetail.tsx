import { useNavigate, useParams } from "react-router";
import type { PostType } from "./BoardPage.tsx";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Loading = styled.div`
    text-align: center;
    padding: 100px;
    font-size: 1.1rem;
    color: ${props => props.theme.colors.text.disabled};
`;

const Container = styled.article`
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: ${props => props.theme.colors.background.paper};
    border-radius: 12px;
`;

const BackButton = styled.button`
    color: white;
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 32px;
    padding: 8px 12px;
    border-radius: 6px;
    background-color: ${props => props.theme.colors.primary};
    border: none;
    transition: all 0.5s;
    cursor: pointer;

    &:hover {
        opacity: 0.9;
    }
`;

const Article = styled.article`
    border-top: 1px solid #eee;
    padding-top: 40px;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    font-weight: 800;
    color: ${props => props.theme.colors.text.default};
    margin-bottom: 24px;
`;

const Meta = styled.div`
    color: ${props => props.theme.colors.text.disabled};
    margin-bottom: 40px;
`;

const Body = styled.div`
    font-size: 1.15rem;
    line-height: 1.8;
    white-space: pre-wrap;
    color: ${props => props.theme.colors.text.default};
`;


function BoardDetail() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [post, setPost] = useState<PostType | null>(null);

    useEffect(() => {
        // useParams로 가져오는 id는 값이 없을 수 있음. id의 타입이 string | undefined니깐
        // 그래서 fetch를 실행시키기 전에, if를 통해 id값이 없다면 뒤를 실행하지 말고 이 함수를 종료해라라고 해줘야 함.
        if (!id) return;
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(res => res.json())
            .then((json: PostType) => {
                setPost(json);
            })
            .catch(err => {
                console.log(err);
            });
    }, [id]);

    if (!post) {
        return <Loading>게시글을 불러오는 중입니다.</Loading>
    }
    
    return (
        <Container>
            <BackButton onClick={() => navigate(-1)}>&larr; 목록으로 돌아가기</BackButton>

            <Article>
                <Title>{post.title}</Title>
                <Meta>
                    <span>게시물 번호 : {post.id}</span>
                    <span style={{ margin: "0 12px" }}>|</span>
                    <span>작성자 : {post.userId}</span>
                </Meta>
                <Body>{post.body}</Body>
            </Article>
        </Container>
    );
}

export default BoardDetail;