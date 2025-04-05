import React, {useContext} from "react";
import styled, { ThemeProvider } from "styled-components";

import { GlobalContext } from "../context/GlobalState";
import { MovieList } from "./MovieList";

const StyledWatched = styled.div`
    h2 {
        font-size: 20px;
        color: #FFF;
        padding: 30px 30px 10px;
        text-align: center;
        line-height: 30px;
    }
`;

export const Watched = () => {
    const { watched} = useContext(GlobalContext);
    return (
        <StyledWatched>
            { watched.length ? 
                <><h2>Movies you have watched</h2> 
                <MovieList movies={watched}></MovieList></>
                : <h2>You haven't watched any movies yet. Go ahead and add some.</h2>
            }; 
        </StyledWatched>
    )
}