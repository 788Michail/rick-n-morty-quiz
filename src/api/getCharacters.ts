export interface Character {
  id: number
  name: string
  image: string
}

export async function getCharacters(): Promise<Character[]> {
  const response = await fetch('https://rickandmortyapi.com/api/character')
  const data = await response.json()

  const characters: Character[] = data.results.map((char: Character) => ({
    id: char.id,
    name: char.name,
    image: char.image
  }))

  return characters
}
