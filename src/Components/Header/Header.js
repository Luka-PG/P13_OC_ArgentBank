import React, { useEffect } from "react";

import { Link } from "react-router-dom"
import { useSelector, useStore } from "react-redux";
import { signOut, checkStorageToken } from "../../Service/fetchData";
import { selectUser } from "../../Utils/selectors";

import './header.css'
import logo from "../../Assets/argentBankLogo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faSignOut } from "@fortawesome/free-solid-svg-icons"

export default function Header () {

const store = useStore();

const user = useSelector(selectUser);

//vérification de la possession d'un token par l'utilisateur
useEffect(() => {
  checkStorageToken(store);
}, [store]);
  
return(
  <nav className="main-nav">
    <Link className="main-nav-logo" to="/">
      <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo"/>
      <h1 className="sr-only">Argent Bank</h1>
    </Link>

    {user.data ? (

      <div>
        <Link className="main-nav-item" to="/Profil">
          <FontAwesomeIcon className='main-nav-icon' icon={faUserCircle} />
            {`${user.data.firstName}`}
        </Link>
        <Link className="main-nav-item" to="/" onClick={() => signOut(store)}>
          <FontAwesomeIcon className='main-nav-icon' icon={faSignOut} />
              Sign Out
        </Link>
      </div>

    ) : (

      <div>
        <Link className="main-nav-item" to="/SignIn">
          <FontAwesomeIcon className='main-nav-icon' icon={faUserCircle} />
            Sign In
        </Link>
      </div>

    )}

  </nav>
  );
}