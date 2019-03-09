import React from 'react'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-mdx'
import { useDarkMode } from '@nyctalope/react'
import { WebView } from '@nyctalope/react'
import { ColorScheme, Fonts, ThemeContext } from '@nyctalope/core'
import { MDXProvider } from '@mdx-js/tag'
import { Wrapper } from '../components/Wrapper'

export default ({ data: { mdx } }) => {
  const prefersColorScheme = useDarkMode() ? 'dark' : 'light'
  const providedContext = {
    prefersColorScheme: prefersColorScheme,
    colors: ColorScheme[prefersColorScheme],
    fonts: Fonts,
  }

  const components = {
    code: Wrapper,
  }

  return (
    <MDXProvider components={components}>
      <ThemeContext.Provider value={providedContext}>
        <Layout>
          <WebView>
            <MDXRenderer>{mdx.code.body}</MDXRenderer>
          </WebView>
        </Layout>
      </ThemeContext.Provider>
    </MDXProvider>
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
      rawBody
    }
  }
`
