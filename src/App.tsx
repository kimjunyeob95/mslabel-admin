import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./containers/Login";
import MainPage from "./containers/Main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        {localStorage.getItem("token") === undefined && (
          <Navigate replace to="/" />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
