import { useRef, useEffect } from 'react'
import Image from 'next/image'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { usePlayer } from '../../contexts/player-context'
import styles from './styles.module.scss'

export const Player = () => {
  const audioRef = useRef<HTMLAudioElement>(null)

  const { 
    episodes, 
    currentEpisodeIndex, 
    isPlaying, 
    hasNext, 
    hasPrevious, 
    togglePlay, 
    setPlayingState, 
    playNext, 
    playPrevious
  } = usePlayer()
  const episode = episodes[currentEpisodeIndex]

  useEffect(() => {
    if (!audioRef.current) {
      return
    }

    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  return (
    <div className={styles.container}>
      <header>
        <img src='/playing.svg' alt='Tocando agora'/>
        <strong>Playing now</strong>
      </header>

    {episode ? (
      <div className={styles.currentEpisode}>
        <Image width={192} height={192} src={episode.thumbnail} alt={episode.title} style={{objectFit: 'cover'}}/>
        <strong>{episode.title}</strong>
        <span>{episode.members}</span>
      </div>
      ) 
      : (
      <div className={styles.emptyPlayer}>
        <strong>Select a podcast to listen</strong>
      </div>
      )}

      <footer className={!episode ? styles.empty : ''}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            {episode ? (
              <Slider
                trackStyle={{backgroundColor: '#04d361'}}
                railStyle={{backgroundColor: '#9f75ff'}}
                handleStyle={{borderColor: '#04d361', borderWidth: 4}}
              />
            ) : (
              <div className={styles.emptySlider} />
            )}
          </div>
          <span>00:00</span>
        </div>

        {episode && (
          <audio 
            ref={audioRef} 
            src={episode.url} 
            autoPlay 
            onPlay={() => setPlayingState(true)} 
            onPause={() => setPlayingState(false)} 
          />
        )}

        <div className={styles.buttons}>
          <button type='button' disabled={!episode}>
            <img src='/shuffle.svg' alt='Shuffle' />
          </button>
          <button type='button' onClick={playPrevious} disabled={!episode || !hasPrevious}>
            <img src='/play-previous.svg' alt='Previous track' />
          </button>
          <button type='button' className={styles.playButton} disabled={!episode} onClick={togglePlay}>
            {isPlaying 
              ? <img src='/pause.svg' alt='Pause' />
              : <img src='/play.svg' alt='Play' />
            }

          </button>
          <button type='button' onClick={playNext} disabled={!episode || !hasNext}>
            <img src='/play-next.svg' alt='Next track' />
          </button>
          <button type='button' disabled={!episode}>
            <img src='/repeat.svg' alt='Repeat' />
          </button>
        </div>
      </footer>
    </div>
  )
}