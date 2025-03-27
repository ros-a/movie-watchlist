import React from "react";
import styled, { ThemeProvider } from "styled-components";

const StyledResultCard = styled.div`

`;

export const ResultCard = ({movie}) => {
    return (
        <StyledResultCard>
            {movie.poster_path ? (
                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                alt={`${movie.title} Poster`}/>
            ) : (
                <div className="filler-poster"></div>
            )
            }
        </StyledResultCard>
    )
}