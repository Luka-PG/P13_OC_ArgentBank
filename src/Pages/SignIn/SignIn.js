import React, { useEffect, useState } from "react";

import { useSelector, useStore } from "react-redux";
import { useNavigate } from "react-router-dom";
import {fetchUpdateToken, fetchUpdateData, rememberMe} from "../../Service/fetchData";
import { selectUser } from "../../Utils/selectors";

import './signIn.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from "@fortawesome/free-solid-svg-icons"

export default function SignIn () {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const store = useStore();
  const user = useSelector(selectUser);

  const navigate = useNavigate();

  useEffect(() => {
    //si l'utilisateur possède déja un token associé alors navigation vers sa page profil
    if (user.token) {
      navigate("/Profil");
    }
  }, [navigate, user.token]);

  //gestion de la checkbox pour se souvenir de l'utilisateur
  const handleCheckbox = () => {
    rememberMe(store);
  };

  //fonction d'envoi des informations lors de la requête de connexion
  async function loginSubmit(e) {
    e.preventDefault();
    const token = await fetchUpdateToken(store, email, password);
    fetchUpdateData(store, token);
  }

    return (
      <main className="main bg-dark">
        <section className="sign-in-content">
          <FontAwesomeIcon className='sign-in-icon' icon={faUserCircle} />
          <h1>Sign In</h1>
          <form onSubmit={(e) => loginSubmit(e)}>

            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <div className="input-remember">
              <input {...{ user }} onChange={handleCheckbox} type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>

              {user.tokenStatus === "rejected"? <div className="errorInfo">Invalid E-mail or password </div> : ""}
              
            <button type="submit" className="sign-in-button"> Sign In </button>

          </form>
        </section>
      </main>
    )
}