import * as React from "react"
import { Link } from "gatsby"
import useMetaData from "../hooks/useMetaData"

const NotFoundPage = props => {
  const metaData = useMetaData()

  return (
    <>
      <article className="headerwrap">
        <h1 className="auther">{metaData.author}</h1>
        <h3 className="pagetitle">{props.titlepage}</h3>
      </article>
      <section className="pageNotFoundFlex">
        <section className="pageNotFoundWrap">
          <p className="PageNotfoundText">{props.heroheader}</p>
          <button className="buttonLink">
            <Link to="/">Till startsidan</Link>
          </button>
        </section>
      </section>
    </>
  )
}

export const Head = () => <title>Portfolio Page</title>

export default NotFoundPage
