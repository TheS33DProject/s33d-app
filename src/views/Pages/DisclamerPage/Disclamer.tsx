import { Button } from '@pancakeswap/uikit'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

// import logo from '/images/assets/g12.svg'

export default function DisclamerScreen() {
  const history = useHistory()
  useEffect(() => {
    const whiteListStatus = localStorage.getItem('userWhiteListStatus')
    if (whiteListStatus !== 'true') {
      history.push('/')
    }
  }, [history])

  const handleClick = () => {
    localStorage.setItem('userDisclamerStatus', 'true')
    history.push('/purchase-seed')
  }
  return (
    <div className="main-container">
      <div className="astro-box pr-1">
        <img src="images/assets/g12.svg" className="App-logo" alt="logo" />
      </div>
      <div className="content-box">
        <h1 className="hero-heading">Disclaimer</h1>
        <p className="para-content">
          The S33D Project is an innovative concept for reimagining the ideas and our relationship with nature and our
          planet. We are on a mission to enable the propagation of sustainability initiatives and encourage humankind to
          form symbiotic relationships with our planet and each
        </p>
        <p className="para-content">
          You understand that by participating the Initial DEX Offering (IDO) of The S33D Project, you have:
        </p>
        <p className="para-content">
          <span className="content1">(I) read the Legal Notice and other information about this ID</span>
          <span className="content1">(II) confirmed that you are not in a jurisdiction where buying,</span>
          <span className="content1">
            trading and/or owing S33D token would be prohibited or restricted in any manner.
          </span>
          <span className="content1">(III) understood that despite all precautions, there can</span>
          still be exploit risks that exist within the app which may result in partial or total loss of funds.
        </p>
        <Button type="button" onClick={handleClick} className="btn">
          Submit
        </Button>
      </div>
    </div>
  )
}
