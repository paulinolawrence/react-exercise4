import jwtDecode from "jwt-decode";
import http from "./http";

export function register(name, username, password) {
  return http.post("/users", { name, username, password });
}

export function login(username, password) {
  return http.post("/auth", { username, password });
}

export function logout() {
  localStorage.removeItem("accessToken");
}

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export function getCurrentUser() {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    const decoded = jwtDecode(accessToken);
    console.log(decoded);
    return decoded;
  }
  return null;
}
