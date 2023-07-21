import PlaylistSidebar from '@/presentation/components/Sidebar/PlaylistSidebar';
import { RootState } from '@/presentation/redux/store';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SlPlaylist, SlMagnifier } from "react-icons/sl";
import { useSelector } from 'react-redux';
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import useAuth from '@/presentation/hooks/useAuth';

const Header = () => {
  const playlist = useSelector((state: RootState) => state.playlist.playlist);
  const [isOpen, setIsOpen] = useState(false);
  const [isDropwdownOpen, setIsDropdownOpen] = useState(false);
  const { isAuth, user, logout } = useAuth();

  console.log('auth from navbar', isAuth);

  return (
    <header className='mf-header has-background-white'>
      <div className="container">

        {
          isOpen && <PlaylistSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
        }

        <nav className="navbar is-transparent is-block">
          <div className="navbar-brand is-justify-content-space-between">
            <Link className="navbar-item" href="/">
              <Image
                src="/images/logo192.png"
                width={28}
                height={28}
                alt="monflow"
              />

              <span className='navbar-item has-text-weight-bold has-text-black'>
                Monflow
              </span>
            </Link>

            <div className='is-flex mr-2'>
              <Link className="navbar-item" href='/search'>
                <span className="icon">
                  <SlMagnifier />
                </span>
              </Link>
              <a className='navbar-item is-relative has-tag' onClick={() => setIsOpen(!isOpen)}>
                <span className="tag is-primary is-light is-rounded">
                  {playlist.length}
                </span>
                <span className="icon mr-4">
                  <SlPlaylist />
                </span>
              </a>
              {
                user &&
                <div
                  className={`navbar-item dropdown ${isDropwdownOpen ? 'is-active' : ''}`}
                  onClick={() => setIsDropdownOpen(!isDropwdownOpen)}
                >
                  <div className="dropdown-trigger">
                    <button className="button is-rounded" aria-haspopup="true" aria-controls="dropdown-menu">
                      <figure className='image is-24x24 mr-1'>
                        <img className="is-rounded" src={user.images[0].url} />
                      </figure>
                      <span> {user.display_name}</span>
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
              }
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header;