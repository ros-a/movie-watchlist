import React, { useState, useEffect } from "react";
import styled from "styled-components"; 

const StyledPopUp = styled.div`
    .container {
        position: fixed;
        top: 50%; 
        left: 50%; 
        transform: translate(-50%, -50%);
        width: 80vw;
        height: auto;
        background-color: #000;
        border-radius: 10px;
        color: #FFF;
    } 
    .text-wrapper {
        padding: 20px;
    }
    img {
        width: 100%;
        border-radius: 10px 10px 0 0;
    }
`;

export const PopUp = ({ props }) => {
    return (
        <StyledPopUp>
            <div className="container">
                <img src={`https://image.tmdb.org/t/p/w200${props.backdrop_path}`}></img>
                <div className="text-wrapper">
                    <h2>{props.original_title}</h2>
                    <div className="description">{props.overview}</div>
                    <div className="release-date">{props.release_date}</div>
                    <div className="vote-average">{props.vote_average}</div>
                    <div className="vote-count">{props.vote_count}</div>
                </div>
            </div>
        </StyledPopUp>
    )
}