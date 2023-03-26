import React, { useEffect } from "react";
import Login from "./components/Login";
import Spotify from "./components/Spotify";
import { useStateProvider } from "./utils/StateProvider";
import { reducerCases } from "./utils/Constants";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";
import Library from "./components/Library";
import Search_content from "./components/Searches";

export default function App() {
  const [{ token }, dispatch] = useStateProvider();

  useEffect(() => {
    const hash = window.location.hash;
    // console.log(hash);
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      // console.log(token);    //this will show the token in split mode

      dispatch({ type: reducerCases.SET_TOKEN, token });
    }
  }, [token, dispatch]);
  return (
    <Router>
      <Routes>
        <Route
          path="/home"
          element={
              <Home />
          }
        />

<Route
          path="/search"
          element={
              
              <Search_content />
          }
        />

<Route
          path="/library"
          element={
              <Library />
          }
        />

        <Route
          path="/"
          element={token ? <Spotify /> : <Login />}
        />
      </Routes>
    </Router>
  );
}