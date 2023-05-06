import '../styles/app.scss';
import type { AppProps } from 'next/app'
import { Nunito } from 'next/font/google'
import { store } from '../redux/store'
import { Provider } from 'react-redux'

const inter = Nunito({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
