import { Button, Input } from '@pancakeswap/uikit'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
// import logo from '/images/assets/astronaut-input.svg'

export default function WhiteListingScreen() {
  const history = useHistory()
  const [buttonFlag, setButtonFlag] = useState(false)
  const [userDetails, setUserDetails] = useState({
    firstname: '',
    lastname: '',
    email: '',
    termAndCondition: false,
  })
  const { firstname, lastname, email, termAndCondition } = userDetails
  const onChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.name === 'termAndCondition' ? e.target.checked : e.target.value,
    })
  }
  const validateForm = () => {
    if (firstname === '') {
      alert('First Name is required feild')
      return false
    }
    if (lastname === '') {
      alert('Last Name is required feild.')
      return false
    }
    if (email === '') {
      alert('Email is required field.')
      return false
    }
    if (termAndCondition === false) {
      alert('Please Agree to term and conditions.')
      return false
    }
    return true
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      hsFormSubmission()
    }
  }
  const hsFormSubmission = async () => {
    try {
      const data = { ...userDetails }
      data['TICKET.content'] = 'content from developer kapil Sharma'
      delete data.termAndCondition
      const payload = transformHSFormPayload(data)
      console.log(payload)

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
        history.push('/thank-you')
      }
    } catch (error) {
      console.log('Error from API', error)
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
    if (firstname && lastname && email && termAndCondition) {
      setButtonFlag(false)
    } else {
      setButtonFlag(true)
    }
    console.log({ buttonFlag, firstname, lastname, email, termAndCondition })
  }, [firstname, lastname, email, termAndCondition, buttonFlag])
  return (
    <>
      <div className="main-container">
        <div className="astro-box pr-1">
          <img src="images/assets/astronaut-input.svg" className="App-logo" alt="logo" />
        </div>
        <div className="content-box">
          <h1 className="hero-heading">Whitelisting</h1>
          <form id="WhiteListingForm" onSubmit={handleSubmit}>
            <p className="para-content">
              Please fill in the form to start. We require this information to communicate important information about
              The S33D Project to all our founding gardeners.
            </p>
            <div className="input-controller">
              <div className="form-group">
                <Input type="text" scale="lg" placeholder="First Name" name="firstname" onChange={onChange} />
              </div>
              <div className="form-group">
                <Input type="text" scale="lg" placeholder="Last Name" name="lastname" onChange={onChange} />
              </div>
            </div>
            <div className="form-group-mail">
              <Input type="email" onChange={onChange} scale="lg" name="email" placeholder="Email Address" />
            </div>
            <br />
            <p className="para-content">
              The S33D Project is committed to protect and respect your privacy and we only use your personal
              information to facilitate this whitelisting process. If you consent to us contacting you for project
              updates, please tick the box below.
            </p>
            <label htmlFor="vehicle1" className="para-content">
              <input type="checkbox" onChange={onChange} name="termAndCondition" />I agree to receive communications
              from The S33D Project
            </label>
            <br />
            <br />
            <Button type="submit" className="btn" disabled={buttonFlag}>
              Submit
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
