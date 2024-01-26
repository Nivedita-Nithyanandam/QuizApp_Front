import axios from 'axios';
import { useEffect, useState } from 'react';
import style from './adminEditQuiz.module.css'
import { useLocation, useParams,useNavigate} from 'react-router-dom';

function AdminEditQuiz(){

    const {id}= useParams();
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate();
    const [add,setAdd] = useState(0)
    const location = useLocation();
    let quizData = location.state[0]
    let quesData = location.state[1]
    const [qcount, setQcount] = useState(quizData[0].quesCount);
    const [newqcount,setNewqcount] = useState(0)
    var count=qcount
    const addRow = () => {
        if(qcount>0)
            setNewqcount(newqcount + 1)
        else{}
            
    }
      function isImgUrl(url) {
        const img = new Image();
        img.src = url;
        return new Promise((resolve) => {
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
        });
      }


    const patchQuiz = async (event) =>{
        event.preventDefault()
        if(add!=1)
        {

            const qname = document.getElementsByName("qname");
            const qdesc = document.getElementsByName("qdesc");
            const qimg = document.getElementsByName("qimg");
            const quesinputs = document.getElementsByClassName('quesInputs');
            const optioninputs = document.getElementsByClassName('optionInputs');
            const radioinputs = document.getElementsByClassName('radioInputs')
    
            
            let question =[];
            let optionA = [];
            let optionB = [];
            let optionC = [];
            let optionD = [];
            let optionSolution = []
            let counter=0
            let questionJson = []
            
            for(let ques =0; ques<qcount+newqcount;ques++)
            {
                question.push(quesinputs[ques].value);
    
                
                optionA.push(optioninputs[counter].value);
                if(radioinputs[counter].checked)
                    optionSolution.push('optionA')
                counter=counter+1;
    
                optionB.push(optioninputs[counter].value);
                if(radioinputs[counter].checked)
                    optionSolution.push('optionB')
                counter=counter+1;
    
                optionC.push(optioninputs[counter].value);
                if(radioinputs[counter].checked)
                    optionSolution.push('optionC')
                counter=counter+1;
    
                optionD.push(optioninputs[counter].value);
                if(radioinputs[counter].checked)
                    optionSolution.push('optionD')
                counter=counter+1;
    
                questionJson.push({
                    questionID:ques,
                    questionText:question[ques],
                    optionA:optionA[ques],
                    optionB:optionB[ques],
                    optionC:optionC[ques],
                    optionD:optionD[ques],
                    optionSolution:optionSolution[ques],
                    isQuiz:false
                    
                    
                })
                
            }
            let isImg = await isImgUrl(qimg[0].value)
            if(!isImg){
                qimg[0].value="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png"
            }
            let quizJson={
                quizTitle:qname[0].value,
                quizDesc:qdesc[0].value,
                quizImg:qimg[0].value,
                isQuiz:true,
                quesCount:qcount+newqcount
            }

            try {
            await axios.put(`https://qmi.onrender.com/play/adminEditQuiz/${id}`,{
                quizJson,
                questionJson
            },{ 
                headers: {
                    'Content-Type': 'application/json'
                }}).then((res)=>{
                    setAdd(1)
                    navigate('/play')
                })
                .catch((rej)=>navigate("/play"))}
            catch (error) {
            console.log(error)
        }
    }
    }
   
    const checkRadios = ()=>{
        let radioInputs = document.querySelectorAll('input[type="radio"]')
        let lengthRadioInputs = radioInputs.length;
        let checked = []
        quesData.map((item)=>checked.push(item.optionSolution))
        let j=0;
        for(let i =0;i<checked.length;i++)
        {
            if(checked[i]=='optionA')
            {
                radioInputs[j].checked=true;
            }
            else if(checked[i]=='optionB')
            {
                radioInputs[j+1].checked=true;
            }
            else if(checked[i]=='optionC')
            {
                radioInputs[j+2].checked=true;
            }
            else
            {
                radioInputs[j+3].checked=true;
            }
            
            j+=4
        }
        
    }
    
    useEffect(()=>{
        checkRadios()
    },[document.querySelectorAll('input[type="text"]').length])


    return (
        <div className={style.container}>
            <h1>Edit Quiz</h1>
            <form>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label htmlFor='qname'>Quiz Name</label>
                            </td>
                            <td>
                                <input name='qname' defaultValue={quizData[0].quizTitle}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor='qimg'>Quiz Image</label>
                            </td>
                            <td>
                                <input name='qimg' defaultValue={quizData[0].quizImg}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor='qdesc'>Quiz Description</label>
                            </td>
                            <td>
                                <textarea name='qdesc' defaultValue={quizData[0].quizDesc}></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <label htmlFor='qcount'>Number of Questions</label>
                            </td>
                            <td>
                                <td><input name='qcount' value={qcount+newqcount}></input></td>
                            </td>
                        </tr>
                        { (qcount+newqcount>0)?quesData.map((item,index)=>{
                            return(
                                <>
                                <tr>
                                    <td>
                                        <label htmlFor={'ques'+`${index+1}`} style={{color:'rgb(0,149,255)',fontWeight:'900'}}>Question {`${index+1}`}</label>
                                    </td>
                                    <td>
                                        <input name={'ques'+`${index+1}`} className='quesInputs' style={{width:'250px'}} defaultValue={item.questionText}></input>
                                    </td>
                                </tr>



                                <tr>
                                    <td>
                                        <label htmlFor={'optionA'+`${index+1}`}>Option A</label>
                                    </td>
                                    <td> 
                                        <input name={'optionA'+`${index+1}`} className='optionInputs' defaultValue={item.optionA}></input>
                                    </td>
                                    <td>
                                        <input type='radio' name={'solution'+`${index+1}`} className='radioInputs'></input>
                                    </td>
                                </tr>




                                <tr>
                                    <td>
                                        <label htmlFor={'optionB'+`${index+1}`}>Option B</label>
                                    </td>
                                    <td>
                                        <input name={'optionB'+`${index+1}`} className='optionInputs' defaultValue={item.optionB}></input>
                                    </td>
                                    <td>
                                        <input type='radio' name={'solution'+`${index+1}`} className='radioInputs'></input>
                                    </td>
                                </tr>



                                <tr>
                                    <td>
                                        <label htmlFor={'optionC'+`${index+1}`}>Option C</label>
                                    </td>
                                    <td>
                                        <input name={'optionC'+`${index+1}`} className='optionInputs' defaultValue={item.optionC}></input>
                                    </td>
                                    <td>
                                        <input type='radio' name={'solution'+`${index+1}`} className='radioInputs'></input>
                                    </td>
                                </tr>



                                <tr>
                                    <td>
                                        <label htmlFor={'optionD'+`${index+1}`}>Option D</label>
                                    </td>
                                    <td>
                                        <input name={'optionD'+`${index+1}`} className='optionInputs' defaultValue={item.optionD}></input>
                                    </td>
                                    <td>
                                        <input type='radio' name={'solution'+`${index+1}`} className='radioInputs'></input>
                                    </td>
                                </tr>
                                
                                </>
                            )
                        })
                    :console.log()}
                        {
                        Array.from(Array(newqcount)).map((c, index) => {
        
                            return (
                                <>
                                <tr>
                                    <td>
                                        <label htmlFor={'ques'+`${count+index+1}`} style={{color:'rgb(0,149,255)',fontWeight:'900'}}>Question {`${count+index+1}`}</label>
                                    </td>
                                    <td>
                                        <input name={'ques'+`${count+index+1}`} className='quesInputs' style={{width:'250px'}}></input>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor={'optionA'+`${count+index+1}`}>Option A</label>
                                    </td>
                                    <td> 
                                        <input name={'optionA'+`${count+index+1}`} className='optionInputs'></input>
                                    </td>
                                    <td>
                                        <input type='radio' name={'solution'+`${count+index+1}`} className='radioInputs'></input>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor={'optionB'+`${count+index+1}`}>Option B</label>
                                    </td>
                                    <td>
                                        <input name={'optionB'+`${count+index+1}`} className='optionInputs'></input>
                                    </td>
                                    <td>
                                        <input type='radio' name={'solution'+`${count+index+1}`} className='radioInputs'></input>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor={'optionC'+`${count+index+1}`}>Option C</label>
                                    </td>
                                    <td>
                                        <input name={'optionC'+`${count+index+1}`} className='optionInputs'></input>
                                    </td>
                                    <td>
                                        <input type='radio' name={'solution'+`${count+index+1}`} className='radioInputs'></input>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor={'optionD'+`${count+index+1}`}>Option D</label>
                                    </td>
                                    <td>
                                        <input name={'optionD'+`${count+index+1}`} className='optionInputs'></input>
                                    </td>
                                    <td>
                                        <input type='radio' name={'solution'+`${count+index+1}`} className='radioInputs'></input>
                                    </td>
                                </tr>
                                
                                </>
                                
                            )
                        })}
                      
                    </tbody>
                </table>

                <button id={style.addQuestion} className={style.btn} onClick={addRow} type='button'>Add Question</button>
                <button id={style.remQuestion} className={style.rembtn} onClick={()=>{
                   if(qcount+newqcount>1)
                   {
                        if(newqcount>0)
                        {
                            setNewqcount(newqcount-1)
                        }
                        else{
                            setQcount(qcount-1)
                        }
                   }
                   else{
                        alert("Cannot have less than 1 Question")
                   }
            
                }} type='button' disabled={(qcount+newqcount>1)?false:true} style={((qcount+newqcount>1)?{}:{backgroundColor:"gray"})}>Remove Question</button>
                <button id={style.submitQuiz} className={style.btn} type='submit' onClick={patchQuiz}>Submit</button>
            </form>
        </div>
    );
}

export default AdminEditQuiz;
