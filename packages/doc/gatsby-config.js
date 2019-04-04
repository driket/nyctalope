module.exports = {
  siteMetadata: {
    title: `Nyctalope`,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `react-components`,
        path: `${__dirname}/../react/src/lib/components/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `doc-pages`,
        path: `${__dirname}/src/content/`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Comfortaa\:300,400,700`],
      },
    },
    `gatsby-mdx`,
    `gatsby-transformer-json`,
    `gatsby-transformer-remark`,
    `gatsby-transformer-react-docgen`,
    `gatsby-plugin-emotion`,
  ],
}
