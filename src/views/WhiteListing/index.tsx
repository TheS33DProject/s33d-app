import { Flex, Heading, Text, Button, Input, Checkbox, Box } from '@pancakeswap/uikit'
import { ToastContainer } from 'components/Toast'

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { useWeb3React } from '@web3-react/core'
import useTheme from './Hooks/useTheme'

const DesktopImage = styled.div`
  display: none;

  ${({ theme }) => theme.mediaQueries.lg && theme.mediaQueries.md} {
    display: block;
  }
`
const DesktopContent = styled.div`
  display: block;
  flex-direction: column;
  margin-right: 30px;
  ${({ theme }) => theme.mediaQueries.lg && theme.mediaQueries.md} {
    display: flex;
    flex-direction: row;
  }
`

const DesktopContent2 = styled.div`
  display: block;
  flex-direction: column;
  margin-right: 30px;
`
const WhiteListingContainer = styled.div``

export default function WhiteListingScreen() {
  const history = useHistory()
  const { isDark, theme } = useTheme()
  const { account } = useWeb3React()
  const [buttonFlag, setButtonFlag] = useState(false)
  const [checkWalletStatus, setCheckWalletStatus] = React.useState(true)
  const [userDetails, setUserDetails] = useState({
    firstname: '',
    lastname: '',
    email: '',
    termAndCondition: false,
    address: '',
  })
  const [toasts, setToasts] = useState([])

  const accountStatus = JSON.parse(localStorage.getItem(account))
  useEffect(() => {
    if (accountStatus !== null && accountStatus.whitelist === true) {
      history.push('/disclaimer')
    }
  }, [accountStatus, history])

  useEffect(() => {
    const walletStatus = localStorage.getItem('connectorIdv2')
    if (walletStatus !== null) {
      setCheckWalletStatus(true)
    } else {
      setCheckWalletStatus(false)
    }
    console.log('walletStatus:', checkWalletStatus)
  }, [checkWalletStatus, account])

  const { firstname, lastname, email, termAndCondition } = userDetails
  const onChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.name === 'termAndCondition' ? e.target.checked : e.target.value,
    })
  }

  const validateForm = (type: string, data: any) => {
    if (type === 'firstname') {
      return /^[a-z ,.'-]+$/i.test(data.firstname)
    }
    if (type === 'lastname') {
      return /^[a-z ,.'-]+$/i.test(data.lastname)
    }
    if (type === 'email') {
      return /.+@.+\.[A-Za-z]+$/.test(data.email)
    }

    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm('form', userDetails)) {
      hsFormSubmission()
    }
  }

  const handleRemove = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((prevToast) => prevToast.id !== id))
  }

  const hsFormSubmission = async () => {
    if (!account) {
      // alert('Please connect your wallet then try again.')
      const now = Date.now()
      const randomToast = {
        id: `id-${now}`,
        title: 'Please connect your wallet then try again.',
        type: 'danger',
      }
      setToasts((prevState) => [...prevState, randomToast])
    }
    try {
      const data = { ...userDetails }
      data.address = account
      delete data.termAndCondition
      const payload = transformHSFormPayload(data)

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const result = await axios.post(
        'https://api.hsforms.com/submissions/v3/integration/submit/22081730/bc742894-d797-461b-815a-95a1385b6ed8',
        payload,
        config,
      )
      if (result.status === 200) {
        localStorage.setItem(account, JSON.stringify({ whitelist: true }))
        history.push('/thank-you')
      }
    } catch (error) {
      const now = Date.now()
      const randomToast = {
        id: `id-${now}`,
        title: 'Please check your internet.',
        type: 'danger',
      }
      setToasts((prevState) => [...prevState, randomToast])
    }
  }

  const transformHSFormPayload = (data) => {
    const tranformedData = {
      fields: [],
    }
    const keys = Object.keys(data)

    keys.forEach((element) => {
      const temp = { name: '', value: '' }

      temp.name = element

      temp.value = data[element]

      tranformedData.fields.push(temp)
    })
    return tranformedData
  }
  useEffect(() => {
    if (firstname && lastname && email && termAndCondition && checkWalletStatus) {
      setButtonFlag(false)
    } else {
      setButtonFlag(true)
    }
  }, [firstname, lastname, email, termAndCondition, checkWalletStatus, buttonFlag])

  const PageHeight = {
    minHeight: 'calc(100vh - 150px)',
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
  const formStyles = {
    background: 'rgba(0, 44, 0, 0.2)',
    marginTop: '20px',
    marginRight: '20px',
  }
  const formStylesDark = {
    marginTop: '20px',
    marginRight: '20px',
  }

  const emailInput = {
    width: '100%',
  }

  return (
    <>
      <WhiteListingContainer>
        <Flex style={PageHeight} alignItems="center" justifyContent="center">
          <DesktopImage>
            <Flex alignItems="center" justifyContent="center" flexDirection="column">
              <img src="images/assets/astronaut-input.svg" className="App-logo" alt="logo" />
            </Flex>
          </DesktopImage>
          <Flex maxWidth="550px" flexDirection="column" ml="30px">
            <Heading
              style={isDark ? { ...darkThemeStyle } : { ...headingFontStyle }}
              scale="xl"
              mb="24px"
              textAlign="center"
            >
              Whitelisting
            </Heading>

            <form id="WhiteListingForm" onSubmit={handleSubmit}>
              <Text p="10px" style={isDark ? { ...contentFontStyleDark } : { ...contentFontStyle }}>
                Please fill in the form to start. We require this information to communicate important information about
                The S33D Project to all our founding gardeners.
              </Text>

              <DesktopContent>
                <Input
                  style={isDark ? { ...formStylesDark } : { ...formStyles }}
                  type="text"
                  scale="lg"
                  placeholder="First Name"
                  name="firstname"
                  onChange={onChange}
                  isSuccess={validateForm('firstname', userDetails)}
                  isWarning={!validateForm('firstname', userDetails)}
                />
                <Input
                  style={isDark ? { ...formStylesDark } : { ...formStyles }}
                  type="text"
                  scale="lg"
                  placeholder="Last Name"
                  name="lastname"
                  onChange={onChange}
                  isSuccess={validateForm('lastname', userDetails)}
                  isWarning={!validateForm('lastname', userDetails)}
                />
              </DesktopContent>
              <DesktopContent2>
                <Input
                  style={isDark ? { ...formStylesDark } : { ...formStyles, ...emailInput }}
                  type="email"
                  onChange={onChange}
                  scale="lg"
                  name="email"
                  placeholder="Email Address"
                  isSuccess={validateForm('email', userDetails)}
                  isWarning={!validateForm('email', userDetails)}
                />
              </DesktopContent2>

              <br />

              <Text p="10px" style={isDark ? { ...contentFontStyleDark } : { ...contentFontStyle }} mb="10px">
                The S33D Project is committed to protect and respect your privacy and we only use your personal
                information to facilitate this whitelisting process. If you consent to us contacting you for project
                updates, please tick the box below.
              </Text>

              <Flex flexDirection="row" mt="24px">
                <Text p="10px" style={isDark ? { ...contentFontStyleDark } : { ...contentFontStyle }}>
                  <Checkbox onChange={onChange} name="termAndCondition" />I agree to receive communications from The
                  S33D Project
                </Text>
              </Flex>
              <br />
              <Button width="100px" disabled={buttonFlag} type="submit" className="btn">
                Continue
              </Button>
            </form>
          </Flex>
        </Flex>
      </WhiteListingContainer>
      <ToastContainer toasts={toasts} onRemove={handleRemove} />
    </>
  )
}
