import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./containers/Login";
import MainPage from "./containers/Main";
import PrivateRoute from "./containers/PrivateRoute";
import styled from "styled-components";
import Header from "./components/Header";
import BoardPage from "./containers/Board";

const AppLayOut = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin: 0 auto;
  max-width: 1920px;
  width: 100%;
`;

function App() {
  return (
    <AppLayOut>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/main" element={<MainPage />} />
            <Route path="/board" element={<BoardPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppLayOut>
  );
}

export default App;
