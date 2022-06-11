import React from 'react'
import { Flex, Heading, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import useTheme from './Hooks/useTheme'

// import logo from '/images/assets/astronaut-input.svg'
const DesktopImage = styled.div`
  display: none;

  ${({ theme }) => theme.mediaQueries.lg && theme.mediaQueries.md} {
    display: block;
  }
`
const DesktopContent = styled.div`
  margin-top: 40px;
`

export default function ThankYouScreen() {
  const { isDark, theme } = useTheme()
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
      <Flex style={PageHeight} alignItems="center" justifyContent="center">
        <DesktopImage>
          <Flex alignItems="center" justifyContent="center" flexDirection="column">
            <img src="images/assets/Astronaut-thanku.svg" className="App-logo" alt="logo" />
          </Flex>
        </DesktopImage>
        <DesktopContent>
          <Flex maxWidth="550px" flexDirection="column" ml="30px">
            <Heading
              scale="xl"
              style={isDark ? { ...darkThemeStyle } : { ...headingFontStyle }}
              mb="24px"
              textAlign="center"
            >
              Thank You
            </Heading>
            <Text p="10px" style={isDark ? { ...contentFontStyleDark } : { ...contentFontStyle }}>
              We appreciate your support in our project. Please allow us up to 48 hours to process your whitelisting
              request. You will receive an email from us to confirm your whitelisting and the next steps!
            </Text>

            <Text p="10px" style={isDark ? { ...contentFontStyleDark } : { ...contentFontStyle }} pt="20px">
              In the meantime, please follow us on the social media channels below for more updates and active
              discussions.
            </Text>
          </Flex>
        </DesktopContent>
      </Flex>
    </>
  )
}
