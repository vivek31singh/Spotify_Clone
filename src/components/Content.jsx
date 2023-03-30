import React from "react";
import { useEffect } from "react";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import styled from "styled-components";
import { reducerCases } from "../utils/Constants";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";

export default function Content() {
  const [{ token, NewPlaylist }, dispatch] = useStateProvider();

  useEffect(() => {
    const getInitialAlbums = async () => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/browse/new-releases`,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        // console.log(response.data); // log the response data
        // console.log(response.headers); // log the response headers

        const NewPlaylist = response.data.albums.items.map((item) => ({
          id: item.id,
          name: item.name,
          artist_name: item.artists[0].name,
          image: item.images && item.images[0].url,
        }));

        dispatch({ type: reducerCases.SET_NEWPLAYLIST, NewPlaylist });
      } catch (error) {
        console.error(error);
      }
    };

    getInitialAlbums();
  }, [token, dispatch, NewPlaylist]);

  const now = new Date();
  const hour = now.getHours();
  let time;

  if (hour >= 5 && hour < 12) {
    time = "Morning ☀️";
  } else if (hour >= 12 && hour < 18) {
    time = "Afternoon 🕑";
  } else {
    time = "Evening 🌃";
  }

  return (
    <Container>
      <div className="Heading">
        <h1>Good {time}</h1>
      </div>

      <h1 className="Heading1">New Releases</h1>
      <div className="playlist">
        {NewPlaylist &&
          NewPlaylist.map(({ id,artist_name, name, image }) => (
            <div key={id} className="playlist-item">
              <div className="image">
                <img src={image} alt={name} />
              </div>
              <div className="details">
                <div className="album__info">
                  <h6 className="title">{name}</h6>
                  <p className="artist">by {artist_name}</p>
                </div>
                <PlayCircleFilledIcon className="play_btn" htmlColor="green" />
              </div>
            </div>
          ))}
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100%;

  .Heading {
    margin: 2rem 0rem;
    padding-left: 4rem;
    font-family: "Nunito Sans", sans-serif;
    color: #fff;
    font-size: larger;
    width: fit-content;
  }

  .Heading1 {
    margin-top: 3rem;
    margin-bottom: 1rem;
    padding-left: 4rem;
    font-family: "Nunito Sans", sans-serif;
    color: #fff;
    font-size: xx-large;
    width: fit-content;
  }

  .playlist {
    margin: 0rem 4rem 2rem 2rem;
    padding-left: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    gap: 2rem;
    
    .playlist-item {
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: saturate(180%) blur(10px);
      border-radius: 0.5rem;
      padding: 1rem 1rem;
      cursor: pointer;
      height: auto;
      width: 15vw;
      &:hover {
        background: rgba(0, 0, 0, 0.4);
        .play_btn {
          opacity: 1;
          transform: scale(1.7);
          transition: opacity 0.4s ease-in-out;
          cursor: pointer;
        }
      }
    }
    .play_btn {
      opacity: 0;

    }

    .image {
      img {
        height: 10rem;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
        border-radius: 5px;
        }
    }
    .details {
      display: flex; /* use flexbox to control layout */
  flex-grow: 1; /* allow the details to expand to fill available space */
  flex-basis: 0; /* set the initial width to 0 */
  max-width: 100%; /* set a maximum width to prevent overflow */
overflow:hidden; /* hide any content that exceeds the width */
      flex-direction: column;
      flex-wrap: nowrap;
      gap: 1rem;
      color: #e0dede;
      width: 15rem; /* add a fixed width */
      height: max-content;
  padding: 1rem;
  position: relative;
  

      .album__info {
        display: flex;
        flex-direction: column;
      }

      .title {
        color: white;
        font-size: 1rem;
        white-space: nowrap; /* prevent line breaks */
        overflow: hidden; /* hide overflowing text */
        text-overflow: ellipsis;

        &:hover {
          width: fit-content;
          color: #e0dede;
        }
      }
    }
  }
`;
