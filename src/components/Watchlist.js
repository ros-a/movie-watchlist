import React, {useContext} from "react";
import styled from "styled-components";

import { GlobalContext } from "../context/GlobalState";
import { MovieList } from "./MovieList";

const StyledWatchlist = styled.div`
    h2 {
        font-size: 20px;
        color: #FFF;
        padding: 30px 30px 10px;
        text-align: center;
        line-height: 30px;
    }
`;

export const Watchlist = () => {
    const {watchlist} = useContext(GlobalContext);
    return (
        <StyledWatchlist>
            { watchlist.length ? 
                <><h2>Movies in your watchlist</h2> 
                <MovieList movies={watchlist}></MovieList></>
                : <h2>You don't have any movies in your watchlist yet. Go ahead and add some.</h2>
            }; 
        </StyledWatchlist>
    )
}