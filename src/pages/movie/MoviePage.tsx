import styled from "styled-components";
import MovieSearch from "./MovieSearch.tsx";
import MovieDetail from "./MovieDetail.tsx";
import { useState } from "react";

const Container = styled.div`
    display: flex;
    gap: 20px;
    height: calc(100dvh - 150px);
`;

export type MovieType = {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}



function MoviePage() {
    const [movies, setMovies] = useState<MovieType[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null);

    return (
        <Container>
            <MovieSearch
                movies={movies}
                setMovies={setMovies}
                loading={loading}
                setLoading={setLoading}
                selectedMovie={selectedMovie}
                setSelectedMovie={setSelectedMovie}
            />
            <MovieDetail selectedMovie={selectedMovie}/>
        </Container>
    );
}

export default MoviePage;
