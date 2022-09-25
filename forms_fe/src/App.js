import "./App.css";
import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import FormApp from "./components/FormApp";
import FormList from "./components/form/FormList";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<FormApp />}></Route>
          <Route
            exact
            path="/data"
            element={<FormList readOnly={true} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
