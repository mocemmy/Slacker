import React from 'react'
import { NavLink } from 'react-router-dom';
import './signUpBlock.css'
import './mainBlock.css'
import './securityBlock.css'
import './footer.css'

const LandingPage = () => {

    return (
        <>
            <section id='signUpInfoSection'>
                <div id='signUpContainer'>
                    <div id='signUpInfoContainer'>
                        <h1 id='signUpInfoHeader'>Made for people. <span>Built for productivity.</span></h1>
                        <p className='signUpInfoDesc'>
                            Connect the right people, find anything you need and automate the rest. That’s work in Slacker,
                            your productivity platform.
                        </p>
                        <div id='signUpButtonContainer'>
                            <div id='signUpButton'>
                                <NavLink to='/signup'>SIGN UP WITH EMAIL</NavLink>
                            </div>
                            <div id='signUpGoogle'>
                                <NavLink to='/signup'>
                                    <img id='signUpGoogleLogo' src='https://static.vecteezy.com/system/resources/previews/013/948/549/original/google-logo-on-transparent-white-background-free-vector.jpg'></img>
                                    <div>
                                        SIGN UP WITH GOOGLE
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                        <p className='signUpInfoDesc'>
                            Slacker is free to try for as long as you'd like
                        </p>
                    </div>

                    <div id='signUpVideoContainer'>
                        <video id='signUpVideo' role='img' loop muted playsInline autoPlay>
                            <source src='https://a.slack-edge.com/9689dea/marketing/img/homepage/e2e-prospects/animations/webm/hero-product-ui.webm'></source>
                        </video>
                    </div>
                </div>
            </section>

            <section id='mainSection'>
                <div id='mainContainer'>
                    <div className='mainBlock'>
                        <video className='mainVideo' role='img' loop muted playsInline autoPlay>
                            <source src='https://a.slack-edge.com/9436a9f/marketing/img/homepage/e2e-prospects/animations/webm/connectedness.webm'></source>
                        </video>

                        <div className='mainDescBlock'>
                            <h1 className='mainHeader'>Bring your team together</h1>
                            <p className='mainDesc'>
                                At the heart of Slacker are channels: organized spaces for everyone and everything you need for work.
                                In channels, it’s easier to connect across departments, offices, time zones and even other companies.
                            </p>
                            <a className='mainLink'>Learn more about channels</a>
                        </div>
                    </div>

                    <div className='mainBlock'>
                        <div className='mainDescBlock'>
                            <h1 className='mainHeader'>Choose how you want to work</h1>
                            <p className='mainDesc'>
                                In Slacker, you’ve got all the flexibility to work when, where and how it’s best for you.
                                You can easily chat, send audio and video clips, or hop on a huddle to talk things out live.
                            </p>
                            <a className='mainLink'>Learn more about flexible communication</a>
                        </div>

                        <video className='mainVideo' role='img' loop muted playsInline autoPlay>
                            <source src='https://a.slack-edge.com/9436a9f/marketing/img/homepage/e2e-prospects/animations/webm/flexibility.webm'></source>
                        </video>
                    </div>

                    <div className='mainBlock'>
                        <video className='mainVideo' role='img' loop muted playsInline autoPlay>
                            <source src='https://a.slack-edge.com/221d25b/marketing/img/homepage/e2e-prospects/animations/webm/speed.webm'></source>
                        </video>

                        <div className='mainDescBlock'>
                            <h1 className='mainHeader'>Move faster with your tools in one place</h1>
                            <p className='mainDesc'>
                                With your other work apps connected to Slacker, you can work faster by switching tabs less.
                                And with powerful tools like Workflow Builder, you can automate away routine tasks.
                            </p>
                            <a className='mainLink'>Learn more about the Slacker platform</a>
                        </div>
                    </div>
                </div>
            </section>

            <section id='securitySection'>
                <div id='securityContainer'>
                    <div id='securityHeaderContainer'>
                        <h1 id='securityHeader'>Teams large and small rely on Slacker</h1>
                        <p id='securityDesc'>Slacker securely scales up to support collaboration at the world's biggest companies</p>
                    </div>

                    <div id='securityData'>
                        <div className='securityPercentage'>
                            <h1 className='securityDataHeader'>85%</h1>
                            <p className='securityDataDesc'>of users say Slacker has Improved communication*</p>
                        </div>

                        <div className='securityPercentage'>
                            <h1 className='securityDataHeader'>86%</h1>
                            <p className='securityDataDesc'>feel their ability to work remotely has improved*</p>
                        </div>

                        <div className='securityPercentage'>
                            <h1 className='securityDataHeader'>88%</h1>
                            <p className='securityDataDesc'>feel more connected to their teams*</p>
                        </div>
                    </div>
                </div>
            </section>

            <footer id='landingFooter'>
                <div id='footerContainer'>
                    <h1 id='footerHeader'>See all you can accomplish with Slacker</h1>
                    <NavLink to='/signup'>TRY FOR FREE</NavLink>
                </div>
            </footer>
        </>
    )
}

export default LandingPage;