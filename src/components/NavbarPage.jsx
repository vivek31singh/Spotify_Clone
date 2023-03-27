import React from "react";
import styled from "styled-components";
import {AiOutlineLeft, AiOutlineRight} from 'react-icons/ai';
import Avatar from "@mui/material/Avatar";

import { useStateProvider } from "../utils/StateProvider";

export default function NavbarPage({ navBackground }) {
  const [{ userInfo }] = useStateProvider();

  return (
    <Container navBackground={navBackground}>
      
      <div className="icons">
        <AiOutlineLeft className="icon icon-1" size={'35px'}/>
        <AiOutlineRight className="icon icon-2" size={'35px'}/>
      </div>
      <div className="avatar">
        <a href="#">
          <Avatar alt={userInfo?.userName} src={userInfo?.userImage} />
          <span>{userInfo?.userName}</span>
        </a>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: 15vh;
  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;
  background-color: ${(
    { navBackground } //function to perform that useRef hook on the top of album
  ) => (navBackground ? "rgba(0,0,0,0.7)" : "none")};
  z-index: 1;

  .icons {
    margin-top: 20px;
    padding: 0.4rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    
    .icon {
      background-color:#212121;
      color: #b3b3b3;
      margin-left: 20px;
      border: none;
      width: fit-content;
      border-radius: 2rem;
      padding: 10px 10px;
      cursor: not-allowed;
    }

      &:focus {
        outline: none;
      }
    }

    .avatar {
    background-color: black;
    padding: 0.3rem 0.4rem;
    padding-right: 1rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: white;
      font-weight: bold;

      svg {
        font-size: 1.3rem;
        background-color: #282828;
        padding: 0.2rem;
        border-radius: 1rem;
        color: #c7c5c5;
      }
    }
  }
`;
