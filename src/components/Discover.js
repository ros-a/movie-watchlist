import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Select from 'react-dropdown-select';
import { MovieList } from "./MovieList";

const StyledAdd = styled.div `
    padding-bottom: 50px;
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
        margin: 45px auto 30px;
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
    .load-more {
        font-family: Cairo;
        border: none;
        background-color: #FFF;
        border-radius: 5px;
        height: 50px;
        width: 130px;
        font-size: 15px;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        margin: 40px 0 50px;
        @media screen and (min-width: 1000px) {
            font-size: 20px;
        }
        &:hover {
            cursor: pointer;
        }
    }
    .blur {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        backdrop-filter: blur(3px);
        transition: transform .5s ease;
        background-color: rgba(0, 0, 0, 0.3);

    }
`;

export const Discover = () => {
    const [movies, setMovies]= useState([]);
    const [selectValue, setSelectValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1)

    const selectOptions = () => {
        const decades = ['1920s', '1930s', '1940s', '1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s'];
        let selectOptions = decades.map((x) => {
            const startYear = x.slice(0, -1);
            const endYear = (Number(startYear) + 9).toString();
            return x = ({label: x, value: `${startYear}-${endYear}`})
        });
        return [{label: 'any decade', value: 'any decade'}].concat(selectOptions);
    }

    const handleSelectChange = (selectValue) => {
        setSelectValue(selectValue[0].value);
        setCurrentPage(1);
        setMovies([]);
    }

    const handleLoadMore = () => {
        setCurrentPage(current => current + 1);
    }

    useEffect(() => {
        const getMovies = () => {
            let url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&with_keywords=3307&include_adult=false&language=en-US&page=${currentPage}`
            if (selectValue && selectValue !== 'any decade') {
                const startYear = selectValue.split('-')[0].trim();
                const endYear = selectValue.split('-')[1].trim();
                url += `&primary_release_date.gte=${startYear}-01-01&primary_release_date.lte=${endYear}-12-31`
            }
            fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (!data.errors) {
                    setMovies(current => ([ ...current, ...data.results ]));
                    setTotalPages(data.total_pages);
                } else {
                    setMovies([]);
                }
            })
        };
        getMovies();
    }, [selectValue, currentPage]);
    return (
        <StyledAdd>
            <div className="container">
                <div className="inner-wrapper">
                    <div className="select">
                        <Select
                            options={selectOptions()}
                            labelField="label"
                            valueField="value"
                            onChange={selectValue => handleSelectChange(selectValue)}
                            placeholder="discover by decade"
                        >
                        </Select>
                    </div>
                    {movies.length && (
                        <MovieList movies={movies}></MovieList>
                    )}                    
                    {(totalPages > 1 && currentPage !== totalPages) && (
                            <button className="load-more" onClick={handleLoadMore}>LOAD MORE</button>
                    )}

                </div>
            </div>
        </StyledAdd>
    )
}