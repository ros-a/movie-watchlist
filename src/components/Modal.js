import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components"; 
import close from '../icons/close.svg';
import { useLocation } from "react-router-dom";
import { MovieControls } from "./MovieControls";


const StyledModal = styled.div`
    .modal-header {
        position: relative;
        min-height: 100px;
    }
    .modal {
        background-color: #132c3f;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80vw;
        max-width: 450px;
        height: auto;
        border-radius: 10px;
        color: #FFF;
        text-align: center;
        z-index: 5;
    } 
    h2 {
        margin: 0;
        font-family: Cairo;
        color: #ebeb12;
        line-height: 30px;
        padding-bottom: 10px;
    }
    .original-title, .directors, .release-year, .description {
        font-size: 14px;
    }
    .description {
        padding: 10px 0;
    }
    .text-wrapper {
        padding: 5px 20px 20px;
    }
    img {
        width: 100%;
        border-radius: 10px 10px 0 0;
    }
    .image-wrapper {
        min-height: 40px;
    }
    .close {
        position: absolute;
        background-color: #132c3f;
        top: 10px;
        right: 10px;
        width: 20px;
        height: 20px;
        padding: 2px;
        border-radius: 50%;
        &:hover {
            cursor: pointer;
        }
    }
    .modal-header:not(:has(.modal-image)) {
        button {
            border: 0.1px solid #FFF;
        }
    }
`;

export const Modal = ({ movie, closeModal }) => {
    const movieId = movie.id;
    const [directorNames, setDirectorNames] = useState([]);
    let location = useLocation();

    const getDirectors = () => {
        setDirectorNames([]);
        const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            if (!data.errors) {
                const crew = data.crew;
                const directors = crew.filter((crew) => crew.job === 'Director');
                let directorNames = [];
                directors.forEach(director => directorNames.push(director.name));
                setDirectorNames(directorNames);
            } else {
                return [];
            } 
        })
    }
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") closeModal();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []) 
      useEffect(() => {
        getDirectors();
    }, [movie])
    return (
        <StyledModal>
            <div className="modal" role="dialog">
                <div class="modal-header">
                    <MovieControls movie={movie} closeModal={closeModal}></MovieControls>
                    <img className="close" src={close} onClick={closeModal}></img>
                    <div className="image-wrapper">
                        {movie.backdrop_path && <img className="modal-image" src={`https://image.tmdb.org/t/p/w200${movie.backdrop_path}`}></img>}
                    </div>
                </div>
                <div className="text-wrapper">
                    <h2>{movie.title}</h2>
                    {movie.title !== movie.original_title && (
                        <div className="original-title">Original title: {movie.original_title}</div>
                    )}
                    <div className="directors">
                        {directorNames.length === 1 && (
                            <div>Director: {directorNames[0]}</div>
                        )} 
                        {directorNames.length > 1 && (
                            <div>Directors: {directorNames.join(', ')}</div>
                        )} 
                    </div>
                    <div className="release-year">Release year: {movie.release_date.split('-')[0]}</div>
                    <div className="description">{movie.overview}</div>
                </div>
            </div>
        </StyledModal>
    )
}