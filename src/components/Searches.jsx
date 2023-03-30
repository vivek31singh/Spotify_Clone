import React from "react";
import { useEffect, useState } from "react";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import styled from "styled-components";
import { reducerCases } from "../utils/Constants";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";

export default function Searches() {
  const [{ token }, dispatch] = useStateProvider();
  const [TopItems, setTopItems] = useState([]);
  const [genres, setGenres] = useState([]);

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
        // console.log(response) //this will show the artists data coming from the api
        const TopItems = response.data.items
          ? response.data.items.map((item) => ({
              id: item.id,
              name: item.name,
              artist_name: item.name,
              image: item.images && item.images[0].url,
              genres: item.genres[0],
            }))
          : [];

        setTopItems(TopItems);
        dispatch({ type: reducerCases.SET_TOPITEMS, TopItems });
      } catch (error) {
        console.error(error);
      }
    };

    getTopArtists();
  }, [token, dispatch]);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/recommendations/available-genre-seeds`,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        // console.log(response) //this will display the data of genre coming from api
        const genres = response.data.genres
          ? response.data.genres.map((genre) => ({ genres: genre }))
          : [];

        setGenres(genres);
        dispatch({ type: reducerCases.SET_GENRES, genres });
      } catch (error) {
        console.error(error);
      }
    };

    getGenres();
  }, [token, dispatch]);

  return (
    <Container>
      <h1 className="Heading">Top Artists</h1>
      <div className="playlist">
        {TopItems &&
          TopItems.map(({ id, name, image, genres }) => (
            <div key={id} className="playlist-item">
              <div className="image">
                <img src={image} alt={name} />
              </div>
              <div className="details">
                <PlayCircleFilledIcon className="play_btn" htmlColor="green" />
                <div className="album__info">
                  <h6 className="title">{name}</h6>
                  <p>{genres}</p>
                </div>
              </div>
            </div>
          ))}
      </div>

      <h1 className="Genre_Heading">Genres</h1>
      <div className="Genres">
        {genres &&
          genres.map(({ genres }) => (
            <div key={genres} className="Genre_details">
              <div className="Genre__info">
                <h6 className="Genre_title">{genres}</h6>
              </div>
            </div>
          ))}
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: fit-content;
  width: 100%;
  overflow: hidden;

  .Heading {
    margin: 2rem 0rem;
    margin-bottom: 0rem;
    padding-left: 2.5rem;
    margin-left: 3rem;
    font-family: "Nunito Sans", sans-serif;
    color: #fff;
    font-size: xx-large;
    width: fit-content;
    &:hover {
      color: #b3b3b3;
      transition: 200ms ease-in-out;
    }
  }

  .playlist {
    margin: 2rem 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;

    .playlist-item {
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: saturate(180%) blur(10px);
      height: 50vh;
      width: 15vw;
      border-radius: 3%;
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
      margin-left: 3rem;
    }

    .image {
      img {
        border-radius: 3%;
        height: 20vh;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
        margin: 2rem 2rem;
        width: 10vw;
      mix-blend-mode:color-dodge ;
      }
    }
    .details {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      align-items:center;
      justify-content: center;
      gap: 1rem;
      color: #e0dede;
      width: 15rem; /* add a fixed width */
      height: max-content;
      /* background-color: red; */

      .album__info {
        display: flex;
        flex-direction: column;
        align-items:center;
        justify-content: center;
        margin-left: -3rem;
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

  .Genre_Heading {
    margin-top: 30vh;
    margin-bottom: 0rem;
    padding-left: 2.5rem;
    margin-left: -0.9rem;
    font-family: "Nunito Sans", sans-serif;
    color: #fff;
    font-size: xx-large;
    width: fit-content;

    &:hover {
      color: #b3b3b3;
      transition: 200ms ease-in-out;
    }
  }
  .Genres {
    margin: 4rem 2rem;
    margin-left: -3rem;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-items: center;
    gap: 1.5rem;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;

    .Genre__info {
      display: flex;
      flex-direction: column;
      height: 10rem;
      width: 14rem;
      text-align: center;
      text-transform: capitalize;
      text-justify: auto;
      font-family: "Nunito Sans";
      cursor: pointer;
      margin-left: 6rem;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: saturate(180%) blur(10px);
      align-items: center;
      justify-content: center;
      border-radius: 5%;
      padding: 4rem 3rem;
      &:hover {
        background: rgba(0, 0, 0, 0.4);
        .Genre_title {
          opacity: 1;
          transition: opacity 0.3s ease-in-out;
          cursor: pointer;
        }
      }
    }
    .Genre_details {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      gap: 1rem;
      align-items: center;
      justify-content: center;
      color: #e0dede;
      width: 15rem; /* add a fixed width */
      height: max-content;
      /* background-color: red; */
    }
.Genre_title{
  font-size: 1rem;
  color: #fff;
  opacity: 0.5;
}
}
`;
