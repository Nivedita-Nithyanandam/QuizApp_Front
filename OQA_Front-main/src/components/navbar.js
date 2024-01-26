import './navbar.css';
import {useState} from 'react';
import { Link } from 'react-router-dom';
import logo192 from '../img/logo192.png'
function Navbar(props)
{
    const loginVal = props.loginState[0];
    const setLoginVal = props.loginState[1];
    

    function handleLogOut(){
        localStorage.setItem('loginVal', JSON.stringify(0));
        setLoginVal(0)
    }

    
    if(loginVal===0)
    return(
        <nav>
            <div className='nav-title-0'>
                <Link to='/home'><img src={logo192} width={'50px'}></img></Link>
            </div>
            <div className='nav-body-0'>
                <div className='nav-link-0'>
                    <Link to='/' className='link' id='hideSmallScreen'>Home</Link>
                    <Link to='/play' className='link'>Play</Link>
                    <Link to='/contact' className='link'>Contact</Link>
                </div>
                <div className='nav-buttons-0'>
                    <Link to='/signup'>Sign-Up</Link> 
                    <Link to='/login'>Log-In</Link>
                </div>
            </div>
            
        </nav>
    )

    else
    return(
        <nav>
            <div className='nav-title-1'>
                <Link to='/home'><img src={logo192} width={'50px'}></img></Link>
            </div>
            <div className='nav-body-1'>
                <div className='nav-link-1'>
                    <Link to='/' className='link' id='hideSmallScreen'>Home</Link>
                    <Link to='/play' className='link'>Play</Link>
                    <Link to='/contact' className='link'>Contact</Link>
                    <Link to='/myaccount' className='link'>My Account</Link>
                </div>
                <div className='nav-buttons-1'>
                    <Link to='/' onClick={handleLogOut}>Log-Out</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
