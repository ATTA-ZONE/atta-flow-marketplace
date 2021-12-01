import React from 'react'
export default function Header({ title, subtitle }) {
  return (
    <>
      <h1 className="app__title">{title}</h1>
      <h3 className="app__subtitle">{subtitle}</h3>
    </>
  )
}
