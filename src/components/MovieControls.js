import React, { useState, useEffect, useContext } from "react";
import styled, { ThemeProvider } from "styled-components"; 
import { GlobalContext } from "../context/GlobalState";
import { useLocation } from "react-router-dom";


const StyledMovieControls = styled.div` 
    .btn-container {
        display: flex;
        flex-direction: column;
        gap: 7px;
        position: absolute;
        top: 10px;
        left: 10px;
    }
    .ctrl-btn {
        font-family: Cairo;
        cursor: pointer;
        border: none;
        padding: 5px 10px;
        border-radius: 7px;
        background-color: #132c3f;
        color: #FFF;
        &:disabled {
            cursor: auto;
            background-color: #7b7f83;
            color: #c4c4c4;
        }
    }
`;

export const MovieControls = ({ movie, closeModal }) => {
    const {addToWatched, watched} = useContext(GlobalContext);
    const {removeFromWatched, removeFromWatchlist} = useContext(GlobalContext);
    const {addToWatchlist, watchlist} = useContext(GlobalContext);
    let storedInWatchlist = watchlist.find(o => o.id === movie.id);
    let storedInWatched = watched.find(o => o.id === movie.id);
    let location = useLocation();

    const handleRemoveFromWatched = id => {
        removeFromWatched(id);
        closeModal();
    }

    const handleRemoveFromWatchlist = id => {
        removeFromWatchlist(id);
        closeModal();
    }

    const handleAddToWatched = movie => {
        addToWatched(movie);
        removeFromWatchlist(movie.id);
        closeModal();
    }

    return (
        <StyledMovieControls>
                <div className="btn-container">
                    {location.pathname === '/' && (
                        <>
                            <button className="ctrl-btn" onClick={() => addToWatchlist(movie)} disabled={storedInWatched || storedInWatchlist}>Add to watchlist</button>
                            <button className="ctrl-btn" onClick={() => addToWatched(movie)} disabled={storedInWatched || storedInWatchlist}>Mark as watched</button>
                        </>
                    )}
                    {location.pathname === '/watched' && (
                        <>
                            <button className="ctrl-btn" onClick={() => handleRemoveFromWatched(movie.id)}>Remove from watched</button>
                        </>                    
                    )}
                    {location.pathname === '/watchlist' && (
                        <>
                            <button className="ctrl-btn" onClick={() => handleRemoveFromWatchlist(movie.id)}>Remove from watchlist</button>
                            <button className="ctrl-btn" onClick={() => handleAddToWatched(movie)}>Mark as watched</button>
                        </>
                    )}
                </div>
        </StyledMovieControls>
    )
}