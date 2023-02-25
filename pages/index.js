import styles from '@/styles/Home.module.css'
import Head from 'next/head'
import { useEffect, useRef } from 'react'
import { Exo_2 } from 'next/font/google'
import AstroHuntLogo from '@/components/AstrohuntLogo'

const exo = Exo_2({ 
  weight: ['400'],
  subsets: ['latin']
 })


export default function Home() {

  const mainInputRef = useRef(null)

  useEffect(() => {
    mainInputRef.current.focus()
  }, [])

  return (
    <>
      <Head>
        <title>Astrohunt</title>
        <meta name="description" content="A mini tresure hunt for Basak's birthday" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <header className={styles.header}>
          <AstroHuntLogo className={styles.logo} />
        </header>
        <div className={styles.center}>
          <h1 className={styles.question}>
            <span className={exo.className}>Galaksimizin adı nedir?</span> 
          </h1>
            <input className={styles.mainInput} 
            autoFocus={true}
            ref={mainInputRef}
            placeholder="Type your answer here..."/>
        </div>
        <footer className={styles.footer}></footer>
      </main>
    </>
  )
}
