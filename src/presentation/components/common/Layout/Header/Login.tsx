import { routes } from "@/config/routes";
import useAuth from "@/presentation/hooks/useAuth";
import Link from "next/link";
import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { SlSocialSpotify } from "react-icons/sl";

const Login = () => {
  const { isAuth, user, logout } = useAuth();
  const [isDropwdownOpen, setIsDropdownOpen] = useState(false);

  return (
    isAuth && user
      ? <div
        className={`navbar-item dropdown ${isDropwdownOpen ? 'is-active' : ''}`}
        onClick={() => setIsDropdownOpen(!isDropwdownOpen)}
      >
        <div className="dropdown-trigger">
          <button className="button is-rounded" aria-haspopup="true" aria-controls="dropdown-menu">
            <figure className='image is-24x24 mr-1'>
              <img className="is-rounded" src={user.images[0].url} />
            </figure>
            <span className='is-hidden-tablet'>{user.display_name ? user.display_name[0] : ''}</span>
            <span className='is-hidden-mobile'>{user.display_name}</span>
            <span className="icon is-small">
              {
                isDropwdownOpen ? <FaAngleUp /> : <FaAngleDown />
              }
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            <a className="dropdown-item" onClick={() => logout()}>
              Déconnexion
            </a>
          </div>
        </div>
      </div>
      : <div className='navbar-item'>
        <Link href={routes.LOGIN} className='button is-rounded is-link'>
          <span className="icon">
            <SlSocialSpotify />
          </span>
          <span>Connexion</span>
        </Link>
      </div>
  )
}

export default Login;