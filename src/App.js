
import './App.css';
import { Box, CircularProgress } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { lazy, Suspense } from "react";

const Task = lazy(() => import("./pages/Task"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));




function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <Box className="display-center">
            <CircularProgress sx={{ margin: "auto" }} />
          </Box>
        }
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/task" element={<Task />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
