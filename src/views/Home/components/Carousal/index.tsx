import React from 'react'
import { Flex, Heading, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import Carousel from 'nuka-carousel'
import useTheme from 'hooks/useTheme'
import './carousel.css'

const DesktopContent = styled.div``

function HomeCarousel() {
  // const wrapAround = true
  const { isDark, theme } = useTheme()

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

  return (
    <>
      <Carousel
        animation="fade"
        // wrapAround="true"
        style={{ marginTop: '80px', width: '100vw' }}
        slidesToShow={1}
        defaultControlsConfig={{
          prevButtonStyle: {
            display: 'none',
          },
          nextButtonStyle: {
            display: 'none',
          },
          pagingDotsStyle: {
            fill: 'green',
          },
          pagingDotsContainerClassName: 'page-dots-container',
        }}
        // wrapAround
      >
        <Flex mb="30px" alignItems="center" flexDirection="column" justifyContent="center">
          <Heading
            style={isDark ? { ...darkThemeStyle } : { ...headingFontStyle }}
            scale="xl"
            mb="24px"
            textAlign="center"
          >
            The S33D Project
          </Heading>
          <DesktopContent>
            <Text textAlign="center" style={isDark ? { ...contentFontStyleDark } : { ...contentFontStyle }}>
              This is a 100% community owned sustainability initiative. Together, we’re reimagining how we use our
              resources to conserve our planet for generations to come.
            </Text>
            <Text textAlign="center" style={isDark ? { ...contentFontStyleDark } : { ...contentFontStyle }}>
              Finance for growers
            </Text>
            <Text textAlign="center" style={isDark ? { ...contentFontStyleDark } : { ...contentFontStyle }}>
              Powered by blockchain, accelerated by DeFi.
            </Text>
          </DesktopContent>
        </Flex>

        <>
          <Flex alignItems="center" flexDirection="column" justifyContent="center">
            <Heading
              style={isDark ? { ...darkThemeStyle } : { ...headingFontStyle }}
              scale="xl"
              mb="24px"
              textAlign="center"
            >
              Plant A S33D
            </Heading>
            <Text textAlign="center" style={isDark ? { ...contentFontStyleDark } : { ...contentFontStyle }}>
              All life happens with planting a seed.
            </Text>
            <Text textAlign="center" p="20px" style={isDark ? { ...contentFontStyleDark } : { ...contentFontStyle }}>
              Our initiative is easy. Tell S33D farmers what you want and the community responds with fair offers for
              locally grown and harvested foods at specific time frames.
            </Text>
          </Flex>
          {/* <img src="/assets/images/carousel/imageHd1.jpg" alt="1" /> */}
        </>
        <>
          <Flex alignItems="center" flexDirection="column" justifyContent="center">
            <Heading
              style={isDark ? { ...darkThemeStyle } : { ...headingFontStyle }}
              scale="xl"
              mb="24px"
              textAlign="center"
            >
              Grow Food
            </Heading>
            <Text textAlign="center" style={isDark ? { ...contentFontStyleDark } : { ...contentFontStyle }}>
              Get funded to start your passion for growing loved fruits of labor.
            </Text>
            <Text textAlign="center" style={isDark ? { ...contentFontStyleDark } : { ...contentFontStyle }}>
              Mark your presence, establish your credentials, and thrive while growing what you love, knowing they will
              be enjoyed locally.
            </Text>
          </Flex>
        </>
        <>
          <Flex alignItems="center" flexDirection="column" justifyContent="center">
            <Heading
              style={isDark ? { ...darkThemeStyle } : { ...headingFontStyle }}
              scale="xl"
              mb="24px"
              textAlign="center"
            >
              Fund Causes
            </Heading>
            <Text textAlign="center" style={isDark ? { ...contentFontStyleDark } : { ...contentFontStyle }}>
              Mobilise funds to reach the causes that matter to you. Let the planet be a little better to live in when
              funds go to where it matters.
            </Text>
          </Flex>
        </>
      </Carousel>
    </>
  )
}
export default HomeCarousel
