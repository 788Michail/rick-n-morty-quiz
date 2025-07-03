type Character = {
  id: number
  name: string
  image: string
}

export type Question = {
  image: string
  correctName: string
  options: string[]
}

export function generateQuestions(charList: Character[]): Question {
  const correct = charList[Math.floor(Math.random() * charList.length)]
  const incorrect = charList
    .filter(c => c.id !== correct.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4)

  const options = [correct.name, ...incorrect.map(c => c.name)].sort(() => Math.random() - 0.5)

  return {
    image: correct.image,
    correctName: correct.name,
    options
  }
}
