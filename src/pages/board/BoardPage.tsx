import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router";

export type PostType = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

const Loading = styled.div`
    padding: 100px;
    text-align: center;
    font-size: 1.1rem;
    color: #999;
`;

const Container = styled.div`
    border-radius: 12px;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 40px 20px;
    background-color: ${props => props.theme.colors.background.paper};
`;

const Title = styled.h1`
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 24px;
    color: ${props => props.theme.colors.primary};
`;

const BoardTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    border-top: 2px solid #333;

    th {
        background-color: ${props => props.theme.colors.background.default};
        padding: 14px;
        font-size: 15px;
        font-weight: 600;
        color: ${props => props.theme.colors.text.default};
        border-bottom: 1px solid ${props => props.theme.colors.divider};
        text-align: center;
    }

    td {
        padding: 16px 14px;
        border-bottom: 1px solid ${props => props.theme.colors.divider};
    }
`;

const TableRow = styled.tr`
    transition: all 0.2s;

    &:hover {
        background-color: ${props => props.theme.colors.divider};
    }
`;

const IdLabel = styled.th`
    width: 100px;
    text-align: center;
    color: #888;
`;

const TitleLabel = styled.th`
    text-align: left;
`;

const IdCell = styled.td`
    width: 100px;
    text-align: center;
    color: #888;
`;

const TitleCell = styled.td`
    text-align: left;
`;

const ToDetailLink = styled(Link)`
    display: block;
    width: 100%;
    
    &:hover {
        color: ${props => props.theme.colors.primary};
    }
`;

function BoardPage() {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(res => res.json()) // res는 어차피 string타입이 들어오기 때문에 타입을 따로 지정해 줄 필요가 없다.
            .then((json: PostType[]) => {
                // json이라는 매개변수는 소괄호로 감싸주고 소괄호 : 뒤는 함수의 반환 타입. 소괄호 안쪽에는 매개변수의 반환 타입.
                setPosts(json);
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <Loading>데이터를 로드 중입니다...</Loading>;
    }

    return (
        <Container>
            <Title>커뮤니티 게시판</Title>
            <BoardTable>
                <thead>
                    <TableRow>
                        <IdLabel>번호</IdLabel>
                        <TitleLabel>제목</TitleLabel>
                        <IdLabel>작성자 ID</IdLabel>
                    </TableRow>
                </thead>
                <tbody>
                    {posts.map((value, index) => (
                        <TableRow key={index}>
                            <IdCell>{value.id}</IdCell>
                            <TitleCell>
                                <ToDetailLink to={`/board/${value.id}`}>{value.title}</ToDetailLink>
                            </TitleCell>
                            <IdCell>{value.userId}</IdCell>
                        </TableRow>
                    ))}
                </tbody>
            </BoardTable>
        </Container>
    );
}

export default BoardPage;
