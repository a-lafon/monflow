import { RootState } from '@/redux/store';
import Image from 'next/image';
import Link from 'next/link';
import { SlPlaylist } from "react-icons/sl";
import { useSelector } from 'react-redux';

const Header = () => {
  const tracks = useSelector((state: RootState) => state.playlist.tracks);

  return (
    <header className='mf-header has-background-white'>
      <div className="container">
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
              <a className='navbar-item is-relative has-tag'>
                <span className="tag is-primary is-light is-rounded">
                  {tracks.length}
                </span>
                <span className="icon mr-3">
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