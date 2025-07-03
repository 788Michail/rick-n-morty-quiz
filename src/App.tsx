import './App.css'
import { useEffect, useState } from 'react'
import { getCharacters } from './api/getCharacters'
import type { Character } from './api/getCharacters'
import Quiz from './components/Quiz'
import { generateQuestions } from './utils/generateQuestions'
import type { Question } from './utils/generateQuestions'
import { Switch } from '@/components/ui/switch'

function App() {
  const [quizStarted, setQuizStarted] = useState(false)
  const [characters, setCharacters] = useState<Character[] | null>(null)
  const [questions, setQuestions] = useState<Question[] | null>(null)
  const [finalScore, setFinalScore] = useState<number | null>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  useEffect(() => {
    if (!quizStarted) return

    async function fetchData() {
      const chars = await getCharacters()
      setCharacters(chars)

      const generated = Array.from({ length: 5 }, () => generateQuestions(chars))
      setQuestions(generated)
    }

    fetchData()
  }, [quizStarted])
  return (
    <>
      <div className='absolute top-4 right-4 flex items-center gap-2'>
        <Switch
          className='bg-white'
          checked={theme === 'dark'}
          onCheckedChange={value => setTheme(value ? 'dark' : 'light')}
        />
        <span className='text-sm text-gray-900 dark:text-gray-300'>{theme === 'dark' ? 'Dark' : 'Light'}</span>
      </div>
      <div
        className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-300 ${
          theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
        }`}
      >
        {!quizStarted ? (
          <div className='text-center'>
            <h1 className='text-3xl font-bold mb-6'>Rick and Morty Character Quiz</h1>
            <button
              onClick={() => setQuizStarted(true)}
              className={`px-6 py-3 rounded-lg transition text-white ${
                theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-indigo-500 hover:bg-indigo-700'
              }`}
            >
              Start Quiz
            </button>
          </div>
        ) : !characters || !questions ? (
          <p>Loading...</p>
        ) : finalScore !== null ? (
          <div className='text-center space-y-6'>
            <h2 className='text-2xl font-semibold'>Quiz Complete!!</h2>
            <p className='text-xl'>
              Your Score: {finalScore} / {questions.length}{' '}
            </p>
            <button
              onClick={() => {
                setQuizStarted(false)
                setCharacters(null)
                setQuestions(null)
                setFinalScore(null)
              }}
              className='px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition'
            >
              Play Again
            </button>
          </div>
        ) : (
          <Quiz questions={questions} onComplete={score => setFinalScore(score)} />
        )}
      </div>
    </>
  )
}

export default App
