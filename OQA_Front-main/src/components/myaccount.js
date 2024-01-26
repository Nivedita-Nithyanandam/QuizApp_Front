import { useEffect, useRef, useState } from 'react';
import style from './myaccount.module.css'
import axios from 'axios';
import eyeShow from '../img/eyeShow16.png'
import eyeHide from '../img/eyeHide16.png'

function Myaccount(props) {
    const loginVal = props.loginState[0];
    const setLoginVal = props.loginState[1];
    const [pwdShow,setPwdShow] = useState(false)
    const togglePwdShow = ()=>{
        var pwd = document.querySelector("input[id='newPwd']")
        setPwdShow(!pwdShow)
        if(pwd.getAttribute("type") =='password')
            pwd.setAttribute('type','text')
        else
            pwd.setAttribute('type','password')
    }
    // const didMount = useRef(false)
    const items = JSON.parse(localStorage.getItem('loginVal'));
    if (items) {
         setLoginVal(loginVal => items);
    }
    const [detailsArray ,setDetailsArray] = useState([])
    const [userDetails,setUserDetails] = useState([])

    const UpdateUserDetail = async()=>{
        try {
            var temp1 = document.querySelector("button[name='done']")
            temp1.innerHTML ='Updated';
            temp1.style.backgroundColor='lime'
            temp1.setAttribute('disabled','')

            var newUserName = document.getElementById("newUserName").value
            var newPwd = document.getElementById("newPwd").value
            await axios.put('https://qmi.onrender.com/myaccount',{id:loginVal,newUserName:newUserName,newPwd:newPwd})
                .then((done)=>{
                    
                    
                    setTimeout(()=>{
                        temp1.innerHTML ='Confirm';
                        temp1.style.backgroundColor='rgb(0,149,255)'
                        temp1.removeAttribute('disabled')
                    },2000)
                })
                .catch((res)=>console.log(res))
        } catch (error) {
            console.log(error)
        }
    }

   const getQuizDetails = async ()=>{
        try {
            await axios.post(`https://qmi.onrender.com/myaccount`,{userID:loginVal})
                .then((data)=>{ 
                    setDetailsArray(data.data.msg)
                })
                .catch((err)=>console.log(err))

        } catch (error) {
            alert("Unable to fetch data at this time, Contact Admin!")
        }
   }
   const getAllQuizDetails = async ()=>{
    try {
        await axios.post(`https://qmi.onrender.com/myaccount`,{userID:"1"})
            .then((data)=>{ 
                setDetailsArray(data.data.msg)
            })
            .catch((err)=>console.log(err))

    } catch (error) {
        alert("Unable to fetch data at this time, Contact Admin!")
    }
}

    const getUserDetails = async ()=>{ 
        try{
            await axios.get(`https://qmi.onrender.com/myaccount/${loginVal}`)
                .then((data)=>{
                    setUserDetails(data.data.msg)
                })
                .catch((err)=>{
                    console.log(err)
                })
        }
        catch(error)
        {
            console.log("Can't fetch user data,Contact Admin!")
        }
    }

   


    useEffect(()=>{
        if ( loginVal==0) {
            return(() =>{})
        }
        if(loginVal!=1)
        {
            getUserDetails()
            getQuizDetails()
        }
        else if(loginVal==1)
        {
            getAllQuizDetails()
        }
    },[loginVal])    
 
    return (
        <div className={style.container}>
            <div className={style.details}>
                <div className={style.detailsTable}>
                    <h1>Your Details</h1>
                    <table id={style.detailsTable}>
                        <tbody>
                            <tr>
                                <td> 
                                    <label htmlFor='uname'>
                                        Username
                                    </label>
                                </td>
                                <td>
                                {(loginVal==1)?
                                    <input defaultValue='root'></input>
                                    :
                                    <input id="newUserName" defaultValue={userDetails.userName}></input>
                                }
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor='pwd'>
                                        Password
                                    </label>
                                </td>
                                <td>
                                {(loginVal==1)?
                                    <input defaultValue='root'></input>
                                    :
                                    <>
                                    <input id="newPwd" placeholder='Enter New Password' type='password'></input>
                                    <img id='eyes' src={pwdShow?eyeHide:eyeShow} onClick={togglePwdShow}></img>
                                    </>
                                }
                                    
                                </td>
                            </tr>
                            {loginVal==1?<tr>
                                <td colSpan={2}>
                                    <button id={style.confirmBtn} style={{backgroundColor:'gray'}} disabled>
                                        Confirm
                                    </button>
                                </td>
                            </tr>:<tr>
                                <td colSpan={2}>
                                    <button id={style.confirmBtn} onClick={UpdateUserDetail} name="done">
                                        Confirm
                                    </button>
                                </td>
                            </tr>}
                            
                        </tbody>
                    </table>
                </div>
            </div>

            <div className={style.scores}>
                
                    {loginVal==1?<h1>Scores</h1>:<h1>Your Scores</h1>}
                    
            <div className={style.scrollableTable}>
                <table className={style.scoreTable}>
                    {loginVal==1?<tbody>
                            <tr id={style.thTr}>
                                <th>User Name</th>
                                <th>Quiz Name</th>
                                <th>Score</th>
                                <th>Time</th>
                                <th>Date</th>
                            </tr>
                            {detailsArray.map((item,index)=>{
                                return(
                                    
                                <tr>
                                    <td key={index+10}>{item.userName}</td>
                                    <td key={index+11}>{item.quizName}</td>
                                    <td key={index+12}>{item.userScore}</td>
                                    <td key={index+13}>{item.quizTime}</td>
                                    <td key={index+14}>{item.quizDate}</td>
                                </tr>
                                ) 
                                
                            }) 
                        }
                        </tbody>:
                        <tbody>
                            <tr id={style.thTr}>
                                <th>Quiz Name</th>
                                <th>Score</th>
                                <th>Time</th>
                                <th>Date</th>
                            </tr>
                            {detailsArray.map((item,index)=>{
                                return(
                                <tr>
                                    <td key={index}>{item.quizName}</td>
                                    <td key={index+1}>{item.userScore}</td>
                                    <td key={index+2}>{item.quizTime}</td>
                                    <td key={index+3}>{item.quizDate}</td>
                                </tr>)
                            })
                        }
                    
                        </tbody>

                    }
                </table>
                </div>
            </div>
           

        </div>
    );
}

export default Myaccount;
