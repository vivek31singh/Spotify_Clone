import { reducerCases } from "./Constants";

export const initialState = {
  token: null,
  playlists: [],
  userInfo: null,
  selectedPlaylistId: "37i9dQZF1DWWY64wDtewQt",
  selectedPlaylist: null,
  currentlyPlaying: null,
  playerState: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_TOKEN: {
      return {
        ...state,
        token: action.token,
      };
    }
    case reducerCases.SET_PLAYLISTS: {
      return {
        ...state,
        playlists: action.playlists,
      };
    }

    case reducerCases.SET_USER: {
      return {
        ...state,
        userInfo: action.userInfo,
      };
    }

    case reducerCases.SET_PLAYLIST: {
      return {
        ...state,
        selectedPlaylist: action.selectedPlaylist,
      };
    }

    case reducerCases.SET_PLAYING: {
      return {
        ...state,
        currentlyPlaying: action.currentlyPlaying,
      };
    }

    case reducerCases.SET_PLAYER_STATE: {
      return {
        ...state,
        playerState: action.playerState,
      };
    }

    case reducerCases.SET_PLAYLIST_ID:{
      return {
   ...state,
   selectedPlaylistId: action.selectedPlaylistId,
      }
  }

  case reducerCases.SET_NEWPLAYLIST:{
    return {
      ...state,
      NewPlaylist: action.NewPlaylist,
    }
  }

  case reducerCases.SET_TOPITEMS:{
    return{
      ...state,
      TopItems: action.TopItems,
    }
  }

  case reducerCases.SET_GENRES:{
    return{
      ...state,
      Genres: action.Genres,
      }
  }

    default:
      return state;
  }
};

export default reducer;
