/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import NavbarPage from "./NavbarPage";
import Footer from "./Footer";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import Content from "./Content";
import Search_content from "./Searches";


export default function Spotify() {
  const [{ token }, dispatch] = useStateProvider();
  const bodyRef = useRef(); //used to make the head part of the album turn black
  const [navBackground, setNavBackground] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);

  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 30
      ? setNavBackground(true)
      : setNavBackground(false);

    bodyRef.current.scrollTop >= 268
      ? setHeaderBackground(true)
      : setHeaderBackground(false);
  };
  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      // console.log({ data }); //this log will show the user data like profile picture and display name

      const userInfo = {
        userId: data.id,
        userName: data.display_name,
        userImage: data.images[0]?.url,
      };

      dispatch({ type: reducerCases.SET_USER, userInfo });
    };

    getUserInfo();
  }, [token, dispatch]);

  return (
    <Container>
      <div className="spotify__body">
        <Sidebar />
        <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
          <NavbarPage navBackground={navBackground} />
          <div className="body__contents">
            <Search_content headerBackground={headerBackground} />
          </div>
        </div>
      </div>
      <div className="spotify__footer">
        {/* <Footer /> */}
      </div>
    </Container>
  );
}

const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;


  .spotify__body {
    display: grid;
    grid-template-columns: 15vw 85vw;
    height: 100vh;
    width: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    background-color: rgb(32, 87, 100);
  }

  .body {
    height: 100%;
    width: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.7rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
  }
`;
