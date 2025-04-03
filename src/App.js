import styled, { ThemeProvider } from "styled-components";
import GlobalStyle from './globalStyles';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import { Header } from './components/Header';
import { Watched } from './components/Watched';
import { Watchlist } from './components/Watchlist';
import { Discover } from "./components/Discover";

import { GlobalProvider } from "./context/GlobalState";

function App() {
  return (
    <GlobalProvider>      
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Discover/>} />
          <Route path="watched" element={<Watched/>} />
          <Route path="watchlist" element={<Watchlist/>} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
