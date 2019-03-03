/** @jsx jsx */
import React, { useContext } from 'react'
import { jsx, css } from '@emotion/core'
import { mix } from 'polished'
import { Link, StaticQuery, graphql } from 'gatsby'
import { Page, Stack, Icon } from '@nyctalope/react'
import ComponentsMenuItems from './ComponentsMenuItems'
import { ThemeContext } from '@nyctalope/core'

export const Layout = (props) => {
  const { colors } = useContext(ThemeContext)
  document.body.style.backgroundColor = colors.background
  return (
    <Stack
      distribute='space-between'
      alignItems='stretch'
      direction='horizontal'
      css={css`
        min-height: 100%;
      `}
    >
      <LeftPanel {...props} />
      <MainView {...props} />
    </Stack>
  )
}

const MainView = (props) => {
  const { colors, fonts } = useContext(ThemeContext)
  return (
    <div
      css={css`
        margin: 0 auto;
        width: 100%;
        max-width: 900px;
        padding: 30px;
        background: ${colors.background};
      `}
    >
      <Link
        to={`/`}
        css={css`
          float: right;
          margin-left: 10px;
          color: inherit;
          color: ${colors.highlight};
          text-decoration: none;
          font-family: ${fonts.main};
        `}
      >
        {/* Tests */}
      </Link>
      <Link
        to={`/DocIndex/`}
        css={css`
          float: right;
          margin-left: 10px;
          color: inherit;
          text-decoration: none;
          color: ${colors.highlight};
          font-family: ${fonts.main};
        `}
      >
        {/* Documentation */}
      </Link>
      {props.children}
    </div>
  )
}

const LeftPanel = (props) => {
  const components = props.data.allMdx.edges
  const { prefersColorScheme, colors, fonts } = useContext(ThemeContext)
  const iconStyle = {
    width: '16px',
    height: '16px',
    paddingRight: '5px',
    position: 'relative',
    top: '1px',
  }
  return (
    <div
      css={css`
        min-width: 200px;
        min-height: 100%;
        display: flex;
        margin: 0;
        padding: 0;
      `}
    >
      <div
        css={css`
          position: fixed;
          background-color: ${
            prefersColorScheme == 'dark'
              ? mix(0.05, colors.main, colors.background)
              : mix(0.01, colors.main, colors.background)
          };
          min-height: 100%;
          min-width: 200px;
          /* border-right: 1px solid ${colors.lightGrey}; */
          box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
          /* border-right: 1px solid ${mix(
            0.1,
            colors.main,
            colors.background,
          )}; */
        `}
      >
        <Link to={`/`}>
          <h3
            css={css`
              margin-top: 30px;
              display: inline-block;
              font-style: normal;
              font-family: ${fonts.brand};
              font-size: 16px;
              color: ${colors.main};
              margin-left: 20px;
            `}
          >
            <Icon icon='moon' style={iconStyle} />
            {props.data.site.siteMetadata.title}
          </h3>
        </Link>
        <ComponentsMenuItems components={components} />
      </div>
    </div>
  )
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
