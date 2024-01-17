import * as React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "../css/style.css"
import Footer from "./footer"
import Navbar from "./navbar"
import useMetaData from "../hooks/useMetaData"

const Layout = ({ children }) => {
  // Hook to fetch meta data from gatsby-config.js
  const metaData = useMetaData()
  return (
    <div className="footerpusher">
      <header>
        <meta name="author" content={metaData.author} />
        <meta name="description" content={metaData.description} />
        <Navbar />
      </header>
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
