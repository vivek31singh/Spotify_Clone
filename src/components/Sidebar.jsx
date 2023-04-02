import React from "react";
import styled from "styled-components";
import { IoLibrary } from "react-icons/io5";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import Playlists from "./Playlists";
import { Link } from "react-router-dom";


export default function Sidebar() {
  return (
    <Container>
      <div className="top__links">
        <Link to={'/'}>
        <div className="logo">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
            alt="spotify" 
          />
        </div>
        </Link>
        <ul>
          <Link to={"/home"} className="link">
            <li>
              <MdHomeFilled size={"20px"}/>
              <span className="links__deco">Home</span>
            </li>
          </Link>
          <Link to={"/search"} className="link">
            <li>
              <MdSearch size={"20px"}/>
              <span className="links__deco">Search</span>
            </li>
          </Link>
          <Link to={"/library"} className="link">
            <li>
              <IoLibrary size={"20px"}/>
              <span className="links__deco">Your Library</span>
            </li>
          </Link>
        </ul>
      </div>
      <Playlists />
    </Container>
  );
}

const Container = styled.div`
  background-color: black;
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;

  .top__links {
    display: flex;
    flex-direction: column;

    .logo {
      display:flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin: 1rem 0;

      img {
        max-inline-size: 80%;
        block-size: auto;
      }
    }

    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;

      li {
        display: flex;
        gap: 1rem;
        transition: 0.3s ease-in-out;
        cursor: pointer;
        color: #b3b3b3;

        &:hover {
          color: white;
        }
      }
    }
  }

  .link{
    text-decoration: none;
  }
`;
