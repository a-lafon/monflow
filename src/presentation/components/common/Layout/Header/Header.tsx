import PlaylistSidebar from '@/presentation/components/Sidebar/PlaylistSidebar';
import { RootState } from '@/presentation/redux/store';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { SlPlaylist, SlMagnifier } from "react-icons/sl";
import { useSelector } from 'react-redux';
import { routes } from '@/config/routes';
import Login from './Login';

const Header = () => {
  const playlist = useSelector((state: RootState) => state.playlist.playlist);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='mf-header has-background-white'>
      <div className="container">

        {
          isOpen && <PlaylistSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
        }

        <nav className="navbar is-transparent is-block">
          <div className="navbar-brand is-justify-content-space-between">
            <Link className="navbar-item" href={routes.HOME}>
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

            <div className='is-flex'>
              <Link className="navbar-item" href={routes.SEARCH}>
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

              <Login />
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header;