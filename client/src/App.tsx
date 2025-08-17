import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppRoutes from "./Routes";
import { CssBaseline } from "@mui/material";

import "./App.css";

function App() {
  return (
    <CssBaseline>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </CssBaseline>
  );
}

export default App;
