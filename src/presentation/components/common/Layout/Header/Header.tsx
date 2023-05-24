import PlaylistSidebar from '@/presentation/components/Sidebar/PlaylistSidebar';
import { RootState } from '@/presentation/redux/store';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { SlPlaylist } from "react-icons/sl";
import { useSelector } from 'react-redux';

const Header = () => {
  const playlist = useSelector((state: RootState) => state.playlist.playlist);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='mf-header has-background-white'>
      <div className="container">

        <PlaylistSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

        <nav className="navbar is-transparent">
          <div className="navbar-brand">
            <Link className="navbar-item" href="/">
              <Image
                src="/images/logo192.png"
                width={28}
                height={28}
                alt="Picture of the author"
              />
            </Link>
            <div className="navbar-burger" data-target="navbarExampleTransparentExample">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div id="navbarExampleTransparentExample" className="navbar-menu">
            <div className='navbar-start'>
              <Link className="navbar-item" href='/search'>
                Créer ma playlist
              </Link>
            </div>
            <div className="navbar-end">
              <a className='navbar-item is-relative has-tag is-size-5' onClick={() => setIsOpen(!isOpen)}>
                <span className="tag is-primary is-light is-rounded">
                  {playlist.length}
                </span>
                <span className="icon mr-4">
                  <SlPlaylist />
                </span>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header;