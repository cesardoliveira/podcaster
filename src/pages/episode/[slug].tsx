import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import enGB from 'date-fns/locale/en-GB'
import { api } from '../../services/api'
import { convertDurationToTimeString } from '../../utils/converter'
import styles from './episode.module.scss'

type Episode = {
  id: string
  title: string
  description: string
  members: string
  thumbnail: string
  published_at: string
  publishedAt: string
  duration: string
  url: string
  file: File
}

type EpisodeProps = {
  episode: Episode
}

const Episode = ({ episode }: EpisodeProps) => {
  

  return (
    <div className={styles.episode}>
      <div className={styles.thumbnailContainer}>
        <Link className={styles.backButton} href='/'>
          <button type='button'>
            <img src='/arrow-left.svg' alt='Return' />
          </button>
        </Link>
        <Image width={660} height={160} src={episode.thumbnail} style={{objectFit: 'cover'}} />
        <button className={styles.playButton} type='button'>
          <img src='/play.svg' alt='Play episode' />
        </button>
     </div>  
      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.duration}</span>
      </header>
      <div className={styles.description} dangerouslySetInnerHTML={{ __html: episode.description }} />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params

  const { data } = await api.get(`/episodes/${slug}`)

  const episode = {
    id: data.id,
    title: data.title,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', { locale: enGB }),
    thumbnail: data.thumbnail,
    description: data.description,
    duration: convertDurationToTimeString(data.file.duration),
    url: data.file.url
  }

  return {
    props: {
      episode
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}


export default Episode