const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require(`path`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  //   console.log('node', node)
  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode, basePath: `lib/components` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
  if (node.internal.type === `ComponentMetadata`) {
    const slug = createFilePath({ node, getNode, basePath: `lib/components` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const { createPage } = actions;
  return graphql(`
    {
      allMdx {
        edges {
          node {
            fields {
              slug
            }
            parent {
              __typename
            }
          }
        }
      }
    }
  `).then((result) => {
    result.data.allMdx.edges.forEach(({ node }) => {
      if (node.parent.__typename != 'File') {
        return;
      }
      console.log('create page for', node.fields.slug);
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/component-page.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.fields.slug,
        },
      });
    });
  });
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: {
      fs: 'empty',
      child_process: 'empty',
      net: 'empty',
      tls: 'empty',
    },
  });
};

// exports.onCreateWebPackConfig = ({ actions, loader, getConfig}) => {
//     // externals: ['tls', 'net', 'fs'],
// }
