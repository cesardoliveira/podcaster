import { GetStaticProps } from 'next'
import Image from 'next/image'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import enGB from 'date-fns/locale/en-GB'
import { api } from '../services/api'
import { convertDurationToTimeString } from '../utils/converter'
import styles from './home.module.scss'

type File = {
  url: string
  type: string
  duration: number
}

type Episode = {
  id: string
  title: string
  members: string
  thumbnail: string
  published_at: string
  publishedAt: string
  description: string
  duration: string
  url: string
  file: File
}

type HomeProps = {
  latestEpisodes: Episode[],
  allEpisodes: Episode[]
}

const Home = ({ latestEpisodes, allEpisodes }: HomeProps) => {
  return (
    <div className={styles.homepage}>
      <section className={styles.latestEpisodes}>
        <h2>Latest Episodes</h2>

        <ul>
          {latestEpisodes.map(episode => {
            return (
              <li key={episode.id}>
                <Image width={192} height={192} src={episode.thumbnail} alt={episode.title} style={{objectFit: 'cover'}} />

                <div className={styles.episodeDetails}>
                  <a href=''>{episode.title}</a>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.duration}</span>
                </div>

                <button type='button'>
                  <img src='/play-green.svg' alt='Play episode' />
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      <section className={styles.allEpisodes}>
          <h2>All episodes</h2>

          <table cellSpacing={0}>
            <thead>
              <tr>
                <th></th>
                <th>Podcast</th>
                <th>Members</th>
                <th>Date</th>
                <th>Duration</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allEpisodes.map(episode => { 
                return (
                  <tr key={episode.id}>
                    <td style={{ width: 72 }}>
                      <Image width={120} height={120} src={episode.thumbnail} alt={episode.title} style={{objectFit: 'cover'}} />
                    </td>
                    <td>
                      <a href=''>{episode.title}</a>
                    </td>
                    <td>{episode.members}</td>
                    <td style={{ width: 100 }}>{episode.publishedAt}</td>
                    <td>{episode.duration}</td>
                    <td>
                      <button type='button'>
                        <img src='/play-green.svg' alt='Play episode' />
                      </button>
                    </td>
                  </tr>
                )
              })}
              </tbody>
          </table>
      </section>

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
      duration: convertDurationToTimeString(episode.file.duration),
      url: episode.file.url
    }
  })

  const latestEpisodes = episodes.slice(0, 2)
  const allEpisodes = episodes.slice(2, episodes.length)

  return {
    props: {
      latestEpisodes,
      allEpisodes
    },
    revalidate: 60 * 60 * 8 // new call on api every 8 hours
  }
}

export default Home
