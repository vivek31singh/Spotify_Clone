import axios from "axios";
import React, { useEffect } from "react";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";
import styled from "styled-components";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";

export default function Playlists() {
  const [{ token, playlists }, dispatch] = useStateProvider();
  useEffect(() => {
    const getPlaylistData = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response); //this will check if the api is sending back the data or an error
      const { items } = response.data;
      const playlists = items.map(({ id, name, images }) => ({
        id,
        name,
        image: images[0]?.url,
      }));

      //  console.log(playlists); //this will show the playlists in sorted mode
      dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
    };
    getPlaylistData();
  }, [token, dispatch]);

  const changeCurrentPlaylist = (selectedPlaylistId) => {
    dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
  };

  return (
    <Container>
      <h4 className="Heading">Playlists</h4>
      <div className="playlists">
        {playlists &&
          playlists.length > 0 &&
          playlists.map(({ name, image, id }) => (
            <div
              className="playlist"
              key={id}
              onClick={() => changeCurrentPlaylist(id)}
            >
              <img className="image" src={image} alt={name} />
              <PlayCircleFilledIcon className="play_btn" htmlColor="green" />
              <h1 className="name">{name}</h1>
            </div>
          ))}
      </div>
    </Container>
  );
}
const Container = styled.div`
  height: 100vh;
  width: 100%;
  overflow: hidden;

  .Heading{
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 2rem;
    margin-bottom: 2rem;
    margin-left: 0.9rem ;
  }

  .playlists{
    /* background-color: aliceblue; */
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;

    .play_btn {
      opacity: 0;
    }
    
    .playlist{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      height: auto;
      width: 20vw;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: saturate(180%) blur(10px);
      border-radius: 0.5rem;
      padding: 1rem 1rem;
      border: 1px solid  black;
      text-align: center;
      cursor: pointer;
      
      &:hover {
        background: rgba(0, 0, 0, 0.4);
        .play_btn {
          opacity: 1;
          transform: scale(1.7);
          transition: opacity 0.4s ease-in-out;
          cursor: pointer;
        }
      }
      
      .image{
        height: 37vh;
        width: fit-content;
        margin-bottom: 2rem;
        margin-top: 0rem;
        border-radius: 5%;
      }
      
      .name{
        font-size: 1rem;
        color: #fff;
        margin-bottom: 10px;
        margin-top: 20px;
      }
    }
  }
`;
