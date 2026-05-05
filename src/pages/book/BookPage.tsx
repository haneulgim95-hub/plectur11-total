import { useState } from "react";
import BookSearch from "./BookSearch.tsx";
import BookDetail from "./BookDetail.tsx";
import styled from "styled-components";

export type BookItem = {
    id: string;
    volumeInfo: {
        title: string;
        authors?: string[];
        description?: string;
        publishedDate: string;
        imageLinks?: {
            thumbnail?: string;
            small?: string;
        };
    };
};

const Container = styled.div`
    display: flex;
    gap: 20px;
    height: calc(100dvh - 150px);
`;

function BookPage(){
    const [books, setBooks] = useState<BookItem[]>([]);
    const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);

    return (
        <Container>
            <BookSearch
                books={books}
                setBooks={setBooks}
                selectedBook={selectedBook}
                setSelectedBook={setSelectedBook}
            />
            <BookDetail selectedBook={selectedBook} />
        </Container>
    );
}

export default BookPage;