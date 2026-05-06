import type { BookItem } from "./BookPage.tsx";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaInfoCircle } from "react-icons/fa";
import { NoCover } from "./BookSearch.tsx";
import { DetailSection, EmptyDetail } from "../movie/MovieDetail.tsx";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

type Props = { selectedBook: BookItem | null };

const DetailHeader = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 15px;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid ${props => props.theme.colors.divider};

    h2 {
        font-size: 32px;
        color: ${props => props.theme.colors.primary};
    }

    span {
        font-size: 20px;
        color: ${props => props.theme.colors.text.disabled};
        margin-bottom: 4px;
    }
`;

const InfoWrapper = styled.div`
    flex: 1;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 12px;
    border: 1px solid ${props => props.theme.colors.divider};
    display: flex;
    gap: 20px;
    height: 500px;
    color: ${props => props.theme.colors.text.default};
`;


const BookInfo = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;
const BookImage = styled.img`
    width: 30%;
    height: 250px;
    border-radius: 8px;
`;

const BookTitle = styled.h2`
    margin-bottom: 4px;
`;

const Year = styled.div`
    margin-bottom: 24px;
    color: ${props => props.theme.colors.text.disabled};
`;

const Tema = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;

    span {
        color: ${props => props.theme.colors.text.disabled};
    }
`;

const Plot = styled.div`
    padding: 12px;
    border-radius: 8px;
    margin-top: 20px;
    flex: 1;
    overflow-y: auto;
    line-height: 1.6;
    
    border: 1px solid ${props => props.theme.colors.divider};
`;



function BookDetail({ selectedBook }: Props) {
    const [book, setBook] = useState<BookItem | null>(null);

    useEffect(() => {
        if (!selectedBook) return;
        const id = selectedBook.id;
        fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`)
            .then(res => res.json())
            .then((json: BookItem) => setBook(json))
            .catch(err => console.log(err));
    }, [selectedBook]);

    if (!book) {
        return (
            <DetailSection>
                <EmptyDetail>
                    <FaInfoCircle />
                    <p>좌측 목록에서 책을 선택해주세요.</p>
                </EmptyDetail>
            </DetailSection>
        );
    }

    return (
        <DetailSection>
            <DetailHeader>
                <h2>{book.volumeInfo.title}</h2>
                <span>{book.volumeInfo.publishedDate}</span>
            </DetailHeader>
            <InfoWrapper>
                {book.volumeInfo.imageLinks?.thumbnail ? (
                    <BookImage src={book.volumeInfo.imageLinks.thumbnail} />
                ) : (
                    <NoCover>NoCover</NoCover>
                )}

                <BookInfo>
                    <BookTitle>{book.volumeInfo.title}</BookTitle>
                    <Year>{book.volumeInfo.publishedDate}</Year>
                    <Tema>
                        <strong>작가</strong>
                        <span>{book.volumeInfo.authors?.join(", ")}</span>
                    </Tema>
                    <Plot
                        dangerouslySetInnerHTML={{
                            __html: book.volumeInfo.description || "설명 없음",
                        }}>
                    </Plot>
                </BookInfo>
            </InfoWrapper>
        </DetailSection>
    );
}

export default BookDetail;