import { createContext, useContext, useState, ReactNode } from 'react'

type Episode = {
  title: string
  members: string
  thumbnail: string
  duration: string
  url: string
}

type PlayerContextData = {
  episodes: Episode[],
  currentEpisodeIndex: number,
  isPlaying: boolean,
  hasNext: boolean
  hasPrevious: boolean
  play: (episode: Episode) => void
  playList: (list: Episode[], index: number) => void
  playNext: () => void
  playPrevious: () => void
  togglePlay: () => void
  setPlayingState: (state: boolean) => void
}

export const PlayerContext = createContext({} as PlayerContextData)

type PlayerContextProviderProps = {
  children: ReactNode
}

export const PlayerContextProvider = ({ children }: PlayerContextProviderProps) => {
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const play = (episode: Episode) => {
    setEpisodes([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  const playList = (list: Episode[], index: number) => {
    setEpisodes(list)
    setCurrentEpisodeIndex(index)
    setIsPlaying(true)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const setPlayingState = (state: boolean) => {
    setIsPlaying(state)
  }

  const hasPrevious = currentEpisodeIndex > 0
  const hasNext = (currentEpisodeIndex + 1) < episodes.length

  const playNext = () => {
    const nextEpisodeIndex = currentEpisodeIndex + 1

    if (hasNext) {
      setCurrentEpisodeIndex(nextEpisodeIndex)
    }
  }

  const playPrevious = () => {
    const previousEpisodeIndex = currentEpisodeIndex - 1
    
    if (hasPrevious) {
      setCurrentEpisodeIndex(previousEpisodeIndex)
    }
  }

  return (
    <PlayerContext.Provider 
      value={{ 
        episodes, 
        currentEpisodeIndex, 
        isPlaying, 
        hasNext,
        hasPrevious,
        play, 
        playList,
        playNext,
        playPrevious,
        togglePlay, 
        setPlayingState
      }}>
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
  return useContext(PlayerContext)
}