import React, { useRef,useEffect, useState } from "react";
import { useStateProvider } from "../utils/StateProvider";
import styled from "styled-components";
import LibrarySidebar from  './LibrarySidebar';
import NavbarPage from "./NavbarPage";
import LibraryContent from './LibraryContent'
import { reducerCases } from "../utils/Constants";
import axios from 'axios';


export default function Playlists() {
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

  const [{ token, selectedPlaylistId }, dispatch] =
  useStateProvider();
useEffect(() => {
  const getInitialPlaylist = async () => {
    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    const selectedPlaylist = {
      id: response.data.id,
      name: response.data.name,
      description: response.data.description.startsWith("<a")
        ? ""
        : response.data.description,
      image: response.data.images && response.data.images[0].url,
      tracks: response.data.tracks.items.map(({ track }) => ({
        id: track.id,
        name: track.name,
        artist: track.artists.map((artist) => artist.name),
        image: track.album.images[2].url,
        duration: track.duration_ms,
        album: track.album.name,
        context_uri: track.album.uri,
        track_number: track.track_number,
      })),
    };

    dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
  };
  getInitialPlaylist();
}, [token, dispatch, selectedPlaylistId]);

  return (
    <Container>
      <div className="spotify__body">
        <LibrarySidebar />
        <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
          <NavbarPage navBackground={navBackground} />
          <div className="body__contents">
            <LibraryContent headerBackground={headerBackground} />
          </div>
        </div>
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
