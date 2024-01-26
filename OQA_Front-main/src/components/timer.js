import { useEffect, useState} from 'react';
import style from './timer.module.css'

function Timer(props) {
    
    const time = props.time[0];
    const setTime = props.time[1];
    

    useEffect(()=>{
        setInterval(()=>{
            setTime(time=>time+1);
        },1000)
    },[])
    return ( 
        <div id={style.content}>
            <b>{new Date(time * 1000).toISOString().slice(14, 19)}</b>
        </div>
     );
}

export default Timer;
