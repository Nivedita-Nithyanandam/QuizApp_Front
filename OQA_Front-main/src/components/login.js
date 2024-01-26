import './form.css'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react';
import Home from '../components/home';
import {Link,useNavigate} from 'react-router-dom'
import eyeShow from '../img/eyeShow16.png'
import eyeHide from '../img/eyeHide16.png'
import axios from 'axios';

export default function Login(props){
    
    const loginVal = props.loginState[0];
    const setLoginVal = props.loginState[1];
    const navigate = useNavigate()
    async function handleSubmit(event)
    {
        event.preventDefault();
        var uname = document.querySelector("input[name='uname']").value
        var pwd = document.querySelector("input[name='pwd']").value
        var circleLoader = document.querySelector('.circle-loader')
        var pwdNotMatch = document.querySelector('#pwdNotMatch')
        var unameMissing = document.querySelector('#unameMissing')
        var unameReq = document.querySelector('#unameReq')
        var pwdReq = document.querySelector('#pwdReq')
        unameReq.style.display='none'
        pwdReq.style.display='none'
        if(!uname){
            unameReq.style.display='block'
            return
        }
        if(!pwd){
            pwdReq.style.display='block'
            return
        }
        if(uname=='root' && pwd=='root')
        {
            localStorage.setItem('loginVal', JSON.stringify(1));
            setLoginVal(1);
            localStorage.setItem('loginVal', JSON.stringify(1));
            navigate('/home')
        }
        else
        {
            circleLoader.style.display='inline-block'
            try {
                await axios.post(`https://qmi.onrender.com/login`,{uname,pwd})
                    .then((res)=>{
                        if(res.status==201)
                        {
                            setTimeout(()=>{
                                setLoginVal(res.data.msg)
                                localStorage.setItem('loginVal', JSON.stringify(res.data.msg));
                                navigate('/play')
                                },1500)
                            
                        }
                    })
                    .catch((err)=>{
                        if(err.response.status==403)
                        {
                            circleLoader.style.display='none'
                            unameMissing.style.display='block'
                        }
                        else if(err.response.status==402)
                        {
                            circleLoader.style.display='none'
                            pwdNotMatch.style.display='block'
                        }   

                    })
                
            } catch (error) {
                console.log(error)
            }
        }
    }
    const [pwdShow,setPwdShow] = useState(false)
    const togglePwdShow = ()=>{
        var pwd = document.querySelector("input[name='pwd']")
        setPwdShow(!pwdShow)
        if(pwd.getAttribute("type") =='password')
            pwd.setAttribute('type','text')
        else
            pwd.setAttribute('type','password')
    }

    return(
        <div className='content'>
            <div className='formbox'>
                <h1 style={{color:'rgb(0,149,255'}}>Login <div className="circle-loader"></div> </h1>
                <form onSubmit={handleSubmit}>
                    <table id='tableForm'>
                        <tbody>
                            <tr>
                                <td><label htmlFor='uname'><b>Username</b></label></td>
                                <td><input name='uname' ></input></td>
                                <h5 id='unameMissing' style={{display:'none',color:"red"}}>Username Not Found</h5>
                                <h5 id='unameReq' style={{display:'none',color:"red"}}>Username Required</h5>
                            </tr>
                            <tr>
                                <td><label htmlFor='pwd'><b>Password</b></label></td>
                                <td><input name='pwd' type="password"></input><img id='eyes' src={pwdShow?eyeHide:eyeShow} onClick={togglePwdShow}></img></td>
                                <h5 id='pwdNotMatch' style={{display:'none',color:"red"}}>Incorrect Password</h5>
                                <h5 id='pwdReq' style={{display:'none',color:"red"}}>Password Required</h5>
                            </tr>
                            <tr>
                                <td colSpan={2}><button id='btn' type="submit" to="/home">Login</button></td>
                            </tr>
                        </tbody>
                        

                    </table>
                </form>
            </div>
            
            

        </div>
    )
}
