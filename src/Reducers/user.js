import { createSlice } from "@reduxjs/toolkit";

//état initial de l'utilisateur avant connexion
const initialState = {
  tokenStatus: "void",
  dataStatus: "void",
  token: null,
  data: null,
  tokenError: null,
  dataError: null,
  rememberMe: false,
};

//établissement des reducers utilisés dans le projet
export const {actions, reducer} = createSlice({
  name: "user",
  initialState,
  reducers: {
    
    //gestion du token lors du fetch
    tokenFetching: (state) => { 
      if (state.tokenStatus === "void") {
        state.tokenStatus = "pending";
        return;
      }
      if (state.tokenStatus === "rejected") {
        state.tokenStatus = "pending";
        state.tokenError = null;
        return;
      }
      if (state.tokenStatus === "resolved") {
        state.tokenStatus = "updating";
        return;
      }
      return;
    },

    // gestion de l'état du token à la fin de la reqûete
    tokenResolved: (state, action) => {
        if (state.tokenStatus === "pending" || state.tokenStatus === "updating") {
          state.tokenStatus = "resolved";
          state.token = action.payload;
          return;
        }
    },

    //gestion du token et des données utilisateur si token refusé
    tokenRejected: {
      prepare: (tokenError) => ({
        payload: {tokenError},
      }),
      reducer: (state, action) => {
        if (state.tokenStatus === "pending" ||state.tokenStatus === "updating") {
          state.tokenStatus = "rejected";
          state.tokenError = action.payload.message;
          state.token = null;
          return;
        }
      }
    },

    //gestion du fetch des données utilisateur
    dataFetching: (state) => {
      if (state.dataStatus === "void") {
        state.dataStatus = "pending";
        return;
      }
      if (state.dataStatus === "rejected") {
        state.dataStatus = "pending";
        state.dataError = null;
        return;
      }
      if (state.dataStatus === "resolved") {
        state.dataStatus = "updating";
        return;
      }
      return;
    },

    //lorsque la requête est complétée les données sont envoyées
    dataResolved: (state, action) => {
        if (state.dataStatus === "pending" || state.dataStatus === "updating") {
          state.dataStatus = "resolved";
          state.data = action.payload;
          return;
        }
    },

    //gestion des données si refusées
    dataRejected: {
      prepare: (dataError) => ({
        payload: {dataError},
      }),
      reducer: (state, action) => {
        if (state.dataStatus === "pending" || state.dataStatus === "updating") {
          state.dataStatus = "rejected";
          state.dataError = action.payload.message;
          state.data = null;
          return;
        }
      }
    },

    //gestion de l'état utilisateur lors de la déconnexion
    logout: (state) => {
      state.tokenStatus = "void";
        state.dataStatus = "void";
        state.token = null;
        state.data = null;
        state.tokenError = null;
        state.dataError = null;
        state.rememberMe = false;
        return;
    },

    //vérification du token utilisateur
    remember: (state) => {
      if (state.token) {
        state.rememberMe = true;
        return;
      }
      state.rememberMe = !state.rememberMe;
      return;
    },

    //gestion de la mis-à-jour des données utilisateur
    editProfil: {
      prepare: (firstName, lastName) => ({
        payload: {firstName, lastName},
      }),
      reducer: (state, action) => {
        state.data.firstName = action.payload.firstName;
        state.data.lastName = action.payload.lastName;
        return;
      }
    }
  }
})


export default reducer