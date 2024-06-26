import React from 'react'
import "./Card.css"


const Card = ({ children, variant, width, height, bgImage, gap }) => {
  const bgImageStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundPosition: 'center',
    zIndex: '-1',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    borderRadius: '8px',
    border: "3px solid #1B1230"
  }

  return (
    <div className={`card-${variant}`} style={{width: width, minHeight: height, gap: gap, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: "5px"}}>
      <div style={bgImage && { ...bgImageStyle}}></div>
      <div className='things'>
        {children}
      </div>
    </div>
  )
}

export { Card }
