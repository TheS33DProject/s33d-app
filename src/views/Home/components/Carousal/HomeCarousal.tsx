import React from 'react'
import Carousel from 'nuka-carousel'

function HomeCarousel() {
  // const wrapAround = true
  return (
    <>
      <Carousel
        // wrapAround="true"
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
        <div className="items">
          <div className="slider-content">
            <h2>The S33D Project</h2>
            <p>
              This is a 100% community owned sustainability initiative. Together, we’re reimagining how we use our
              resources to conserve our planet for generations to come.
            </p>
            <p>Finance for growers</p>
            <p>Powered by blockchain, accelerated by DeFi.</p>
          </div>
          {/* <img src="/assets/images/carousel/imageHd1.jpg" alt="1" /> */}
        </div>
        <div className="items">
          <div className="slider-content">
            <h2>Plant A S33D</h2>
            <p>All life happens with planting a seed.</p>
            <p>
              Our initiative is easy. Tell S33D farmers what you want and the community responds with fair offers for
              locally grown and harvested foods at specific time frames.
            </p>
          </div>
          {/* <img src="/assets/images/carousel/imageHd1.jpg" alt="1" /> */}
        </div>
        <div className="items">
          <div className="slider-content">
            <h2>Grow Food</h2>
            <p>Get funded to start your passion for growing loved fruits of labor.</p>
            <p>
              Mark your presence, establish your credentials, and thrive while growing what you love, knowing they will
              be enjoyed locally.
            </p>
          </div>
        </div>
        <div className="items">
          <div className="slider-content">
            <h2>Fund Causes</h2>
            <p>
              Mobilise funds to reach the causes that matter to you. Let the planet be a little better to live in when
              funds go to where it matters.
            </p>
          </div>
        </div>
      </Carousel>
    </>
  )
}
export default HomeCarousel
