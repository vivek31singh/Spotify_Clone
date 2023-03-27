import React from "react";
import { useEffect, useState } from "react"; // import useState
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import styled from "styled-components";
import { reducerCases } from "../utils/Constants";


export default function Searches() {
  const [{ token }, dispatch] = useStateProvider();
  const [TopItems, setTopItems] = useState([]); // define TopItems

  useEffect(() => {
    const getTopArtists = async () => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/me/top/artists`,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        // console.log(response.data); // log the response data
        // console.log(response.headers); // log the response headers

        const TopItems = response.data.items ? response.data.items.map((item) => ({
          id: item.id,
          name: item.name,
          artist_name: item.name,
          image: item.images && item.images[0].url,
          genres: item.genres[0]
        })) : [];

        setTopItems(TopItems); // set the state value
        dispatch({ type: reducerCases.SET_TOPITEMS, TopItems });
      } catch (error) {
        console.error(error);
      }
    };

    getTopArtists();
  }, [token, dispatch]);

  return (
    <Container>
        <h1 className="Heading">Top Artists</h1>
      <div className="playlist">
      {TopItems &&
          TopItems.map(({ id, name,genres, artist_name, image }) => (
            <div key={id} className="playlist-item">
              <div className="image">
                <img src={image} alt={name} />
              </div>
              <div className="details">
                <div className="album__info">
                  <h6 className="title">{name}</h6>
                  <p>{genres}</p>
                </div>
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
    margin-bottom: 0rem;
    padding-left: 2.5rem;
    font-family: "Nunito Sans", sans-serif;
    color: #fff;
    font-size: xx-large;
    width: fit-content;

    &:hover{
      color:#b3b3b3;
      transition: 200ms  ease-in-out;
    }
  }

  .playlist {
    margin: 4rem 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    gap: 4rem;

    .playlist-item {
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: saturate(180%) blur(10px);
      border-radius: 50%;
      height: 19rem;

      cursor: pointer;
      &:hover {
        background: rgba(0, 0, 0, 0.4);
        .play_btn {
          opacity: 1;
          transform: scale(1.9);
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
        height: 15rem;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
        border-radius: 50%;
        margin: 2rem 2rem;
        width: 18vw;
      }
    }
    .details {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      gap: 1rem;
      color: #e0dede;
      width: 15rem; /* add a fixed width */
      height: max-content;
     /* background-color: red; */
     
      .album__info {
        display: flex;
        flex-direction: column;
        margin-left: 6rem;
      }

      .title {
        color: white;
        font-size: 1rem;
        white-space: nowrap; /* prevent line breaks */
        overflow: hidden; /* hide overflowing text */
        text-overflow: ellipsis;

        &:hover {
          width: fit-content;
        }
      }
    }
  }
`;
