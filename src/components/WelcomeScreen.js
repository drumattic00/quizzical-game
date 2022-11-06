import React from "react"

export default function WelcomeScreen(props){
    return(
        <div className = 'wlc-scrn'>
            <h1>Quizzical</h1>
            <p>Welcome to Quizzical.<br /> Click the button below to start your quiz!</p>
            <button 
            className='btn--start-quiz'
            onClick={props.quizStart}
            >Start Quiz!</button>
        </div>   
    )
}