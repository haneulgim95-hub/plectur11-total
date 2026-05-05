import  { type Dispatch, type SetStateAction, useEffect } from "react";
import type { BookItem } from "./BookPage.tsx";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import BookSearchBar from "../../components/layout/BookSearchBar.tsx";
import { useSearchParams } from "react-router";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

type PropsType = {
    books: BookItem[];
    setBooks: Dispatch<SetStateAction<BookItem[]>>;
    selectedBook: BookItem | null;
    setSelectedBook: Dispatch<SetStateAction<BookItem | null>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
};

type APIResponseType = {
    Search: BookItem[];
};

const ListSection = styled.aside`
    min-width: 500px;
    flex: 1;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.colors.background.default};
    border: 1px solid ${props => props.theme.colors.divider};
    overflow: hidden; /* 안에 요소가 넘치면 잘라낸다 */
`;

const ListHeader = styled.div`
    padding: 20px;
    border-bottom: 1px solid ${props => props.theme.colors.divider};
    font-size: 18px;
    font-weight: 800;
    color: ${props => props.theme.colors.text.default};
    display: flex;
    align-items: center;
    gap: 10px;
`;

const BookUl = styled.ul`
    list-style: none;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto; // Y 방향으로 넘치게될 경우 스크롤바를 통해 표현하겠다.

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background-color: ${props => props.theme.colors.divider};
    }
`;

const BookLi = styled.li<{ $isSelected: boolean }>`
    flex: 1;
    padding: 15px 20px;
    cursor: pointer;
    display: flex;
    gap: 20px;
    align-items: center;
    transition: all 0.3s;
    border: 1px solid ${props => props.theme.colors.divider};
    border-left: 4px solid
    ${props => (props.$isSelected ? props.theme.colors.primary : props.theme.colors.divider)};

    &:hover {
        background-color: ${props => props.theme.colors.divider};
    }
`;

const BookImage = styled.img`
    width: 80px;
    height: 90px;
    object-fit: cover;
    border-radius: 8px;
`;

const Info = styled.div`
    flex: 1;
`;

const Title = styled.h3`
    color: ${props => props.theme.colors.text.default};
    font-weight: 700;
    margin-bottom: 4px;
`;

const Year = styled.span`
    font-size: 12px;
    color: #888;
`;

const NoCover = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.colors.text.disabled};
`;

function BookSearch({
    books,
    setBooks,
    selectedBook,
    setSelectedBook,
}: PropsType) {
    const [searchParams] = useSearchParams();
    const k = searchParams.get("keyword");

    useEffect(() => {
        if (!k) return;

        setBooks([]);

        fetch(`https://www.googleapis.com/books/v1/volumes?q=${k}&maxResults=20&key=${API_KEY}`)
            .then(res => res.json())
            .then((json: APIResponseType) => setBooks(json.Search))
            .catch(err => console.log(err))
    }, [k]);

    return (
        <ListSection>
            <ListHeader>
                <FaSearch />
                <BookSearchBar />
            </ListHeader>

            <BookUl>
                {books.map(value => (
                    <BookLi key={value.id} $isSelected={selectedBook?.id === value.id} onClick={() => setSelectedBook(value)}>
                        {value.volumeInfo.imageLinks?.thumbnail ? <BookImage src={value.volumeInfo.imageLinks.thumbnail} alt={value.volumeInfo.title} /> : <NoCover>NoCover</NoCover>}

                        <Info>
                            <Title>{value.volumeInfo.title}</Title>
                            <Year>{value.volumeInfo.authors?.join(", ")}</Year>
                        </Info>
                    </BookLi>
                ))}
            </BookUl>
        </ListSection>
    );
}

export default BookSearch;
