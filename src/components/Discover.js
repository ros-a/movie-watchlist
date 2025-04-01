import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { ResultCard } from "./ResultCard";
import next from '../icons/next.svg';
import previous from '../icons/previous.svg';
import Select from 'react-dropdown-select';
import { PopUp } from "./PopUp";

const StyledAdd = styled.div `
    filter: ${ (popupState) => popupState.open ? "blur(2px)" : "blur(0)"};
    .movie-list {
        display: flex;
        flex-wrap: wrap;
        width: min-content;
        margin: 0 auto;
        row-gap: 15px;
        column-gap: 20px;
        width: 90%;
        li {
            width: calc(50% - 10px);
            &:only-child {
                margin: 0 auto;
            }
        }
    }
    .input-wrapper {
        display: flex;
        justify-content: center;
    }
    input {
        border-radius: 10px;
        width: fit-content;
        height: 40px;
        margin: 0 auto;
        padding: 0 20px;
        &:hover {
            pointer;
        }
        &::placeholder {
            color: #FFF;
        }
    }
    .arrow-container {
        display: flex;
        justify-content: space-between;
        padding-bottom: 20px;
        img {
            width: 20px;
        }
    }
    .select {
        width: 180px;
        margin: 40px auto;
        color: #FFF;
        position: relative;
        input {
            color: #FFF;
            font-size: 15px;
            padding: 10px;
            height: 100%;
            margin: 0;
            &:hover {
                cursor: pointer;
            }
        }
        span {
            padding: 7px 0 0 10px;
            font-size: 15px;
        }
        .react-dropdown-select-dropdown-handle {
            position: absolute;
            right: 10px;
            color: #b7acac;
        }
    }
    .react-dropdown-select {
        border-radius: 5px;
        height: 30px;
        border: 1px solid #b7acac;
    }
    .react-dropdown-select-content {
        height: 100%;
    }
    .react-dropdown-select-dropdown {
        background-color: #0f202f;
        border-radius: 5px;
        padding: 4px;
        span {
            border: none;
        }
    }
`;

export const Discover = () => {
    const [query, setQuery] = useState("");
    const [movies, setMovies]= useState([]);
    const [selectValue, setSelectValue] = useState('');
    const currentYear = new Date().getFullYear();
    const [popupState, setPopupState] = useState({ open: false });
    const [clickedMovie, setClickedMovie] = useState({})
    const rangeOfDecades = () => {
        const decades = ['1920s', '1930s', '1940s', '1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s'];
        return decades.map((x) => {
            const startYear = x.slice(0, -1);
            const endYear = (Number(startYear) + 9).toString();
            return x = ({label: x, value: `${startYear}-${endYear}`})
        })
        // .unshift(({label: 'any year', value: 'any year'}));
    };
    const handleClick = (movie) => {
        setPopupState({ open: true});
        setClickedMovie(movie);
    }
    const getMovies = () => {
        let url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&with_keywords=3307&include_adult=false&language=en-US&page=1`
        if (selectValue) {
            const startYear = selectValue.split('-')[0].trim();
            const endYear = selectValue.split('-')[1].trim();
            console.log('start', startYear, 'end', endYear);
            url += `&primary_release_date.gte=${startYear}-01-01&primary_release_date.lte=${endYear}-12-31`
        }
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            !data.errors ? setMovies(data.results) : setMovies = [];
        })
    };
    useEffect(() => {
        getMovies();
    }, [selectValue])
    return (
        <StyledAdd>
            <div className="container">
                <div className="inner-wrapper">
                    <div className="select">
                        <Select
                            options={rangeOfDecades()}
                            labelField="label"
                            valueField="value"
                            onChange={selectValue => setSelectValue(selectValue[0].value)}
                            placeholder="discover by decade"
                        >
                        </Select>
                    </div>
                    {movies.length > 0 && (
                        <ul className="movie-list">
                            {movies.map((movie) => (
                                <li key={movie.id} onClick={() => handleClick(movie)}>
                                    <ResultCard movie={movie}/>
                                </li>
                            ))}
                        </ul>
                    )}
                    <div className="arrow-container">
                        <img src={previous} alt="previous"/>
                        <img src={next} alt="next" />
                    </div>
                    {popupState.open === true && <PopUp props={clickedMovie}/>}
                </div>
            </div>
        </StyledAdd>
    )
}