import styles from '@/styles/Home.module.css'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import { Exo_2 } from 'next/font/google'
import AstroHuntLogo from '@/components/AstrohuntLogo'

const exo = Exo_2({ 
  weight: ['400'],
  subsets: ['latin']
 })

const questionsAndAnswers = [
  {
    question: 'Galaksimizin adı nedir?',
    answerType: 'text',
    answers: [
      'hanifi tokgözoğlu',
      'Hanifi Tokgözoğlu',
      'hanifi tokgozoglu',
      'Hanifi Tokgozoglu',
      'Hanifi tokgozoglu',
      'hanifi Tokgozoglu',
    ],
    placeholder: 'Cevabını buraya yaz...'
  },
  {
    question: 'İşçi dostuyum, anahtarım ve bir sistemim var. Kaç yaşındayım?',
    answerType: 'number',
    answerRange: {
      min: 4500000000,
      max: 4603000000
    },
    placeholder: 'Sadece sayıyla cevap ver...'
  }
]



export default function Home() {

  const mainInputRef = useRef(null)
  const [activeQuestion, setActiveQuestion] = useState(0);

  const [formClassName, setFormClassName] = useState('');
  const [inputText, setInputText] = useState('');
  

  useEffect(() => {
    mainInputRef.current.focus()
  }, [])

  function switchToNextQuestion() {
    setActiveQuestion(activeQuestion + 1);
    setInputText('');
    mainInputRef.current.blur();
  }

  function showErrorMessage() {
    setInputText('')
    setFormClassName(styles.error)
    setTimeout(() => {
      setFormClassName('')
    }, 500)
  }

  function handleSubmit(e) {
    e.preventDefault();
    const answer = mainInputRef.current.value;

    if (questionsAndAnswers[activeQuestion].answerType === 'number') {
      const answerNumber = Number(answer);
      if (answerNumber >= questionsAndAnswers[activeQuestion].answerRange.min && answerNumber <= questionsAndAnswers[activeQuestion].answerRange.max) {
        switchToNextQuestion();
      } else {
        showErrorMessage();
      }
    }

    if(questionsAndAnswers[activeQuestion].answerType === 'text') {
      if(questionsAndAnswers[activeQuestion].answers.includes(answer)) {
        switchToNextQuestion();
      } else {
        showErrorMessage();
      }
    }
  }

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
          <p className={styles.level}>
            <span className={[styles.questionNumber, exo.className].join(' ')}
            >QUESTION {activeQuestion + 1} / {questionsAndAnswers.length}</span>
          </p>
        </header>
        <div className={styles.center}>
          <h1 className={styles.question}>
            <span className={exo.className}>{questionsAndAnswers[activeQuestion].question}</span>
          </h1>
          <form onSubmit={handleSubmit} className={[styles.form, formClassName].join(' ')}>
            <input className={styles.mainInput} 
            autoFocus={true}
            ref={mainInputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={questionsAndAnswers[activeQuestion].placeholder} />
          </form>
        </div>
        <footer className={styles.footer}></footer>
      </main>
    </>
  )
}
