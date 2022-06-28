import React from 'react'
import { Flex, Heading, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react' // import Carousel from 'nuka-carousel'
import 'swiper/swiper.min.css'
import 'swiper/components/effect-coverflow/effect-coverflow.min.css'
import 'swiper/components/pagination/pagination.min.css'
import 'swiper/components/navigation/navigation.min.css'
import SwiperCore, { EffectCoverflow, Pagination, Autoplay } from 'swiper/core'
import useTheme from 'hooks/useTheme'
import './carousel.css'

SwiperCore.use([EffectCoverflow, Pagination, Autoplay])

const DesktopContent = styled.div``
const DesktopContainerMain = styled.div`
  margin-top: 100px;
  @media (min-width: 481px) and (max-width: 767px) {
    margin-top: 0px;
  }

  @media (min-width: 320px) and (max-width: 480px) {
    margin-top: 0px;
  }
`

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

  // const navigation = {
  //   navigation: {
  //     nextEl: '.swiper-button-next',
  //     prevEl: '.swiper-button-prev',
  //   },
  // }

  return (
    <DesktopContainerMain>
      <Swiper
        style={{ width: '100vw' }}
        centeredSlides
        spaceBetween={50}
        pagination={{
          clickable: true,
          bulletActiveClass: 'swiper-pagination-bullet-active',
        }}
        loop
        slidesPerView={1}
        breakpoints={{
          // when window width is >= 320px
          320: {
            spaceBetween: 20,
          },
          // when window width is >= 480px
          480: {
            spaceBetween: 20,
          },
          // when window width is >= 640px
          640: {
            spaceBetween: 20,
          },
        }}
      >
        <SwiperSlide>
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
              <Text textAlign="center" p="20px" style={isDark ? { ...contentFontStyleDark } : { ...contentFontStyle }}>
                This is a 100% community owned sustainability initiative. Together, we’re reimagining how we use our
                resources to conserve our planet for generations to come.
              </Text>
              <Text textAlign="center" p="20px" style={isDark ? { ...contentFontStyleDark } : { ...contentFontStyle }}>
                Finance for growers
              </Text>
              <Text textAlign="center" p="20px" style={isDark ? { ...contentFontStyleDark } : { ...contentFontStyle }}>
                Powered by blockchain, accelerated by DeFi.
              </Text>
            </DesktopContent>
          </Flex>
        </SwiperSlide>
        <SwiperSlide>
          <Flex alignItems="center" flexDirection="column" justifyContent="center">
            <Heading
              style={isDark ? { ...darkThemeStyle } : { ...headingFontStyle }}
              scale="xl"
              mb="24px"
              textAlign="center"
            >
              Plant A S33D
            </Heading>
            <Text textAlign="center" p="20px" style={isDark ? { ...contentFontStyleDark } : { ...contentFontStyle }}>
              All life happens with planting a seed.
            </Text>
            <Text textAlign="center" p="20px" style={isDark ? { ...contentFontStyleDark } : { ...contentFontStyle }}>
              Our initiative is easy. Tell S33D farmers what you want and the community responds with fair offers for
              locally grown and harvested foods at specific time frames.
            </Text>
          </Flex>
        </SwiperSlide>
        <SwiperSlide>
          <Flex alignItems="center" flexDirection="column" justifyContent="center">
            <Heading
              style={isDark ? { ...darkThemeStyle } : { ...headingFontStyle }}
              scale="xl"
              mb="24px"
              textAlign="center"
            >
              Grow Food
            </Heading>
            <Text textAlign="center" p="20px" style={isDark ? { ...contentFontStyleDark } : { ...contentFontStyle }}>
              Get funded to start your passion for growing loved fruits of labor.
            </Text>
            <Text textAlign="center" p="20px" style={isDark ? { ...contentFontStyleDark } : { ...contentFontStyle }}>
              Mark your presence, establish your credentials, and thrive while growing what you love, knowing they will
              be enjoyed locally.
            </Text>
          </Flex>
        </SwiperSlide>
        <SwiperSlide>
          <Flex alignItems="center" flexDirection="column" justifyContent="center">
            <Heading
              style={isDark ? { ...darkThemeStyle } : { ...headingFontStyle }}
              scale="xl"
              mb="24px"
              textAlign="center"
            >
              Fund Causes
            </Heading>
            <Text textAlign="center" p="20px" style={isDark ? { ...contentFontStyleDark } : { ...contentFontStyle }}>
              Mobilise funds to reach the causes that matter to you. Let the planet be a little better to live in when
              funds go to where it matters.
            </Text>
          </Flex>
        </SwiperSlide>
      </Swiper>
      {/* <Carousel
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
            <Text textAlign="center" p="20px" style={isDark ? { ...contentFontStyleDark } : { ...contentFontStyle }}>
              This is a 100% community owned sustainability initiative. Together, we’re reimagining how we use our
              resources to conserve our planet for generations to come.
            </Text>
            <Text textAlign="center" p="20px" style={isDark ? { ...contentFontStyleDark } : { ...contentFontStyle }}>
              Finance for growers
            </Text>
            <Text textAlign="center" p="20px" style={isDark ? { ...contentFontStyleDark } : { ...contentFontStyle }}>
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
            <Text textAlign="center" p="20px" style={isDark ? { ...contentFontStyleDark } : { ...contentFontStyle }}>
              All life happens with planting a seed.
            </Text>
            <Text textAlign="center" p="20px" style={isDark ? { ...contentFontStyleDark } : { ...contentFontStyle }}>
              Our initiative is easy. Tell S33D farmers what you want and the community responds with fair offers for
              locally grown and harvested foods at specific time frames.
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
              Grow Food
            </Heading>
            <Text textAlign="center" p="20px" style={isDark ? { ...contentFontStyleDark } : { ...contentFontStyle }}>
              Get funded to start your passion for growing loved fruits of labor.
            </Text>
            <Text textAlign="center" p="20px" style={isDark ? { ...contentFontStyleDark } : { ...contentFontStyle }}>
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
            <Text textAlign="center" p="20px" style={isDark ? { ...contentFontStyleDark } : { ...contentFontStyle }}>
              Mobilise funds to reach the causes that matter to you. Let the planet be a little better to live in when
              funds go to where it matters.
            </Text>
          </Flex>
        </>
      </Carousel> */}
    </DesktopContainerMain>
  )
}
export default HomeCarousel
