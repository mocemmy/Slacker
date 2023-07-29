import React, { useState } from 'react'
import './signUpBlock.css'

const LandingPage = () => {

    return (
        <>
            <section id='signUpInfoSection'>
                <div id='signUpContainer'>
                    <div id='signUpInfoContainer'>
                        <h1 id='signUpInfoHeader'>Made for people. <span>Built for productivity.</span></h1>
                        <p className='signUpInfoDesc'>Connect the right people, find anything you need and automate the rest. That’s work in Slacker,
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
        </>
    )
}

export default LandingPage;