/** @jsx jsx */
import React, { useContext } from 'react'
import { jsx } from '@emotion/core'
import { Link, StaticQuery, graphql } from 'gatsby'

const Layout = (props) => {
  return <div>{props.children}</div>
}

export default (props) => {
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
            }
          }
          allMdx {
            edges {
              node {
                headings(depth: h1) {
                  value
                }
                frontmatter {
                  icon
                }
                rawBody
                tableOfContents
                fields {
                  slug
                }
              }
            }
          }
        }
      `}
      render={(data) => <Layout {...props} data={data} />}
    />
  )
}
