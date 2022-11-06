import React from "react"
import WelcomeScreen from "./components/WelcomeScreen"
import QuizQuestion from "./components/QuizQuestion"
import { nanoid } from "nanoid"
import "./App.css"

export default function App() {
  const [quizActive, setQuizActive] = React.useState(false)
  const [quizCompleted, setQuizCompleted] = React.useState(false)
  const [quizData, setQuizData] = React.useState([])
  const [correctAns, setCorrectAns] = React.useState(null)
  const [newQuiz, setNewQuiz] = React.useState(false)

  React.useEffect(()=>{
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then((res) => res.json())
      .then((data) => setQuizData(data.results.map( item => ({
        question : item.question,
        answer:  item.correct_answer,
        correctly_answered: null,
        all_answers: [
          {
          answer: item.correct_answer,
          selected: false,
          id : nanoid()
          },
          {
            answer: item.incorrect_answers[0],
            selected: false,
            id : nanoid()
          },
          {
            answer: item.incorrect_answers[1],
            selected: false,
            id: nanoid()
          },
          {
            answer: item.incorrect_answers[2],
            selected: false,
            id: nanoid()
          }
      ],
      }))
      ))
  },[newQuiz])

  function toggleSelected(id) {
  const myArray = Array.from(quizData)
  myArray.forEach(question => {
    if(question.all_answers.some(ans => ans.id === id)){
      question.all_answers.forEach( ans => {
        ans.selected = false
        if(ans.id ===id){
          ans.selected = !ans.selected
        }
      })
    }
  })
  setQuizData(myArray)
  }

  const quizQuestions = quizData.map(item => {
    return(
    <QuizQuestion
      question = {item.question}
      answer = {item.answer}
      all_answers = {item.all_answers}
      key = {item.id}
      toggleSelected={toggleSelected}
      quizCompleted = {quizCompleted}
    />
  )})
  
  const checkAnswers = () => {
    setQuizCompleted(true)
    let right = 0
    let newQuizData = [...quizData]
    newQuizData.forEach(question => {
      question.all_answers.forEach(ans => {
        if (ans.selected && ans.answer === question.answer) {
          question.correctly_answered = true
          right = right + 1
        }
      })
    })
    setQuizData(newQuizData)
    setCorrectAns(right)
  }

  const resetQuiz = ()=> {
    setNewQuiz(oldState=>!oldState)
    setQuizCompleted(oldState=>!oldState)
  }

  return(
    <div className='app-container'>
      {!quizActive && <WelcomeScreen quizStart={()=> 
          setQuizActive(prevState=>!prevState)}/>}

      {quizActive && quizQuestions}

      {quizActive && !quizCompleted && <button className="btn--check-ans" onClick={checkAnswers}>Check Answers</button>
      }
      {quizCompleted && quizCompleted &&
      <>
        <p>You scored {correctAns}/5 correct answers</p>
        <button className="btn--check-ans" onClick={resetQuiz}>Play Again</button>
      </>}
    </div>
  )
}