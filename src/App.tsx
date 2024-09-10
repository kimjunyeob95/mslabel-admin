import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./containers/Login";
import MainPage from "./containers/Main";
import PrivateRoute from "./containers/PrivateRoute";
import styled from "styled-components";
import Header from "./components/Header";
import BoardPage from "./containers/Board";
import BasicLabelPage from "./containers/BasicLabel";
import BasicLabelDetailPage from "./containers/BasicLabelDetail";

const AppLayOut = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin: 0 auto;
  min-width: 1920px;
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
            <Route path="/main/:contents" element={<MainPage />} />
            <Route path="/board/:contents" element={<BoardPage />} />
            <Route path="/basicLabel/:contents" element={<BasicLabelPage />} />
            <Route
              path="/basicLabel/detail/:id"
              element={<BasicLabelDetailPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppLayOut>
  );
}

export default App;
