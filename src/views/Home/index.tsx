import React from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import useTheme from 'hooks/useTheme'
import { useHistory } from 'react-router-dom'
import { Button } from '@pancakeswap/uikit'
import HomeCarousel from './components/Carousal'

const BuySeedButton = styled(Button)`
  background: #41a65b;
  border-radius: 43px;
  margin-top: 24px;
`

const Home: React.FC = (props) => {
  const { theme } = useTheme()
  const { account } = useWeb3React()
  const history = useHistory()
  // const HomeSectionContainerStyles = { margin: '0', width: '100%', maxWidth: '968px' }

  const divStyle = {
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: '20%',
    paddingRight: '20%',
  }

  return (
    <>
      <div style={divStyle}>
        <HomeCarousel />
      </div>
      <div style={divStyle}>
        <BuySeedButton onClick={() => history.push('/buy-seeds')}>Buy S33D</BuySeedButton>
      </div>
    </>
  )
}

export default Home
