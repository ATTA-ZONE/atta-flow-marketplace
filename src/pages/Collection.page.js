import React from 'react'
import Header from '../components/Header'


export default function Collection() {

  return (
    <>
      <Header
        title={<>My<span className="highlight">Dappies</span></>}
        subtitle={<>Here are the <span className="highlight">Dappies and Packs</span> you have collected</>}
      />

      
    </>
  )
}
