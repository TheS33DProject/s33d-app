import React from 'react'
// import logo from '/images/assets/astronaut-input.svg'

export default function ThankYouScreen() {
  return (
    <div className="main-container">
      <div className="astro-box pr-1">
        <img src="images/assets/astronaut-input.svg" className="App-logo" alt="logo" />
      </div>
      <div className="content-box">
        <h1 className="hero-heading">Thank You</h1>
        <p className="para-content">
          We appreciate your support in our project. Please allow us up to 48 hours to process your whitelisting
          request. You will receive an email from us to confirm your whitelisting and the next steps!
        </p>
        <p className="para-content">
          In the meantime, please follow us on the social media channels below for more updates and active discussions.
        </p>
      </div>
    </div>
  )
}
