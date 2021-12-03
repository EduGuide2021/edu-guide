import React, { useState } from "react";
import "./General.css";
import { Link,useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { UPDATE_GENERAL_SCORE } from "../account/Graphql/Mutation";
import { sets } from "./GentestData";

function GenTest() {
  const history = useHistory();
  let randomset=Math.floor(Math.random() * sets.length)
  const [questions, setQuestions] = useState(
    sets[randomset]
  );

  const [retakeTest,setRetakeTest] = useState(false)

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [updateGeneralScore, { error }] = useMutation(UPDATE_GENERAL_SCORE);
  const userInfo = JSON.parse(localStorage.getItem("user"));

  const handleAnswerOptionClick = (index,priority) => {
    let ques= [...questions]
    ques[index].priority=priority
    setQuestions(ques)

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      finishTest()
      
    }
  };

  const finishTest = () =>{
    let sortedQuestions=questions?.sort((a,b)=>b.priority-a.priority)
    if(sortedQuestions[0].priority===sortedQuestions[1].priority && sortedQuestions[0].priority===sortedQuestions[2].priority){
      setRetakeTest(true)
      setQuestions(sets[Math.floor(Math.random() * sets.length)])
      setCurrentQuestion(0)
      return;
    }
    let topCourse= [sortedQuestions[0].category,sortedQuestions[1].category,sortedQuestions[2].category]
    let user={...userInfo,general_test_score:topCourse?.join(',')}
    localStorage.setItem('user',JSON.stringify(user))
    updateGeneralScore({ variables: { id: userInfo?.id, score: topCourse?.join(',') } });
    history.push('/gencourses',topCourse)
  }

  return (
    <div className="app" align="center">
      {retakeTest?<div>
        <p>there are more than 3 courses that suit them</p>
        <button onClick={()=>setRetakeTest(false)}>Would you like to retake the test?</button>
      </div>:
      <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className="question-text">
              {questions[currentQuestion]?.questionTest}
            </div>
          </div>
          <div className="answer-section">
            {[1,2,3,4,5].map((item,index) => (
              <button
              style={{margin:"0px 4px"}}
                onClick={() => handleAnswerOptionClick(currentQuestion,item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div>
            <br></br>
            <button onClick={()=>{
              setQuestions(sets[Math.floor(Math.random() * sets.length)])
              setCurrentQuestion(0)
            }} className="reg-btn" type="reset">
              Reset
            </button>
            <button onClick={()=>{
              if(currentQuestion!==0){
                setCurrentQuestion(currentQuestion-1)
              }
            }} className="reg-btn">
              Back
            </button>
            <button onClick={()=>{
              if(currentQuestion!==questions?.length-1){
                setCurrentQuestion(currentQuestion+1)
              }
            }} className="reg-btn">
              Skip
            </button>
          </div>
          <p className="bottom_p">
            <b>Make the right decision.</b>
          </p>
          </>
}
    </div>
  );
}

export default (GenTest)
