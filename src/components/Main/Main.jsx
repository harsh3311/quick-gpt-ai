import React, { useContext, useEffect } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';
import VanillaTilt from 'vanilla-tilt';
import Marquee from "react-fast-marquee";

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSent();
        }
    };

    useEffect(() => {
        const elements = document.querySelectorAll('.card');
        VanillaTilt.init(elements, {
            max: 25,
            speed: 300,
            glare: true,
            'max-glare': 0.4,
        });

        return () => {
            elements.forEach(el => el.vanillaTilt.destroy());
        };
    }, []);

    return (
        <div className='main'>
            <div className='nav'>
                <img src={assets.logo} className='logo' />
                <a href='/'><p><span>Quick.</span>GPT</p></a>
                <img src={assets.user_icon} alt='User Icon' />
            </div>
            <div className='line'>
                <hr color='#2759FF' /><p><img src={assets.line_tick} className='logo' />Visit our new<u><a href='/image-generator'> AI Image Generation</a></u>.</p>
                <hr color='#2759FF' />
            </div>
            <div className='main-container'>
                {!showResult ? (
                    <>
                        <div className='greet'>
                            <p><span>Hello, Bhaya.</span></p>
                            <p>How can I assist you today?</p>
                        </div>
                        <div className='cards'>
                            <div className='card'>
                                <h2>01</h2>
                                <h1>Suggest.</h1>
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt='Compass Icon' />
                            </div>
                            <div className='card'>
                                <h2>02</h2>
                                <h1>Sumarize.</h1>
                                <p>Briefly summarize this concept: urban planning</p>
                                <img src={assets.bulb_icon} alt='Bulb Icon' />
                            </div>
                            <div className='card'>
                                <h2>03</h2>
                                <h1>Brainstorm.</h1>
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt='Message Icon' />
                            </div>
                            <div className='card'>
                                <h2>04</h2>
                                <h1>Improve.</h1>
                                <p>Improve the readability of the following code</p>
                                <img src={assets.code_icon} alt='Code Icon' />
                            </div>
                        </div>
                        <div className='marquee'>
                            <Marquee autoFill speed={20} direction='right'>
                                <div className='marquee-1'>ReactJS</div>
                                <div className='marquee-2'>ViteJS</div>
                                <div className='marquee-1'>Vallina Tilt</div>
                                <div className='marquee-2'>HTML</div>
                                <div className='marquee-1'>CSS</div>
                                <div className='marquee-2'>JS</div>
                                <div className='marquee-1'>React-Marquee</div>
                            </Marquee>
                            <Marquee autoFill speed={20} direction='left'>
                                <div className='marquee-line'>Now generate AI images using 'Image Generation icon'</div>
                            </Marquee>
                        </div>
                    </>
                ) : (
                    <div className='result'>
                        <div className='result-title'>
                            <img src={assets.user_icon} alt='User Icon' />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className='result-data'>
                            <span><img src={assets.logo} /></span>
                            {loading ? (
                                <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            ) : (
                                <p dangerouslySetInnerHTML={{ __html: resultData }} />
                            )}
                        </div>
                    </div>
                )}
                <div className='main-bottom'>
                    <div className='search-box'>
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            value={input}
                            type='text'
                            placeholder='Enter a prompt here'
                        />
                        <div>
                            <div className='gallery-icon'><a href='/image-generator'><img src={assets.gallery_icon} alt='Gallery Icon' /></a></div>
                            <div className='send-icon'><img onClick={() => onSent()} src={assets.send_icon} alt='Send Icon' /></div>
                        </div>
                    </div>
                    <p className='bottom-info'>
                        QuickGPT AI may display inaccurate information, including about individuals, so please double-check its responses for your privacy.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;
