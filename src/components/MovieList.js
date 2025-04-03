import React, { useState } from "react";
import {NavLink} from 'react-router-dom'
import styled, { ThemeProvider } from "styled-components"; 
import { MovieCard } from "./MovieCard";
import { Modal } from "./Modal";

const StyledMovieList = styled.div` 
    .movie-list {
        display: flex;
        flex-wrap: wrap;
        width: min-content;
        margin: 0 auto;
        row-gap: 15px;
        column-gap: 20px;
        width: 90%;
        max-width: 1200px;
        li {
            width: calc(50% - 10px);
            &:only-child {
                margin: 0 auto;
            }
            @media screen and (min-width: 500px) {
                width: calc((100% / 3) - (40px / 3));
            }
            @media screen and (min-width: 800px) {
                width: calc((100% / 4) - (60px / 4));
            }
            @media screen and (min-width: 1000px) {
                width: calc((100% / 5) - (80px / 5));
            }
        }
    }
`;

export const MovieList = ({ movies }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [clickedMovie, setClickedMovie] = useState({});

    const handleClick = (movie) => {
        setModalIsOpen(true);
        setClickedMovie(movie);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

    return (
        <StyledMovieList>
            <ul className="movie-list">
                {movies.map((movie) => (
                    <li key={movie.id} onClick={() => handleClick(movie)}>
                        <MovieCard movie={movie}/>
                    </li>
                   ))}
                </ul>
                {modalIsOpen && (
                    <div>
                        <h1>test test test test</h1>
                        <Modal props={clickedMovie} closeModal={closeModal}/>
                        <div className="blur"></div>
                    </div>
                )}
        </StyledMovieList>
    )
}