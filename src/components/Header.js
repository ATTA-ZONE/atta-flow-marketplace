import React from 'react'
export default function Header({ title, subtitle }) {
  return (
    <>
      <img src='https://www.bazhuayu.io/mobile/tc/images/Brand.png' style={{paddingTop: '140px'}} width="200px" alt="Dappy" />
      <h1 className="app__title">{title}</h1>
      <h3 className="app__subtitle">{subtitle}</h3>
    </>
  )
}
