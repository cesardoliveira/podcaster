import { GetStaticProps } from 'next'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import enGB from 'date-fns/locale/en-GB'
import { api } from '../services/api'
import { convertDurationToTimeString } from '../utils/converter'

type File = {
  url: string
  type: string
  duration: number
}

type Episode = {
  id: string
  title: string
  members: string
  published_at: string
  thumbnail: string
  description: string
  file: File
}

type HomeProps = {
  episodes: Episode[]
}

const Home = (props: HomeProps) => {
  return (
    <div>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const episodes = data.map((episode: Episode) => { 
    return {
      id: episode.id,
      title: episode.title,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: enGB }),
      thumbnail: episode.thumbnail,
      description: episode.description,
      durationAsString: convertDurationToTimeString(episode.file.duration),
      url: episode.file.url
    }
  })

  return {
    props: {
      episodes
    },
    revalidate: 60 * 60 * 8 // new call on api every 8 hours
  }
}

export default Home
