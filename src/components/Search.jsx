
import React, {useRef, useState } from "react";
import styled from "styled-components";
import OtherSidebar from "./OtherSidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Searches from "./Searches";


export default function Search() {
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

  return (
    <Container>
    <div className="spotify__body">
      <OtherSidebar />
      <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
        <Navbar navBackground={navBackground} />
        <div className="body__contents">
          <Searches headerBackground={headerBackground} />
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
