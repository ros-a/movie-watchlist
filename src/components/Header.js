import React from "react";
import {Link} from 'react-router-dom'
import styled, { ThemeProvider } from "styled-components"; 
const images = require.context('../images', true);
const imageList = images.keys().map(image => images(image));

const StyledHeader = styled.div` 
    h1 {
        font-family: Cairo;
        padding: 20px 20px 0;
        margin-top: 35px;
        color: #ebeb12;
        text-align: center;
        font-size: 30px;
    }
    .image-wrapper {
        position: absolute;
        width: 100vw;
        height: 190px;
        overflow: hidden;
        z-index: -1;
        img {
            object-fit: cover;
            object-position: 50% 30%;
            filter: brightness(60%);
            width: 100%;
        }
    }
    .image-wrapper::after{
        content: "";
        position: absolute;
        background: linear-gradient(0deg, #0f202f 10%, rgba(255,255,255,0) 50%);
        z-index: 2;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
      }
    ul {
        height: 30px;
        padding: 10px 20px;
        display: flex;
        justify-content: right;
        flex-wrap: nowrap;
        gap: 20px;
        a {
            color: #FFF;
            text-decoration: none;
        }
        a:visited {
            text-decoration: underline;
        }
    }

`;

export const Header = () => {
    const randomImage = imageList[Math.floor(Math.random() * imageList.length)];
    const imageName = randomImage.split(".");
    console.log(imageName);
    return (
        <StyledHeader>
            <div className="container">
                <div className="image-wrapper">
                    <img src={randomImage} />
                    <span className="image-source">{randomImage.Header}</span>
                </div>
                    <ul className="nav-links">
                    <Link to="/">discover</Link>
                    <Link to="/watched">watched</Link>
                    <Link to="/watchlist" className="btn">watchlist</Link>
                </ul>
                <h1>EXPLORE THE <span>STRANGE</span></h1>
            </div>
        </StyledHeader>
    )
}