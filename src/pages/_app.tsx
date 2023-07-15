import type { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { Player } from '../components/Player'
import styles from '../styles/app.module.scss'
import '../styles/global.scss'
import { PlayerContextProvider } from '../contexts/player-context'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PlayerContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContextProvider>
  )
}
