import React from 'react'
import Layout from '../layout/layout'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-mdx'

export default ({ data: { mdx } }) => {
  return (
    <Layout>
      <MDXRenderer>{mdx.code.body}</MDXRenderer>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      fields {
        slug
      }
      code {
        body
      }
    }
  }
`
