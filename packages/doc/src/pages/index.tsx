/** @jsx jsx */
import React, { useContext } from 'react'
import { jsx } from '@emotion/core'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout/layout'

export default ({ data: { allMdx } }) => {
  return (
    <Layout>
      <h1>Yo</h1>
    </Layout>
  )
}

export const query = graphql`
  query {
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
`
