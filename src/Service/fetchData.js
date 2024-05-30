import { actions } from "../Reducers/user";
import { selectUser } from "../Utils/selectors";

//fonction pour venir fetch / mettre à jour le token 
export async function fetchUpdateToken(store, email, password) {
  
  //on vient prendre le status du token et de l'utilisateur
  const tokenStatus = selectUser(store.getState()).tokenStatus;
  const rememberMeValue = selectUser(store.getState()).rememberMe;

  if (tokenStatus === "pending" || tokenStatus === "updating") {
    return;
  }

  //on prèpare le fetch du token en indiquant les informations nécessaire dans le header de la requête
  store.dispatch(actions.tokenFetching());
  //header de la requête de fetch
  const optionsToken = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  };

  try {
    //fetch du token avec info header
    const response = await fetch("http://localhost:3001/api/v1/user/login",optionsToken);
    const res = await response.json();
    //on dispatch l'action de résolution du token pour finir le fetch
    store.dispatch(actions.tokenResolved(res.body.token));
  //si la case "se souvenir de moi" à été cochée :
    if (rememberMeValue) {
      //on set le token dans le local storage et le session storage pour que, si l'utilisateur re-ouvre la page, sa session est toujours ouverte
      localStorage.setItem("token", res.body.token);
      sessionStorage.setItem("token", res.body.token);
    }
    return res.body.token;
  } 
  catch (error) {
    console.log(typeof error);
    store.dispatch(actions.tokenRejected(error));
    return null;
  }
}
  
//fonction pour fetch les data au token correspondant
export async function fetchUpdateData(store, token) {
  if (token === null) {
    return;
  }
  //si le statut de l'utilisateur est en cours de mis à jour ou pas disponible pour le moment on return
  const dataStatus = selectUser(store.getState()).dataStatus;
  if (dataStatus === "pending" || dataStatus === "updating") {
    return;
  }
  // on active l'action de data fetching avec le header et le token correspondant
  store.dispatch(actions.dataFetching());
  const requestForProfilHeaders = {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  try {
    //requête pour avoir les données correspondant et le token d'autorisation
    const response = await fetch("http://localhost:3001/api/v1/user/profile",requestForProfilHeaders);
    const res = await response.json();
    //si requête non autorisée alors on déconnecte l'utilisateur
    if (res.status === 401) {
      signOut(store);
      return;
    }
    store.dispatch(actions.dataResolved(res.body));
  } catch (error) {
    store.dispatch(actions.dataRejected(error));
  }
}

//fonction d'édition du profil
export async function editProfil(store, firstName, lastName, token) {
  const optionsEditProfil = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ firstName, lastName }),
  };
  try {
    //requête de mise-à-jour de profil
    await fetch("http://localhost:3001/api/v1/user/profile",optionsEditProfil);
    store.dispatch(actions.editProfil(firstName, lastName));
  } catch (error) {
    store.dispatch(actions.dataRejected(error));
  }
}

//fonction pour vérifier la présence d'un token utilisateur et se rappeler de l'utilisateur
export function checkStorageToken(store) {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  if (token) {
    fetchUpdateData(store, token);
    store.dispatch(actions.remember());
  }
}

//fonction pour garder l'utilisateur en mémoire si la case "se souvenir de moi" est cochée  
export function rememberMe(store) {
  store.dispatch(actions.remember());
}
  
//fonction pour supprimer le token du storage lors de la déconnexion
export function signOut(store) {
  store.dispatch(actions.logout());
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
}
