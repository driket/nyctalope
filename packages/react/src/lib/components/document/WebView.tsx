/** @jsx jsx */
/* eslint-disable import/first */
import React, { useContext, SFC } from 'react';
import { jsx, css } from '@emotion/core';
import { transparentize } from 'polished';
import { ThemeContext } from '@nyctalope/core';

type WebViewProps = {
  children: any;
};
/**
 * WebView
 * @param props WebView props
 */
export const WebView: SFC<WebViewProps> = (props: WebViewProps) => {
  const { colors, fonts } = useContext(ThemeContext);
  return (
    <div
      css={css`
        /* background-color: ${colors.background}; */
        color: ${transparentize(0.22, colors.main)};
        font-family: ${fonts.main};
        padding-bottom: 20px;
        h1, h2 {
            border-bottom: 1px solid ${transparentize(0.9, colors.main)};
            padding-bottom: 5px;
            color: ${transparentize(0.22, colors.main)};
        }
        a {
            color: ${colors.highlight};
            text-decoration: none;
        }
        h2, h3, h4, h5 {
            margin-top: 30px;
        }
        p {
          color: ${transparentize(0.4, colors.main)};
          white-space: initial;
          font-size: 14px;
          line-height: 19px;
          /* letter-spacing: 1px; */
        }
        table {
          width: 100%;
          font-size: 13px;
        }
        table > thead > th {
          border-bottom: 1px solid ${colors.lighterGrey};
          margin-bottom: 20px;
          font-family: ${fonts.heading};
          font-weight: 600;
          /* border-collapse:separate;  */
          /* border-spacing:5px 5px; */
          text-align: left;
          padding-bottom: 10px;
        }
        table > thead {
          margin-bottom: 30px;
        }
        table > tbody  {
          padding-top: 30px;
        }
        table > tbody > tr  > td {
          padding-bottom: 10px;
        }
        table > tbody > tr:first-child > td {
          padding-top: 10px;
          
        }
        table > tfoot > td {
          border-top: 1px solid ${colors.lighterGrey};
          padding-top: 10px;
        }
      `}
    >
      {props.children}
    </div>
  );
};

export default WebView;
