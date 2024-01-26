import { useEffect, useState } from 'react';
import './question.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Question(props) {

        const choices = props.choices[0];
        const setChoices = props.choices[1];
        const [loading,setLoading] = useState(true)
        const {id} = useParams()
        const [quesData,setQuesData] = useState()
        const questionId = props.questionId;
        
        
        const updateMap = (key,value)=>{
            setChoices(choices.set(key,value));
            console.log("choices is " , choices)
        }

    const radio = document.getElementsByName("options");
    

    const onSubmit =(event)=>
    {
        event.preventDefault()
            for (let i = 0; i < radio.length; i++) {
                if (radio[i].checked)
                {
                    updateMap(props.questionId,radio[i].id)
                }
            }
    }

    async function getQuestion() {
        await axios.get(`https://qmi.onrender.com/play/Quiz/${id}`).then((data) => setQuesData(data.data)).catch((err) => console.log(err))
    }
    useEffect(()=>{
        try {  
            getQuestion();
        } catch (error) {
            console.log(error)
        }
    },[])

    useEffect(() => {
        if (quesData) {
            setLoading(false)
        }
    }, [quesData])
  
    const displayQuetion = () =>{
        if(loading)
        {
            return <><h4>Loading</h4></>
        }
        else
        {
            let x= 'Loading'
            quesData.map((ques)=>{
                if(questionId==ques.questionID){
                    let y = Number(ques.questionID)+1
                    x = <h4>{y}) {ques.questionText}?</h4>
                }
            })
           return x
            
        }
       
    }
    const displayOptionA = () =>{
        if(loading)
        {
            return <>Loading</>
        }
        else
        {
            let x= 'Loading'
            quesData.filter((ques)=>{
                if(questionId==ques.questionID)
                 x = <>{ques.optionA}</>
           })
           return x
            
        }
       
    }
    const displayOptionB = () =>{
        if(loading)
        {
            return <>Loading</>
        }
        else
        {
            let x= "Loading"
            quesData.filter((ques)=>{
                if(questionId==ques.questionID)
                 x = <>{ques.optionB}</>
           })
           return x
            
        }
       
    }
    const displayOptionC = () =>{
        if(loading)
        {
            return <>Loading</>
        }
        else
        {
            let x= "Loading"
            quesData.filter((ques)=>{
                if(questionId==ques.questionID)
                 x = <>{ques.optionC}</>
           })
           return x
            
        }
       
    }
    const displayOptionD = () =>{
        if(loading)
        {
            return <>Loading</>
        }
        else
        {
            let x= "Loading"
            quesData.filter((ques)=>{
                if(questionId==ques.questionID)
                 x = <>{ques.optionD}</>
           })
           return x
            
        }
       
    }
    useEffect(()=>{
        if(!choices.has(questionId))
        {
            for (let i = 0; i < radio.length; i++) {
                radio[i].checked = false;

            }
        }
        else
        {
            if(choices.get(questionId)=='optionA'){
                radio[0].checked = true;
            }
            else if(choices.get(questionId)=='optionB'){
                radio[1].checked = true;
            }
            else if(choices.get(questionId)=='optionC'){
                radio[2].checked = true;
            }
            else {
                radio[3].checked = true;
            } 
            
        }
        
    },[questionId])

    
    return ( 
        <div>
            {displayQuetion()}
            <form>

                <div className='options'>
                    <div className='option1'>
                        <input type='radio' id='optionA' name='options'></input>
                        <label htmlFor='optionA'>
                            {displayOptionA()}
                        </label>
                    </div>

                    <div className='option2'>
                        <input type='radio' id='optionB' name='options'></input>
                        <label htmlFor='optionB'>
                            {displayOptionB()}
                        </label>
                        
                    </div>

                    <div className='option3'>
                        <input type='radio' id='optionC' name='options'></input>
                        <label htmlFor='optionC'>
                            {displayOptionC()}
                        </label>
                        
                    </div>

                    <div className='option4'>
                        <input type='radio' id='optionD' name='options'></input>
                        <label htmlFor='optionD'>
                            {displayOptionD()}
                        </label>
                    </div>

                </div>
                <div className='option'>
                        <button type='submit' id='btn' onClick={onSubmit}>
                            Confirm Choice
                        </button>
                    </div>
            </form>
        </div>
    )
}

export default Question;
