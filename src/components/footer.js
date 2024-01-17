import React from "react"
import useSocialLinks from "../hooks/useSocialLinks"
import useMetaData from "../hooks/useMetaData"

const Footer = () => {
  // Hook to fetch meta data from gatsby-config.js
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
                  <a href={social.node.linkedInLink}>
                    <img
                      className="loggo"
                      src={social.node.iconLinkedin.file.url}
                      alt="LinkedIn"
                    />
                  </a>
                  <a href={social.node.githubLink} alt="Github">
                    <img
                      className="loggo"
                      src={social.node.iconGithub.file.url}
                      alt="Github"
                    />
                  </a>
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
