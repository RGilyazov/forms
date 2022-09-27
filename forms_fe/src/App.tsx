import "./App.css";
import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import TemplatesPage from "./components/TemplatesPage";
import DataPage from "./components/DataPage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Fragment>
      <ToastContainer />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<TemplatesPage />}></Route>
          <Route path="/data" element={<DataPage />}></Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
