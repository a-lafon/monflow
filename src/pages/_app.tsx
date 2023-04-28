import '../styles/app.scss';
import type { AppProps } from 'next/app'
import { Nunito } from 'next/font/google'

const inter = Nunito({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
