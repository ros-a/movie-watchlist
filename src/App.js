import styled, { ThemeProvider } from "styled-components";
import GlobalStyle from './globalStyles';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import { Header } from './components/Header';
import { Watched } from './components/Watched';
import { Watchlist } from './components/Watchlist';
import { Add } from "./components/Add";

function App() {
  return (
    <>      
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Watchlist/>} />
          <Route path="watched" element={<Watched/>} />
          <Route path="add" element={<Add/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
