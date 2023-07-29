import React, { useState } from 'react'
import './landingPage.css'

const LandingPage = () => {

    return (
        <div id='signUpContainer'>
            <div id='signUpInfoContainer'>
                <h1 id='signUpInfoHeader'>Made for people. <span>Built for productivity</span></h1>
                <p>Connect the right people, find anything you need and automate the rest. That’s work in Slack,
                    your productivity platform.
                </p>
                <div id='signUpButtonContainer'>
                    <button>SIGN UP WITH EMAIL</button>
                    <button> <img id='signUpGoogleLogo' src='https://static.vecteezy.com/system/resources/previews/013/948/549/original/google-logo-on-transparent-white-background-free-vector.jpg'></img>
                        SIGN UP WITH GOOGLE
                    </button>
                </div>
            </div>

            <div id='signUpVideoContainer'>
                <div>
                    <h1>Pretend there is a video here</h1>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;