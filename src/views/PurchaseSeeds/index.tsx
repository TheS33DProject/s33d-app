import React, { useEffect } from 'react'
import { Button, Input, Progress } from '@pancakeswap/uikit'
import { useHistory } from 'react-router-dom'

function PurchaseSeeds() {
  const history = useHistory()

  useEffect(() => {
    const disclaimerStatus = localStorage.getItem('userDisclamerStatus')
    const whiteListStatus = localStorage.getItem('userWhiteListStatus')
    console.log({ disclaimerStatus, whiteListStatus })

    if (whiteListStatus === null) {
      history.push('/')
    } else if ((disclaimerStatus !== 'true' || disclaimerStatus === null) && whiteListStatus === 'true') {
      history.push('/disclaimer')
    } else if (disclaimerStatus === null && whiteListStatus === null) {
      history.push('/')
    }
  }, [history])

  return (
    <>
      <div className="buySeed">
        <div className="card-container">
          <h3>S33D Initial Offer</h3>
          <div className="text-container-offer">
            <div className="text-wrapper">Offer Price</div>
            <div className="text-wrapper">0.10 USDT per S33D</div>
          </div>
          <div className="text-container-brand">
            <div className="text-wrapper-brand">
              <div className="icon">
                <img src="images/Group.png" alt="a" />
                <span>USDT</span>
              </div>
            </div>
            <div className="text-wrapper-brand">Balance: 100.00</div>
          </div>
          <div className="input-container">
            <Input type="text" className="input-field" placeholder="1.00" />
            <img src="images/Arrow.svg" alt="button" className="img-center" />
          </div>
          <div className="text-container-brand">
            <div className="text-wrapper-brand">
              <div className="icon">
                <img src="images/Artboard.svg" alt="a" />
                <span>S33D</span>
              </div>
            </div>
            <div className="text-wrapper-brand">Balance: 100.00</div>
          </div>
          <div className="progressbar-container">
            <Progress variant="flat" primaryStep={80} />
          </div>
          <div className="text-container-offer my-2">
            <div className="text-wrapper">80% filled</div>
            <div className="text-wrapper">100,000 available</div>
          </div>

          <div className="input-container">
            <Input type="text" className="input-field" placeholder="1.00" />
          </div>
          <div className="button-popup">
            <Button type="button" className="seed-btn">
              Buy S33D
            </Button>
          </div>
          {/* <div style={{ width: '270', margin: 'auto', display: 'flex' }}>
            <div
              className="text-wrapper"
              style={{
                alignItems: 'left',
              }}
            >
              50% filled
            </div>
            <div
              className="text-wrapper"
              style={{
                alignItems: 'right',
              }}
            >
              100,000 available
            </div>
          </div>
          <div className="text-wrapper">
            <Input type="text" scale="md" placeholder="Placeholder..." />
            <img src="images/Ellipse8.svg" alt="button" />
          </div> */}
        </div>
      </div>
    </>
  )
}

export default PurchaseSeeds
