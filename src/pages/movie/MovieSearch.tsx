import type { MovieType } from "./MoviePage.tsx";
import { type Dispatch, type SetStateAction, useEffect } from "react";
import MovieSearchBar from "../../components/layout/MovieSearchBar.tsx";
import { useSearchParams } from "react-router";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

type APIResponseType = {
    Search: MovieType[];
};

type PropsType = {
    movies: MovieType[];
    setMovies: Dispatch<SetStateAction<MovieType[]>>;
    loading: boolean;
    selectedMovie: MovieType | null;
    setSelectedMovie: Dispatch<SetStateAction<MovieType | null>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
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

const LoadingMessage = styled.div`
    padding: 20px;
    text-align: center;
    color: ${props => props.theme.colors.text.disabled};
`;

const MovieUl = styled.ul`
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

const MovieLi = styled.li<{ $isSelected: boolean }>`
    flex: 1;
    padding: 15px 20px;
    cursor: pointer;
    display: flex;
    gap: 20px;
    align-items: center;
    transition: all 0.3s;
    border: 1px solid ${props => props.theme.colors.divider};
    border-radius: 8px;
    background-color: ${props =>
        props.$isSelected ? props.theme.colors.background.default : "transparent"};

    &:hover {
        background-color: ${props => props.theme.colors.divider};
    }
`;

const MovieImage = styled.img`
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

function MovieSearch({
    movies,
    setMovies,
    loading,
    setLoading,
    selectedMovie,
    setSelectedMovie,
}: PropsType) {
    const [searchParams] = useSearchParams();
    const k = searchParams.get("keyword");

    useEffect(() => {
        if (!k) return;

        setLoading(true);
        setMovies([]);

        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&s=${k}`)
            .then(res => res.json())
            .then((json: APIResponseType) => setMovies(json.Search))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, [k]);

    return (
        <ListSection>
            <ListHeader>
                <FaSearch />
                <MovieSearchBar />
            </ListHeader>

            {loading ? (
                <LoadingMessage>데이터를 불러오는 중</LoadingMessage>
            ) : (
                <MovieUl>
                    {movies.map(value => (
                        <MovieLi key={value.imdbID} $isSelected={selectedMovie?.imdbID === value.imdbID} onClick={() => setSelectedMovie(value)}>
                            <MovieImage src={value.Poster} alt={value.imdbID} />
                            <Info>
                                <Title>{value.Title}</Title>
                                <Year>{value.Year}</Year>
                            </Info>
                        </MovieLi>
                    ))}
                </MovieUl>
            )}
        </ListSection>
    );
}

export default MovieSearch;
