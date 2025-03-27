import React from "react";
import {Link} from 'react-router-dom'
import styled, { ThemeProvider } from "styled-components"; 
  
const StyledHeader = styled.div` 
`;

export const Header = () => {
    return (
        <StyledHeader>
            <div className="container">
                <div className="inner-content">

                </div>
                <ul className="nav-links">
                    <Link to="/">Watchlist</Link>
                    <Link to="/watched">Watched</Link>
                    <Link to="/add" className="btn">Add</Link>
                </ul>
            </div>
        </StyledHeader>
    )
}