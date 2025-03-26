import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouterList from "./components/RouterList";
import RouterInfo from "./components/RouterInfo";
import EditRouterForm from "./components/EditRouterForm";
import CreateRouterForm from "./components/CreateRouterForm";
import { Box, ThemeProvider } from "@mui/material";
import { theme } from "./styles/theme";
import AppHeader from "./components/AppHeader";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppHeader />
        <Box
          id="main-container"
          sx={{
            display: "flex",
            flex: 1,
            minHeight: "100vh",
            minWidth: "100vh",
          }}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<RouterList />} />
              <Route path="/router/:id" element={<RouterInfo />} />
              <Route path="/edit-router/:id" element={<EditRouterForm />} />
              <Route path="/create-router/:id" element={<CreateRouterForm />} />
            </Routes>
          </BrowserRouter>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
