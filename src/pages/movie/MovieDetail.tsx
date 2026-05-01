import type { MovieType } from "./MoviePage.tsx";
import styled from "styled-components";
import { FaInfoCircle } from "react-icons/fa";
import { useEffect, useState } from "react";

type PropsType = {
    selectedMovie: MovieType | null;
};

type MovieDetail = {
    Title: string;
    Year: string;
    Poster: string;
    Plot: string;
    Genre: string;
    Director: string;
};

const DetailSection = styled.div`
    flex: 2;
    border-radius: 16px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.colors.background.paper};
    border: 1px solid ${props => props.theme.colors.divider};
`;

const EmptyDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.colors.text.disabled};
    gap: 15px;

    svg {
        font-size: 48px;
        opacity: 0.5;
        color: ${props => props.theme.colors.warning};
    }
`;

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

const MovieImage = styled.img`
    width: 50%;
    border-radius: 8px;
`;

const MovieTitle = styled.h2`
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

const MovieInfo = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
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


function MovieDetail({ selectedMovie }: PropsType) {
    const [movie, setMovie] = useState<MovieDetail | null>(null);

    useEffect(() => {
        if (!selectedMovie) return;
        const id = selectedMovie.imdbID;
        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&i=${id}&plot=full`)
            .then(res => res.json())
            .then((json: MovieDetail) => setMovie(json))
            .catch(err => console.log(err));
    }, [selectedMovie]);

    if (!movie) {
        return (
            <DetailSection>
                <EmptyDetail>
                    <FaInfoCircle />
                    <p>좌측 목록에서 영화를 선택해주세요.</p>
                </EmptyDetail>
            </DetailSection>
        );
    }

    return (
        <DetailSection>
            <DetailHeader>
                <h2>{movie.Title}</h2>
                <span>{movie.Year}</span>
            </DetailHeader>
            <InfoWrapper>
                <MovieImage src={movie.Poster} />
                <MovieInfo>
                    <MovieTitle>{movie.Title}</MovieTitle>
                    <Year>{movie.Year}</Year>
                    <Tema>
                        <strong>장르</strong>
                        <span>{movie.Genre}</span>
                    </Tema>
                    <Tema>
                        <strong>Director</strong>
                        <span>{movie.Director}</span>
                    </Tema>
                    <Plot>{movie.Plot}</Plot>
                </MovieInfo>
            </InfoWrapper>
        </DetailSection>
    );
}

export default MovieDetail;
