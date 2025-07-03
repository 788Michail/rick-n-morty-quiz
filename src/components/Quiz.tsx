import { useState, useEffect } from 'react'
import type { Question } from '../utils/generateQuestions'

type Props = {
  questions: Question[]
  onComplete: (score: number) => void
}

export default function Quiz({ questions, onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const current = questions[currentIndex]

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

  function handleAnswer(selected: string) {
    if (selected === current.correctName) {
      setScore(prev => prev + 1)
    }

    const next = currentIndex + 1
    if (next < questions.length) {
      setCurrentIndex(next)
    } else {
      onComplete(score + (selected === current.correctName ? 1 : 0))
    }
  }

  return (
    <div className='text-center space-y-6'>
      <img
        className='mx-auto w-60 h-60 rounded-full border-4 border-white shadow-md'
        src={current.image}
        alt='Character Image'
      />
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto'>
        {current.options.map((option: string) => (
          <button
            className={`px-6 py-3 rounded-lg transition text-white ${
              theme === 'dark' ? 'bg-green-600 hover:bg-green-700' : 'bg-indigo-500 hover:bg-indigo-700'
            }`}
            key={option}
            onClick={() => handleAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <p className='text-sm text-gray-500'>
        Question {currentIndex + 1} of {questions.length}
      </p>
      <p className='text-sm font-medium'>Score: {score}</p>
    </div>
  )
}
