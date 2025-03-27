import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { ResultCard } from "./ResultCard";

const StyledAdd = styled.div `
    .results {
        display: flex;
        flex-direction: column;
        width: min-content;
        margin: 0 auto;
        gap: 20px;
    }
    .input-wrapper {
        display: flex;
        justify-content: center;
    }
    input {
        border-radius: 10px;
        width: 300px;
        height: 40px;
        margin: 0 auto;
        padding: 0 20px;
    }
`;

export const Add = () => {
    const [query, setQuery] = useState("");
    const [results, setResults]= useState([]);
    const onChange = (e) => {
        e.preventDefault();
        setQuery(e.target.value);

        fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1&include_adult=false&query=${e.target.value}`
        )
        .then((res) => res.json())
        .then((data) => {
            !data.errors ? setResults(data.results) : setResults = [];
        })
    }

    return (
        <StyledAdd>
            <div className="container">
                <div className="add-content">
                    <div className="input-wrapper">
                        <input type="text" 
                            placeholder="Search for something strange"
                            value={query}
                            onChange={onChange}
                        />
                    </div>
                    {results.length > 1 && (
                        <ul className="results">
                            {results.map((movie) => (
                                <li key={movie.id}>
                                    <ResultCard movie={movie}/>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </StyledAdd>
    )
}