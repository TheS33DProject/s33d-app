import { Flex, Heading, Text, Button, Image } from '@pancakeswap/uikit'
import Container from 'components/Layout/Container'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useInitialS33DRound } from 'hooks/useContract'
import { ethers } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import useTheme from './Hooks/useTheme'
// import logo from '/images/assets/astronaut.svg'

const DesktopImage = styled.div`
  display: none;

  ${({ theme }) => theme.mediaQueries.lg && theme.mediaQueries.md} {
    display: block;
  }
`
const DesktopContent = styled.div`
  margin-top: 40px;
`

export default function BuySeedScreen() {
  const { isDark, theme } = useTheme()
  const [checkWalletStatus, setCheckWalletStatus] = React.useState(true)
  const { account } = useWeb3React()
  const history = useHistory()
  const initialS33DRound = useInitialS33DRound()
  const buyLimit = initialS33DRound.getWhitelist()

  const [buySeed, setBuySeed] = React.useState(0)
  useEffect(() => {
    const walletStatus = localStorage.getItem('connectorIdv2')
    if (walletStatus !== null) {
      setCheckWalletStatus(false)
    } else {
      setCheckWalletStatus(true)
    }
    console.log({ walletStatus, checkWalletStatus, account })
  }, [checkWalletStatus, account])

  const formatMoney = (number) => {
    return number.toLocaleString('en-US', { currency: 'USD' })
  }
  buyLimit.then((res) => {
    setBuySeed(formatMoney(parseFloat(ethers.utils.formatUnits(res.toString(), 18).toString())))
  })

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
    <>
      <Container>
        <Flex style={PageHeight} alignItems="center" justifyContent="center">
          <DesktopImage>
            <Flex alignItems="center" justifyContent="center" flexDirection="column">
              <img src="images/assets/astronaut.svg" alt="astronaut.svg" />
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
                Buy S33D
              </Heading>
              <Text style={isDark ? { ...contentFontStyleDark } : { ...contentFontStyle }}>
                We are delighted that you share the vision and dreams of creating a new future with us.
              </Text>
              <br />
              <Text style={isDark ? { ...contentFontStyleDark } : { ...contentFontStyle }}>
                Our first goal is to raise $1,000,000 and you’re invited to participate as founding gardeners at S33D.
                To ensure a fair distribution in this first launch, each participant can acquire a maximum of{' '}
              </Text>
              <Text style={isDark ? { ...contentFontStyleDark } : { ...contentFontStyle }} bold>
                {buySeed} S33D
              </Text>
              <br />
              <Text style={isDark ? { ...contentFontStyleDark } : { ...contentFontStyle }}>
                Please connect your wallet on Binance Smart Chain to begin.
              </Text>

              <br />
              <Button width="100px" disabled={checkWalletStatus} onClick={handleClick} className="btn">
                Continue
              </Button>
            </Flex>
          </DesktopContent>
        </Flex>
      </Container>
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
