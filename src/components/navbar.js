import * as React from "react"
import useNavigation from "../hooks/useNavigation"
import { Link } from "gatsby"

const Navbar = () => {
  // hook that fetch title url and id
  const topNavigation = useNavigation()
  return (
    <>
      <nav className="nav">
        <ul>
          {topNavigation
            .filter(nav => nav.node.url !== "/404")
            .map(nav => {
              return (
                <li key={nav.node.id}>
                  <Link to={nav.node.url}>{nav.node.titlepage}</Link>
                </li>
              )
            })}
        </ul>
      </nav>
    </>
  )
}

export default Navbar
