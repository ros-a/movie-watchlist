import React, {createContext, useReducer, useEffect} from 'react';
import AppReducer from './AppReducer';

const initialState = {
    watchlist: localStorage.getItem('watchlist') 
    ? JSON.parse(localStorage.getItem('watchlist')) 
    : [],
    watched: localStorage.getItem('watched') 
    ? JSON.parse(localStorage.getItem('watched')) 
    : [],
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = props => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    useEffect(() => {
        localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
        localStorage.setItem('watched', JSON.stringify(state.watched));
    }, [state]);

    const addToWatchlist = movie => {
        dispatch({ type: "ADD_TO_WATCHLIST", payload: movie })
    }

    const addToWatched = movie => {
        dispatch({ type: "ADD_TO_WATCHED", payload: movie })
    }

    const removeFromWatchlist = id => {
        dispatch({ type: "REMOVE_FROM_WATCHLIST", payload: id })
    }

    const removeFromWatched = id => {
        dispatch({ type: "REMOVE_FROM_WATCHED", payload: id })
    }

    return (
        <GlobalContext.Provider value={{ 
            watchlist: state.watchlist, 
            watched: state.watched, 
            addToWatchlist, 
            addToWatched,
            removeFromWatchlist,
            removeFromWatched,
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
};