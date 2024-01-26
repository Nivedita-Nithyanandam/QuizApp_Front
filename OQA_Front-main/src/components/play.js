import './play.css';
import elephant from '../img/elephant.jpeg';
import adminPlus from '../img/adminPlus.png'
import { useEffect, useState } from 'react';
import Quiz from './quiz';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
function Play(props) {
    const loginVal = props.loginState[0];
    const setLoginVal = props.loginState[1];
    const [quizData, setQuizData] = useState();
    const [loading, setLoading] = useState(0);
    const navigate = useNavigate();

    const container = document.getElementById("container")

    async function getQuiz() {
        await axios.get('https://qmi.onrender.com/play').then((data) =>{
            const tempData = data.data;
            setQuizData(tempData); 

        } ).catch((err) => console.log(err))
    }

    useEffect(() => {
        getQuiz()
    }, [])

    useEffect(() => {
        if (quizData) {
            addAllQuiz(quizData)
        }
    }, [,quizData])
   

    useEffect(() => {
        const images = document.getElementsByClassName('card');
        for (let imgno = 0; imgno < images.length; imgno++) {
            let img = images[imgno];

            let imgX = img.offsetLeft;
            let imgY = img.offsetTop + 50;

            let imgW = img.offsetWidth;
            let imgH = img.offsetHeight;

            let imgXCenter = (imgX) + (imgW / 2);
            let imgYCenter = (imgY) + (imgH / 2);

            img.onmousemove = (event) => {
                img.addEventListener('mouseout', (event) => { })

                if (window.screen.width > 500) {
                    img.style.transitionDuration = '0s';
                    let clientX = event.clientX;
                    let clientY = event.clientY;



                    let tempX = (clientX - imgXCenter);
                    let tempY = (clientY - imgYCenter);

                    let rotateX = (tempY) / (imgH / 2);
                    let rotateY = (1) * (tempX) / (imgW / 2);


                    img.style.transform = `rotate3d(${rotateX},${rotateY},0,30deg)`
                }



            }
            img.onmouseout = (event) => {
                if (window.screen.width > 500) {
                    img.style.transitionDuration = '1s';
                    img.style.transitionProperty = 'transform';
                    img.style.transform = `rotate3d(0,0,0,0deg)`;
                }
            }
            img.addEventListener('click', (event) => { })
            img.onclick = (event) =>{
                onImgClick(event)
            }
            
        };
        const adminImages = document.getElementsByClassName("cardAdmin")
        let adminImage = adminImages[0];
        adminImage.addEventListener('click',(event)=>{})
        adminImage.onclick =(event)=>{
            navigate(`/play/adminQuiz`);
        }
    }
        , [quizData]
    )
    const onImgClick = (event)=>{
        if(loginVal==0){
            navigate('/login')
        }
        else
            navigate(`/play/Quiz/${event.target.name}`,{state:quizData.filter((item)=> item._id==event.target.name)})
    }
    const images = document.getElementsByClassName('card-img-field');
    

    const addAllQuiz = (arr) => {
        arr.map((item, index) => {
            container.innerHTML += `
                    <div class='card' id='card'>
                            <div class='card-img-field'>
                                <img class=card-img src=${item.quizImg} name=${item._id} alt="loading" />
                            </div>
                        
                        <div class='card-text-field'>
                            <div class='card-text'>
                                <h2 class='card-text-title'>
                                    ${item.quizTitle}
                                </h2>
                                <p class='card-text-content'>
                                    ${item.quizDesc}
                                </p>
                            </div>
                        </div>
                    </div>`

        })
    }

    function addQuiz() {
        if (loginVal === 1) {
            return 'cardAdmin'
        }
        else {
            return 'cardHide'
        }
    }
    



    return (
        <div className='container' id='container'>
            <div className='cardAdmin' id={addQuiz()}>
                    <div className='card-img-fieldAdmin'></div>
                <div className='card-text-fieldAdmin'>
                    <div className='card-text'>
                        <h2 className='card-text-title'>
                            Add Quiz
                        </h2>
                        <p className='card-text-content'>
                            Click to add a Quiz!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Play;