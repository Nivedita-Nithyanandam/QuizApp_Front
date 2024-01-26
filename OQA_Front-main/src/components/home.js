import style from './home.module.css'
import clockimg from '../img/clockimg.avif'
import newimg from '../img/newimg.avif'
import cupimg from '../img/cupimg.jpg'
import {Link} from 'react-router-dom'
import logo192 from '../img/logo192.png'
function Home(props) {

    const loginVal = props.loginState[0];
    const setLoginVal = props.loginState[1];

    function buttonReturn()
    {
        if(loginVal==0)
        {
            return '/login'
        }
        else{
            return '/play'
        }
    }
    function textReturn()
    {
        if(loginVal==0)
        {
            return 'Log-in'
        }
        else{
            return 'Play Now'
        }
    }
    return (  
        <div className={style.homebg}>
            <div className={style.card1}>
                <div>
                    <div className={style.card}>
                    <div className={style.cardImgField} >
                        <img className={style.cardImg} src={cupimg} alt="cup"/>
                    </div>
                    <div className={style.cardTextField}>
                        <div className={style.cardText}>
                            <h2 className={style.cardTextTitle}>
                                Competitive Edge
                            </h2>
                            <p className={style.cardTextContent}>
                            Compete with friends, family, or the global community to see who reigns supreme in the world of quizzing.
                            </p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.card2}>
                <div>
                        <div className={style.card}>
                        <div className={style.cardImgField} >
                            <img className={style.cardImg} src={clockimg} alt="clock"/>
                        </div>
                        <div className={style.cardTextField}>
                            <div className={style.cardText}>
                                <h2 className={style.cardTextTitle}>
                                    Time Pressure
                                </h2>
                                <p className={style.cardTextContent}>
                                    Put your knowledge to the test under the ticking clock. Many of our quizzes come with time limits.Enriching your quizzing experince.
                                </p>
                            </div>
                            </div>
                        </div>
                    </div>
            </div>
            <div className={style.card3}>
            <div>
                        <div className={style.card}>
                        <div className={style.cardImgField} >
                            <img className={style.cardImg} src={newimg} alt="rnd"/>
                        </div>
                        <div className={style.cardTextField}>
                            <div className={style.cardText}>
                                <h2 className={style.cardTextTitle}>
                                    Learning Reinvented
                                </h2>
                                <p className={style.cardTextContent}>
                                Our quizzes aren't just about entertainment – they're a fun way to learn and expand your knowledge.
                                </p>
                            </div>
                            </div>
                        </div>
                    </div>
            </div>
            <div className={style.textarea}>
                <h1>
                    Welcome to ,
                </h1>
                <img id={style.textFieldLogo} src={logo192}></img>
                <div className={style.smallTextArea}>
                    {/* <h1 id={style.subHeadings}>
                        Quizzmi
                    </h1> */}
                    <h2 className={style.subHeadings}>
                        Unlock the Power of Knowledge
                    </h2>
                    <h3>
                        Are you ready to challenge your mind, expand your horizons, and have some fun along the way? Look no further! Quizzmi is here to provide you with a world of captivating quizzes that cater to every interest, age, and knowledge level.
                    </h3>
                    <div style={{width:"100%",display:'flex'}}>
                        
                        <Link id={style.login} to={buttonReturn()}>{textReturn()}</Link>
                    </div>
               
                </div>

            </div>
        </div>
    );
}

export default Home;
