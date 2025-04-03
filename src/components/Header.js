import React from "react";
import {NavLink} from 'react-router-dom'
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
        @media screen and (min-width: 900px) {
            font-size: 50px;
            padding-top: 30px;
        }
    }
    .image-wrapper {
        position: absolute;
        width: 100vw;
        height: 190px;
        overflow: hidden;
        z-index: -1;
        @media screen and (min-width: 900px) {
            height: 260px;
        }
        img {
            position: relative;
            top: -30%; 
            filter: brightness(60%);
            width: 100%;
        }
    }
    .image-wrapper::after{
        content: "";
        position: absolute;
        background: linear-gradient(0deg, #081b29 10%, rgba(255,255,255,0) 50%);
        z-index: 2;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        @media screen and (min-width: 900px) {
            background: linear-gradient(to top, #142d43 0%,rgba(20,45,67,0) 60%)
            // background: linear-gradient(0deg, #142d43 20%, rgba(255,255,255,0) 60%);
        }
      }
    ul {
        height: 30px;
        padding: 10px 20px;
        display: flex;
        justify-content: right;
        flex-wrap: nowrap;
        gap: 20px;
        @media screen and (min-width: 900px) {
            font-size: 22px;
            gap: 50px;
            padding: 30px 60px;
        }
        a {
            color: #FFF;
            text-decoration: none;
            height: 18px;
            @media screen and (min-width: 900px) {
                height: 25px;
            }
            &.active {
                border-bottom: 1.5px solid #FFF;
                @media screen and (min-width: 900px) {
                    border-bottom: 2px solid #FFF;
                }
            }
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
                    <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>discover</NavLink>
                    <NavLink to="/watched" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>watched</NavLink>
                    <NavLink to="/watchlist" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>watchlist</NavLink>
                </ul>
                <h1>EXPLORE THE <span>STRANGE</span></h1>
            </div>
        </StyledHeader>
    )
}