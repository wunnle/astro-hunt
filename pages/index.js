import styles from '@/styles/Home.module.css'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import { Exo_2 } from 'next/font/google'
import AstroHuntLogo from '@/components/AstrohuntLogo'
import SurpriseIcon from '@/components/SurpriseIcon'
import EventIcon from '@/components/EventIcon'
import DownloadIcon from '@/components/DownloadIcon'
import CheckIcon from '@/components/CheckIcon'

const exo = Exo_2({ 
  weight: ['300', '400'],
  subsets: ['latin']
 })

const steps = [
  {
    type: 'question',
    question: `Oye sésata, keting im da nem fo mosh bik beltalowda seteshang?`,
    answerType: 'text',
    answers: [
      'Eros',
      'eros',
      'EROS',
      'Eros Station',
      'eros station',
      'Eros station',
      'ceres',
      'Ceres',
      'CERES',
      'Ceres Station',
      'ceres station',
    ],
    placeholder: 'Seteshang im "statión", sa-sa ke?'
  },
  {
    type: 'question',
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
    placeholder: 'İki kelime, hayli yerli...'
  },
  {
    type: 'question',
    question: `The deadline for the job is a year away, so I can't procrastinate even one day. Where am I from?`,
    answerType: 'text',
    answers: [
      "Venus",
      "venus"
    ],
    placeholder: 'Gotta go before sun sets in the east...'
  },
  {
    type: 'question',
    question: 'Uzay tersaneleriyle meşhur, güneş sistemindeki en yüksek dağa sahip kütlenin adı nedir?',
    answerType: 'text',
    answers: [
      "Vesta",
      "vesta",
      "4 Vesta",
      "4 vesta",
      "4 Vesta",
      "VESTA"
    ],
    placeholder: 'Titanyum üretimini de arttırdığı söylenir...'
  },
  {
    type: 'question',
    question: "What's the name of  the system unpredictably cycles between stable and chaotic eras?",
    answerType: 'text',
    answers: [
      "Alpha Centauri",
      "alpha centauri",
      "Trisolaris",
      "trisolaris"
    ],
    placeholder: 'There is also a VR game about it...'
  },
  { 
    type: 'notification',
    title: `Good job! You've unlocked your gift`,
    description: 'Find it behind the Terraforming Mars box',
    action: 'goToNextStep',
    icon: SurpriseIcon
  },
  {
    type: 'question',
    question: 'İşçi dostuyum, anahtarım ve bir sistemim var. Kaç yaşındayım?',
    answerType: 'number',
    answerRange: {
      min: 4500000000,
      max: 5000000000
    },
    placeholder: 'Sadece sayıyla cevap ver...'
  },
  { 
    type: 'notification',
    title: `You've unlocked an event invite!`,
    description: "Download it and make sure you show up.",
    buttonText: 'Download',
    action: 'downloadInvite',
    icon: EventIcon
  },
]


export default function Home() {

  const mainInputRef = useRef(null)
  const [activeStep, setActiveStep] = useState(0);

  const [formClassName, setFormClassName] = useState(styles.visible);
  const [questionClassName, setQuestionClassName] = useState(styles.visible);
  
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    mainInputRef.current?.focus()
  }, [])

  function switchToNextQuestion() {
    setActiveStep(activeStep + 1);
    setInputText('');
    mainInputRef.current?.blur();
    setFormClassName(styles.invisible);
    setQuestionClassName(styles.invisible);
    setTimeout(() => {
      setFormClassName(styles.visible);
      setQuestionClassName(styles.visible);
      mainInputRef.current?.focus();
    }, 100)
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

    if (steps[activeStep].answerType === 'number') {
      const answerNumber = Number(answer);
      if (answerNumber >= steps[activeStep].answerRange.min && answerNumber <= steps[activeStep].answerRange.max) {
        switchToNextQuestion();
      } else {
        showErrorMessage();
      }
    }

    if(steps[activeStep].answerType === 'text') {
      if(steps[activeStep].answers.includes(answer.trim())) {
        switchToNextQuestion();
      } else {
        showErrorMessage();
      }
    }
  }

  const StepIcon = steps[activeStep]?.icon;

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
            >STEP {activeStep + 1} / {steps.length}</span>
          </p>
        </header>
        {steps[activeStep].type === 'question' && (
        <div className={styles.center}>
          <h1 className={[styles.question, questionClassName].join(' ')}>
            <span className={exo.className}>{steps[activeStep].question}</span>
          </h1>
          <form onSubmit={handleSubmit} className={[styles.form, formClassName].join(' ')}>
            <input className={styles.mainInput} 
            autoFocus={true}
            ref={mainInputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={steps[activeStep].placeholder} />
            <button className={styles.submitButton}></button>
          </form>
        </div>)}
        {steps[activeStep].type === 'notification' && (
          <div className={styles.center}>
            <div className={styles.notification}>
              <div className={styles.notificationIcon}>
                <StepIcon className={styles.stepIcon} />
              </div>
              <div className={styles.notificationText}>

              <h1 className={[styles.notificationTitle, exo.className].join(' ')}>{steps[activeStep].title}</h1>
              <p className={[styles.notificationDescription, exo.className].join(' ')}>{steps[activeStep].description}</p>
              </div>
              {
                steps[activeStep].action === "goToNextStep" && (
                  <button className={[styles.notificationButton, exo.className].join(' ')} onClick={switchToNextQuestion}>
                  <CheckIcon style={{ width: 32, heigth: 32 }} />
                </button>
                )
              }
              {
                steps[activeStep].action === "downloadInvite" && (
                  <a download href='/astroInvite.ics' className={[styles.notificationButton, exo.className].join(' ')} >
                  <DownloadIcon style={{ width: 32, heigth: 32 }} />
                </a>
                )
              }
            </div>
          </div>
        )}
        <footer className={styles.footer}>
          <div className={[styles.footerInner, exo.className].join(' ')}>
          Coded with ♥ for Başak - 2023 
          </div>
          
          </footer>
      </main>
    </>
  )
}
