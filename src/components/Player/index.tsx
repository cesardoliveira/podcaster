import styles from './styles.module.scss'

export const Player = () => {
  return (
    <div className={styles.container}>
      <header>
        <img src="/playing.svg" alt="Tocando agora"/>
        <strong>Playing now</strong>
      </header> 
      <div className={styles.emptyPlayer}>
        <strong>Select a podcast to listen</strong>
      </div> 
      <footer className={styles.empty}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            <div className={styles.emptySlider} />
          </div>
          <span>00:00</span>
        </div>

        <div className={styles.buttons}>
          <button type="button">
            <img src="/shuffle.svg" alt="Shuffle" />
          </button>
          <button type="button">
            <img src="/play-previous.svg" alt="Previous track" />
          </button>
          <button type="button" className={styles.playButton}>
            <img src="/play.svg" alt="Play" />
          </button>
          <button type="button">
            <img src="/play-next.svg" alt="Next track" />
          </button>
          <button type="button">
            <img src="/repeat.svg" alt="Repeat" />
          </button>
        </div>
      </footer>
    </div>
  )
}