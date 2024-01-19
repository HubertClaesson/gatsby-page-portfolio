import React from "react"
import useSocialLinks from "../hooks/useSocialLinks"
import useMetaData from "../hooks/useMetaData"
import { Link } from "gatsby"

const Footer = () => {
  // Hook to fetch metadata from gatsby-config.js
  const metaData = useMetaData()
  // Hook to fetch url to gitHub and LinkedIn and svg-icons
  const socialContent = useSocialLinks()

  return (
    <>
      <footer className="footer">
        <section className="footerwrap">
          <p className="footerAuthor">{metaData.author}</p>
          {socialContent.map(social => {
            return (
              <div key={social.node.id}>
                <div className="footerContent">
                  <Link href={social.node.linkedInLink}>
                    <img
                      className="loggo"
                      src={social.node.iconLinkedin.file.url}
                      alt="LinkedIn"
                    />
                  </Link>
                  <Link href={social.node.githubLink} alt="Github">
                    <img
                      className="loggo"
                      src={social.node.iconGithub.file.url}
                      alt="Github"
                    />
                  </Link>
                </div>
              </div>
            )
          })}
        </section>
      </footer>
    </>
  )
}

export default Footer
