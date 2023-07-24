import PlaylistSidebar from '@/presentation/components/Sidebar/PlaylistSidebar';
import { RootState } from '@/presentation/redux/store';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SlPlaylist, SlMagnifier } from "react-icons/sl";
import { useSelector } from 'react-redux';
import { routes } from '@/config/routes';
import Login from './Login';
import { AnimatePresence, useAnimate } from 'framer-motion';

const Header = () => {
  const playlist = useSelector((state: RootState) => state.playlist.playlist);
  const [isOpen, setIsOpen] = useState(false);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (playlist && playlist.length >= 1) {
      animate([
        ['span.tag', { scale: 1.25 }, { duration: 0.2 }],
        ['span.tag', { scale: 1 }]
      ])
    }
  }, [playlist])

  return (
    <header className='mf-header has-background-white'>
      <div className="container">

        <AnimatePresence>
          {
            isOpen && <PlaylistSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
          }
        </AnimatePresence>

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
              <a ref={scope} className='navbar-item is-relative has-tag' onClick={() => setIsOpen(!isOpen)}>
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