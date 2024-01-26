import { useEffect, useState ,useRef } from 'react';
import './quiz.css';
import Question from './question'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Adminquiz from './adminquiz';
import Timer from './timer';
import axios from 'axios';
function Quiz(props)
{
    const {id} = useParams();
    const [quizid,setQuizid] = useState(id);
    const [questionId,setquestionId] = useState(0);
    const [choices,setChoices] = useState(new Map());
    const didMount = useRef(false);

    const navigate = useNavigate()

    const location =useLocation();
    const [quizData,setQuizData] = useState(location.state)


    const loginVal = props.loginState[0];
    const setLoginVal = props.loginState[1];

    const [time,setTime] = useState(0)
    

    const prev = document.getElementById("prev");
    const next = document.getElementById("next");

    const [statequizData,setStateQuizData] = useState()
    const [quesData,setQuesData] = useState()
    async function getQuiz() {
        try {
            const data = await axios(`https://qmi.onrender.com/play/adminEditQuiz/${id}`);
            setStateQuizData(data.data.msg[0]);
            setQuesData(data.data.msg[1]);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getQuiz()
    },[])

    function onEdit(){
        navigate(`/play/adminEditQuiz/${id}`,{state:[statequizData,quesData]})
    }

    function onNext(){
        if(questionId <Number(quizData[0].quesCount)-1)
            setquestionId(questionId+1)
        //remeber to blackout the button if questionnumber reaches upper limit
    }



    function onPrev(){
        if(questionId!=0)
            setquestionId(questionId-1)
        
    }

    function onSubmit(){
        navigate(`result`,{state:[choices,time]})
    }

   async function onDelete (){
    try{
        await axios.delete(`https://qmi.onrender.com/play/Quiz/${id}`)
        navigate('/play')
    }
    catch(error)
    {
        console.log(error)
    }
   
   }

    const radio = document.getElementsByName("options");

    useEffect(()=>
        {
            if ( !didMount.current ) {
                didMount.current = true;
                return(() =>{})
            }
            if(questionId>0)
            {
                prev.removeAttribute("disabled")
                prev.style.backgroundColor='rgb(0,149,255)';
            }
            if(questionId==0)
            {
                prev.setAttribute("disabled","")
                prev.style.backgroundColor='gray';
            }
            if(questionId == Number(quizData[0].quesCount)-1)
            {
                next.style.backgroundColor='Yellowgreen';
                next.innerText='Submit'
            }
            if(questionId < Number(quizData[0].quesCount)-1)
            {
                next.removeAttribute("disabled")
                next.innerText='Next'
                next.style.backgroundColor='rgb(0,149,255)';
            }
            
        },[questionId])
        
    useEffect(()=>{
        
    },[questionId])

 
    return(
        <div className='content'>
            <div className='timerBox'>
                <Timer time={[time,setTime]}/>
            </div>
            <div className='quiz-title'>
                <h1>{quizData[0].quizTitle}<button className='edit' style={{display:(loginVal==1)? 'inline-block':'none'}} onClick={onEdit}> Edit</button><button className='delete' style={{display:(loginVal==1)? 'inline-block':'none'}} onClick={onDelete}> Delete</button></h1>
                
            </div>
            <div className='question-box'>
                 <Question quizID={quizData[0]._id} questionId={questionId} choices={[choices,setChoices]} />
            </div>
            <div className='navigation'>
                <div className='prev'>
                    <button onClick={onPrev} id='prev'>
                        Previous
                    </button>
                </div>
                <div className='next'>
                    <button onClick={(questionId == Number(quizData[0].quesCount)-1)?(onSubmit):(onNext)} id='next'>
                        Next
                    </button>
                </div>

            </div>
        </div>
    )
    
}

export default Quiz; 
