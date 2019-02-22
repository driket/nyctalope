import React from 'react'
import Layout from '../components/layout/layout'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-mdx'
import { ThemeContext, useDarkMode } from '@nyctalope/react'
import { Page } from '@nyctalope/react'
import { ColorScheme, Fonts } from '@nyctalope/core'

export default ({ data: { mdx } }) => {
  const prefersColorScheme = useDarkMode() ? 'dark' : 'light'
  console.log('prefersColorScheme', prefersColorScheme)
  console.log(
    'ColorScheme[prefersColorScheme]',
    ColorScheme[prefersColorScheme],
  )
  return (
    <ThemeContext.Provider
      value={{
        prefersColorScheme: prefersColorScheme,
        colors: ColorScheme[prefersColorScheme],
        fonts: Fonts,
      }}
    >
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
