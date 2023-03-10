import { Container, CssBaseline } from "@mui/material";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import TaskPage from "./pages/TaskPage";
import NotFound from "./pages/NotFound";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import * as authService from "./services/auth";
import NavBar from "./components/NavBar";
import { useState } from "react";

//Paulino - Exercise 4 CDP Full Stack Batch 04-22
function App() {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState(authService.getAccessToken());

  const handleLogin = async (username, password) => {
    try {
      const response = await authService.login(username, password);
      console.log(response.data.accessToken);
      localStorage.setItem("accessToken", response.data.accessToken);
      const token = localStorage.getItem("accessToken");
      console.log(token);
      setAccessToken(response.data.accessToken);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      }
    }
  };

  const handleLogout = () => {
    authService.logout();
    setAccessToken(null);
    navigate("/login");
  };
  return (
    <>
      <CssBaseline />
      <NavBar onLogout={handleLogout} />
      <Container sx={{ marginTop: 3 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/tasks" />} />
          <Route
            path="/tasks"
            element={accessToken ? <TaskPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/register"
            element={accessToken ? <Navigate to="/" /> : <RegisterPage />}
          />
          <Route
            path="/login"
            element={
              accessToken ? (
                <Navigate to="/" />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
