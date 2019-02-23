import React from 'react'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-mdx'
import { useDarkMode } from '@nyctalope/react'
import { Page } from '@nyctalope/react'
import { ThemeContext, ColorScheme, Fonts } from '@nyctalope/core'
import { Wrapper } from '../components/Wrapper'

export default ({ data: { mdx } }) => {
  const prefersColorScheme = useDarkMode() ? 'dark' : 'light'
  const providedContext = {
    prefersColorScheme: prefersColorScheme,
    colors: ColorScheme[prefersColorScheme],
    fonts: Fonts,
  }
  console.log('ComponentPage - providedContext:', providedContext)
  return (
    <ThemeContext.Provider value={providedContext}>
      <Layout>
        <Page>
          <MDXRenderer>{mdx.code.body}</MDXRenderer>
        </Page>
      </Layout>
    </ThemeContext.Provider>
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
