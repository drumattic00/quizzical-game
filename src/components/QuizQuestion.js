import React from "react";

export default function QuizQuestion(props) {
    const [arraySet, setArraySet] = React.useState([0,1,2,3])
    var decodeEntities = (function() {
        // this prevents any overhead from creating the object each time
        var element = document.createElement('div');

        function decodeEntities (str) {
        if(str && typeof str === 'string') {
            // strip script/html tags
            str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
            str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
            element.innerHTML = str;
            str = element.textContent;
            element.textContent = '';
        }
        return str;
        }
        return decodeEntities;
    })();
    React.useEffect(() => {
        const randInt = () => Math.floor(Math.random() * (4))
        const mySet = new Set()
        while(mySet.size < 4) {
            mySet.add(randInt())
        }
        setArraySet(Array.from(mySet))
    },[])

    const pushToggle = (num) => {
        return props?.all_answers[arraySet[num]].id
    }

    const isSelected = (num) => { return props.all_answers[arraySet[num]].selected}


    const addStyle = (qIndex, status) => {
        let styles = {}
        // not completed and selected
        if(!props.quizCompleted && props.all_answers[arraySet[qIndex]].selected === true) {
            styles = {
                backgroundColor: "var(--main-color)",
                color: "white"
            }
        }
        // completed and not selected and not correct
        if(props.quizCompleted && !props.all_answers[arraySet[qIndex]].selected &&
            props.all_answers[arraySet[qIndex]].answer !== props.answer) {
                styles = {
                    backgroundColor: "white",
                    color: "#adadad",
                    borderColor: "#adadad"
                }
        }
        // completed and selected and correct
        if(props.quizCompleted && props.all_answers[arraySet[qIndex]].answer === props.answer){
            styles = {
                ...styles,
                backgroundColor: "#7fff7a",
                color: "var(--main-color)"
            }
        }
        // completed and selected and not correct
        if(props.quizCompleted && props.all_answers[arraySet[qIndex]].selected && props.all_answers[arraySet[qIndex]].answer !== props.answer){
            styles={
                ...styles,
                backgroundColor: "#e36471",
                color: "#adadad",
                borderColor: "#adadad"
            }
        }
            return styles
        }
    

    return(
        <div className="quiz-item-container">
            <h3 className=''>{decodeEntities(props.question)}</h3>
            <div className='answers-box'>

                <button style={addStyle(0)} className={`btn--answer ${isSelected(0) && "selected"}`} onClick={!props.quizCompleted ? ()=> props.toggleSelected(pushToggle(0)) : null}>
                    {arraySet && decodeEntities(props.all_answers[arraySet[0]].answer)}
                </button>

                <button style={addStyle(1)} className={`btn--answer ${isSelected(1) && "selected"}`} onClick={!props.quizCompleted ? ()=> props.toggleSelected(pushToggle(1)) : null}>
                    {arraySet && decodeEntities(props.all_answers[arraySet[1]].answer)}
                </button>

                <button style={addStyle(2)} className={`btn--answer ${isSelected(2) && "selected"}`} onClick={!props.quizCompleted ? ()=> props.toggleSelected(pushToggle(2)) : null}>
                    {arraySet && decodeEntities(props.all_answers[arraySet[2]].answer)}
                </button>

                <button style={addStyle(3)} className={`btn--answer ${isSelected(3) && "selected"}`} onClick={!props.quizCompleted ? ()=> props.toggleSelected(pushToggle(3)) : null}>
                    {arraySet && decodeEntities(props.all_answers[arraySet[3]].answer)}
                </button>
            </div>
        </div>
    )
}