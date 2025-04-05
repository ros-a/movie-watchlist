import React, { useState, useEffect, useContext } from "react";
import styled, { ThemeProvider } from "styled-components"; 
import { GlobalContext } from "../context/GlobalState";
import { useLocation } from "react-router-dom";


const StyledMovieControls = styled.div` 
    .button-container {
        display: flex;
        flex-direction: column;
        gap: 7px;
        position: absolute;
        top: 10px;
        left: 10px; 
        span {
            font-size: 13px;
            font-family: Cairo;
            position: relative;
            top: -10px;
            left: -10px;
            background-color: #707070;
            border-radius: 5px 0 5px;
        }
        button {
            font-family: Cairo;
            cursor: pointer;
            border: none;
            padding: 5px 10px;
            border-radius: 7px;
            background-color: #132c3f;
            color: #FFF;
            font-size: 13px;
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
                <div className="button-container">
                    {location.pathname === '/' && (
                        <>
                            {!storedInWatched && !storedInWatchlist ? (
                                <>
                                    <button onClick={() => addToWatchlist(movie)}>Add to watchlist</button>
                                    <button onClick={() => addToWatched(movie)}>Mark as watched</button>
                                </>
                            ) : (
                                <span>Currently in {storedInWatchlist ? 'watchlist' : 'watched'}</span>
                            )
                        }
                        </>
                    )}
                    {location.pathname === '/watched' && (
                        <>
                            <button onClick={() => handleRemoveFromWatched(movie.id)}>Remove from watched</button>
                        </>                    
                    )}
                    {location.pathname === '/watchlist' && (
                        <>
                            <button onClick={() => handleRemoveFromWatchlist(movie.id)}>Remove from watchlist</button>
                            <button onClick={() => handleAddToWatched(movie)}>Mark as watched</button>
                        </>
                    )}
                </div>
        </StyledMovieControls>
    )
}