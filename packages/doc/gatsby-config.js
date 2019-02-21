module.exports = {
  siteMetadata: {
    title: `Nyctalope Design System`,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `react-components`,
        path: `${__dirname}/../react/src/components/`,
      },
    },
    // {
    //   resolve: `gatsby-plugin-google-fonts`,
    //   options: {
    //     fonts: [`Comfortaa\:400,700`],
    //   },
    // },
    `gatsby-mdx`,
    `gatsby-plugin-emotion`,
    `gatsby-transformer-json`,
    `gatsby-transformer-react-docgen`,
  ],
}
