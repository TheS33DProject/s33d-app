import { Button } from '@pancakeswap/uikit'
import React from 'react'
import logo from '../assets/astronaut-input.svg'

export default function WhiteListingScreen() {
  return (
    <>
      <div className="main-container">
        <div className="astro-box pr-1">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="content-box">
          <h1 className="hero-heading">Whitelisting</h1>

          <form id="WhiteListingForm">
            <p className="para-content">
              Please fill in the form to start. We require this information to communicate important information about
              The S33D Project to all our founding gardeners.
            </p>
            <div className="input-controller">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="First Name" />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Last Name" />
              </div>
            </div>
            <div className="form-group-mail">
              <input type="email" placeholder="Email Address" />
            </div>

            <p className="para-content">
              The S33D Project is committed to protect and respect your privacy and we only use your personal
              information to facilitate this whitelisting process. If you consent to us contacting you for project
              updates, please tick the box below.
            </p>

            <label htmlFor="vehicle1" className="para-content">
              <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />I agree to receive communications from
              The S33D Project
            </label>
            <br />
            <br />
            <Button type="submit" className="btn">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
