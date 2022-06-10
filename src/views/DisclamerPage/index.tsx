import { Flex, Heading, Text, Button } from '@pancakeswap/uikit'
import styled from 'styled-components'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import useTheme from './Hooks/useTheme'

// import logo from '/images/assets/g12.svg'
const DesktopImage = styled.div`
  display: none;

  ${({ theme }) => theme.mediaQueries.lg && theme.mediaQueries.md} {
    display: block;
  }
`
const DesktopContent = styled.div`
  margin-top: 40px;
`
const DisclaimerContainer = styled.div`
  margin-top: 250px;
  ${({ theme }) => theme.mediaQueries.lg && theme.mediaQueries.md} {
    margin-top: 0px;
  }
`

export default function DisclamerScreen() {
  const history = useHistory()
  const { isDark, theme } = useTheme()
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
    minHeight: 'calc(100vh - 200px)',
  }
  const contentFontStyle = {
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    color: '#002C00',
    fontSize: '18px',
  }
  const contentFontStyleDark = {
    fontFamily: 'Manrope',
    fontStyle: 'normal',

    fontSize: '18px',
  }

  const headingFontStyle = {
    fontFamily: 'Fredoka',
    fontStyle: 'normal',
    color: '#002C00',
  }

  const darkThemeStyle = {
    fontFamily: 'Fredoka',
    fontStyle: 'normal',
    color: '#4fba6a',
  }

  return (
    <DisclaimerContainer>
      <Flex style={PageHeight} alignItems="center" justifyContent="center">
        <DesktopImage>
          <Flex alignItems="center" justifyContent="center" flexDirection="column">
            <img src="images/assets/g12.svg" className="App-logo" alt="logo" />
          </Flex>
        </DesktopImage>
        <DesktopContent>
          <Flex maxWidth="550px" flexDirection="column" ml="30px">
            <Heading
              style={isDark ? { ...darkThemeStyle } : { ...headingFontStyle }}
              scale="xl"
              mb="24px"
              textAlign="center"
            >
              Disclaimer
            </Heading>
            <Text style={isDark ? { ...contentFontStyleDark } : { ...contentFontStyle }}>
              The S33D Project is an innovative concept for reimagining the ideas and our relationship with nature and
              our planet. We are on a mission to enable the propagation of sustainability initiatives and encourage
              humankind to form symbiotic relationships with our planet and each
            </Text>
            <br />
            <Text style={isDark ? { ...contentFontStyleDark } : { ...contentFontStyle }}>
              You understand that by participating the Initial DEX Offering (IDO) of The S33D Project, you have:
              <Text style={isDark ? { ...contentFontStyleDark } : { ...contentFontStyle }}>
                (I) read the Legal Notice and other information about this ID
              </Text>
              <Text style={isDark ? { ...contentFontStyleDark } : { ...contentFontStyle }}>
                (II) confirmed that you are not in a jurisdiction where buying,
              </Text>
              <Text style={isDark ? { ...contentFontStyleDark } : { ...contentFontStyle }}>
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
        </DesktopContent>
      </Flex>
    </DisclaimerContainer>
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
