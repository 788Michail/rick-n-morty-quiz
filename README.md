# 🧪 Rick and Morty Character Quiz

A quiz app built with **React + TypeScript + TailwindCSS**, using the [Rick and Morty API](https://rickandmortyapi.com/) as the data source.

This project was developed as part of a Frontend Assessment to demonstrate frontend architecture, data handling, and clean UI design.

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/788michail/rick-n-morty-quiz.git
cd rick-n-morty-quiz

npm install
# or
yarn install

npm run dev
# or
yarn dev

```

### ✅ Functional Features

    5 random quiz questions per session, generated dynamically

    Each question shows a character image with 5 name options (1 correct, 4 wrong)

    Score tracking and final result display

    "Play Again" button resets the quiz

    Dark/Light Mode toggle with localStorage persistence using shadcn/ui Switch

### 🧠 Implementation Notes

    Character data is fetched from the Rick and Morty API on quiz start

    Questions are generated using a utility function: generateQuestions.ts

    App state is managed in the top-level App.tsx, and question flow is encapsulated in the Quiz component

    Dark mode is handled with Tailwind's dark variant and theme state is saved to localStorage

    Fully written in TypeScript, including typed API responses (Character, Question)

    The project follows a modular architecture for reusability and readability

### 🔧 Tech Stack

    React

    TypeScript

    Tailwind CSS

    shadcn/ui (based on Radix UI)

    Rick and Morty API

### 🙋‍♂️ Author

**Made with 💙 by @michail788**

```
src/
├── api/
│ └── getCharacters.ts
├── components/
│ ├── Quiz.tsx
│ └── ui/
│ └── switch.tsx
├── utils/
│ └── generateQuestions.ts
├── App.tsx
├── main.tsx
```
