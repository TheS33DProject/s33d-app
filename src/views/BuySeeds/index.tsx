import { Flex, Heading, Text, Button } from '@pancakeswap/uikit'

import { useHistory } from 'react-router-dom'
import React, { useEffect } from 'react'
// import logo from '/images/assets/astronaut.svg'

export default function BuySeedScreen() {
  const [checkWalletStatus, setCheckWalletStatus] = React.useState(true)
  const history = useHistory()

  useEffect(() => {
    const walletStatus = localStorage.getItem('connectorIdv2')
    if (walletStatus !== null) {
      setCheckWalletStatus(false)
    } else {
      setCheckWalletStatus(true)
    }
    console.log({ walletStatus, checkWalletStatus })
  }, [checkWalletStatus])

  const handleClick = (e) => {
    history.push('/white-listing')
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
          <img src="images/assets/astronaut.svg" className="App-logo" alt="logo" />
        </Flex>
        <Flex maxWidth="550px" flexDirection="column" ml="30px">
          <Heading style={headingFontStyle} scale="xl" mb="24px" textAlign="center">
            Buy S33D
          </Heading>
          <Text style={contentFontStyle} fontSize="18px">
            We are delighted that you share the vision and dreams of creating a new future with us.
          </Text>
          <br />
          <Text style={contentFontStyle} fontSize="18px">
            Our first goal is to raise $1,000,000 and you’re invited to participate as founding gardeners at S33D. To
            ensure a fair distribution in this first launch, each participant can acquire a maximum of{' '}
          </Text>
          <Text style={contentFontStyle} bold>
            100,000 S33D
          </Text>
          <br />
          <Text style={contentFontStyle} fontSize="18px">
            Please connect your wallet on Binance Smart Chain to begin.
          </Text>

          <br />
          <Button width="100px" disabled={checkWalletStatus} onClick={handleClick} className="btn">
            Continue
          </Button>
        </Flex>
      </Flex>
      {/* <div className="main-container">
        <div className="astro-box pr-1">
          <img src="images/assets/astronaut.svg" className="App-logo" alt="logo" />
        </div>
        <div className="content-box">
          <h1 className="hero-heading">Buy S33D</h1>
          <p className="para-content">
            We are delighted that you share the vision and dreams of creating a new future with us.
          </p>
          <p className="para-content">
            Our first goal is to raise $1,000,000 and you’re invited to participate as founding gardeners at S33D. To
            ensure a fair distribution in this first launch, each participant can acquire a maximum of{' '}
            <span className="txt-bold">100,000 S33D</span>.
          </p>

          <p className="para-content">Please connect your wallet on Binance Smart Chain to begin.</p>
          <br />
          <Button disabled={checkWalletStatus} onClick={handleClick} className="btn">
            Continue
          </Button>
        </div>
      </div> */}
    </>
  )
}
