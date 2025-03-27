import styled, { ThemeProvider } from "styled-components";
import GlobalStyle from './globalStyles';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';import { Add } from './components/Add';
import { Header } from './components/Header';
import { Watched } from './components/Watched';
import { Watchlist } from './components/Watchlist';

function App() {
  return (
    <>      
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<Watchlist/>} />
          <Route element={<Watched/>} />
          <Route element={<Add/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
