import React, { useState } from 'react'
import './signUpBlock.css'
import './advertising.css'

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
                            <a id='signUpButton'>SIGN UP WITH EMAIL</a>
                            <a id='signUpGoogle'>
                                <div id='signUpGoogleLogoContainer'>
                                    <img id='signUpGoogleLogo' src='https://static.vecteezy.com/system/resources/previews/013/948/549/original/google-logo-on-transparent-white-background-free-vector.jpg'></img>
                                </div>
                                <div>
                                    SIGN UP WITH GOOGLE
                                </div>
                            </a>
                        </div>
                        <p className='signUpInfoDesc'>
                            Slacker is free to try for as long as you'd like
                        </p>
                    </div>

                    <div id='signUpVideoContainer'>
                        <div>
                            <h1>Pretend there is a video here</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section id='advertisingSection'>
                <div id='advertisingContainer'>
                    <div className='advertisingBlock'>
                        <div className='videoPlaceHolder'>
                            <h1>Pretend there is a video here</h1>
                        </div>

                        <div className='advertisingDescBlock'>
                            <h1 className='advertisingHeader'>Bring your team together</h1>
                            <p className='advertisingDesc'>
                                At the heart of Slacker are channels: organized spaces for everyone and everything you need for work.
                                In channels, it’s easier to connect across departments, offices, time zones and even other companies.
                            </p>
                            <a className='advertisingLink'>Learn more about channels</a>
                        </div>
                    </div>

                    <div className='advertisingBlock'>
                        <div className='advertisingDescBlock'>
                            <h1 className='advertisingHeader'>Choose how you want to work</h1>
                            <p className='advertisingDesc'>
                                In Slacker, you’ve got all the flexibility to work when, where and how it’s best for you.
                                You can easily chat, send audio and video clips, or hop on a huddle to talk things out live.
                            </p>
                            <a className='advertisingLink'>Learn more about flexible communication</a>
                        </div>

                        <div className='videoPlaceHolder'>
                            <h1>Pretend there is a video here</h1>
                        </div>
                    </div>

                    <div className='advertisingBlock'>
                        <div className='videoPlaceHolder'>
                            <h1>Pretend there is a video here</h1>
                        </div>

                        <div className='advertisingDescBlock'>
                            <h1 className='advertisingHeader'>Move faster with your tools in one place</h1>
                            <p className='advertisingDesc'>
                                With your other work apps connected to Slacker, you can work faster by switching tabs less.
                                And with powerful tools like Workflow Builder, you can automate away routine tasks.
                            </p>
                            <a className='advertisingLink'>Learn more about the Slacker platform</a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LandingPage;