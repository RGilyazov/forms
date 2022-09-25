import "./App.css";
import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import TemplatesPage from "./components/TemplatesPage";
import DataPage from "./components/DataPage";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<TemplatesPage />}></Route>
          <Route exact path="/data" element={<DataPage />}></Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
