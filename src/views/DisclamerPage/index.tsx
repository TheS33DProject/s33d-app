import { Flex, Heading, Text, Button } from '@pancakeswap/uikit'
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

  const PageHeight = {
    height: 'calc(100vh - 200px)',
  }
  const contentFontStyle = {
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    color: '#002C00',
  }
  const headingFontStyle = {
    fontFamily: 'Fredoka',
    fontStyle: 'normal',
    color: '#002C00',
  }

  return (
    <>
      <Flex style={PageHeight} alignItems="center" justifyContent="center">
        <Flex alignItems="center" justifyContent="center" flexDirection="column">
          <img src="images/assets/g12.svg" className="App-logo" alt="logo" />
        </Flex>
        <Flex maxWidth="550px" flexDirection="column" ml="30px">
          <Heading style={headingFontStyle} scale="xl" mb="24px" textAlign="center">
            Disclaimer
          </Heading>
          <Text style={contentFontStyle} fontSize="18px">
            The S33D Project is an innovative concept for reimagining the ideas and our relationship with nature and our
            planet. We are on a mission to enable the propagation of sustainability initiatives and encourage humankind
            to form symbiotic relationships with our planet and each
          </Text>
          <br />
          <Text style={contentFontStyle} fontSize="18px">
            You understand that by participating the Initial DEX Offering (IDO) of The S33D Project, you have:
            <Text style={contentFontStyle}>(I) read the Legal Notice and other information about this ID</Text>
            <Text style={contentFontStyle}>(II) confirmed that you are not in a jurisdiction where buying,</Text>
            <Text style={contentFontStyle}>
              trading and/or owing S33D token would be prohibited or restricted in any manner.
            </Text>
            <br />
            still be exploit risks that exist within the app which may result in partial or total loss of funds.
          </Text>
          <br />
          <Button width="100px" onClick={handleClick} className="btn">
            Continue
          </Button>
        </Flex>
      </Flex>
    </>
    // <div className="main-container">
    //   <div className="astro-box pr-1">
    //     <img src="images/assets/g12.svg" className="App-logo" alt="logo" />
    //   </div>
    //   <div className="content-box">
    //     <h1 className="hero-heading">Disclaimer</h1>
    //     <p className="para-content">
    //       The S33D Project is an innovative concept for reimagining the ideas and our relationship with nature and our
    //       planet. We are on a mission to enable the propagation of sustainability initiatives and encourage humankind to
    //       form symbiotic relationships with our planet and each
    //     </p>
    //     <p className="para-content">
    //       You understand that by participating the Initial DEX Offering (IDO) of The S33D Project, you have:
    //     </p>
    //     <p className="para-content">
    //       <span className="content1">(I) read the Legal Notice and other information about this ID</span>
    //       <span className="content1">(II) confirmed that you are not in a jurisdiction where buying,</span>
    //       <span className="content1">
    //         trading and/or owing S33D token would be prohibited or restricted in any manner.
    //       </span>
    //       <span className="content1">(III) understood that despite all precautions, there can</span>
    //       still be exploit risks that exist within the app which may result in partial or total loss of funds.
    //     </p>
    //     <Button type="button" onClick={handleClick} className="btn">
    //       Submit
    //     </Button>
    //   </div>
    // </div>
  )
}
