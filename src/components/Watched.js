import React, {useContext} from "react";
import styled, { ThemeProvider } from "styled-components";

import { GlobalContext } from "../context/GlobalState";
import { MovieList } from "./MovieList";

const StyledWatched = styled.div`
`;

export const Watched = () => {
    const {watched} = useContext(GlobalContext);
    return (
        <StyledWatched>
            <MovieList movies={watched}></MovieList>
        </StyledWatched>
    )
}