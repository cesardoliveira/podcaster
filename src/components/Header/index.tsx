import styles from './styles.module.scss'
import format from 'date-fns/format'
import enGB from 'date-fns/locale/en-GB'

export const Header = () => {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
    locale: enGB
  })

  return (
    <header className={styles.container}>
      <img src='/logo.svg' alt='Podcastr' />
      <p>Listen to the best available here</p>
      <span>{currentDate}</span>
    </header>
  )
}