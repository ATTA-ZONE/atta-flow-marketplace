import React from 'react'
import "./Home.page.css"
import { useHistory } from "react-router-dom"
import useArtList from '../hooks/use-artlist.hook'

export default function Home() {
  const history = useHistory()

  const list = useArtList()

  return (
    <div className="bzy-e center-85">
      <ul className="bzy-e-list">
        {list.list.map((item) => <li key={item.id} onClick={() => history.push('/artwork')}>{item.name}</li>)}
      </ul>
    </div>
  )
}
