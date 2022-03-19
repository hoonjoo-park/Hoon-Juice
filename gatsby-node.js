/* eslint-disable @typescript-eslint/restrict-plus-operands, @typescript-eslint/no-var-requires */
const path = require('path');
const _ = require('lodash');
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  switch (node.internal.type) {
    case 'MarkdownRemark': {
      const { layout, primaryTag } = node.frontmatter;
      const value = createFilePath({ node, getNode });
      const [month, day, year] = new Date(node.frontmatter.date)
        .toLocaleDateString('en-EN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .split('/');

      const endPoint = value.slice(0, value.length - 1).lastIndexOf('/');
      const slug = value.slice(endPoint).replace(/\/$/, '');
      const url = `${year}/${month}/${day}${slug}`;

      // Used to generate URL to view this content.
      createNodeField({
        node,
        name: 'slug',
        value: url,
      });

      // Used to determine a page layout.
      createNodeField({
        node,
        name: 'layout',
        value: layout || '',
      });
    }
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allMarkdownRemark(
        limit: 2000
        sort: { fields: [frontmatter___date], order: ASC }
        filter: { frontmatter: { draft: { ne: true } } }
      ) {
        edges {
          node {
            excerpt
            frontmatter {
              title
              category
              date
              draft
              excerpt
              thumbnail
              author {
                name
                bio
                avatar {
                  childImageSharp {
                    gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
                  }
                }
              }
            }
            fields {
              layout
              slug
            }
          }
        }
      }
      allAuthorYaml {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  `);

  if (result.errors) {
    console.error(result.errors);
    throw new Error(result.errors);
  }

  // Create post pages
  const posts = result.data.allMarkdownRemark.edges;
  // Create paginated index
  // TODO: new pagination
  const postsPerPage = 1000;
  const numPages = Math.ceil(posts.length / postsPerPage);

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? '/' : `/${i + 1}`,
      component: path.resolve('./src/templates/index.tsx'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });

  posts.forEach(({ node }, index) => {
    const { slug, layout } = node.fields;
    const prev = index === 0 ? null : posts[index - 1].node;
    const next = index === posts.length - 1 ? null : posts[index + 1].node;

    createPage({
      path: slug,
      component: path.resolve(`./src/templates/${layout || 'post'}.tsx`),
      context: {
        // Data passed to context is available in page queries as GraphQL variables.
        slug,
        prev,
        next,
        category: node.frontmatter.category ? node.frontmatter.category : '',
      },
    });
  });

  // Create posts pages
  const postsTemplate = path.resolve('./src/templates/posts.tsx');
  const categorySet = new Set();
  posts.forEach(post => {
    categorySet.add(post.node.frontmatter.category);
  });
  const categories = [...categorySet];
  posts.forEach(post => {
    createPage({
      path: '/posts',
      component: postsTemplate,
      context: {
        slug: post.node.fields.slug,
      },
    });
  });
  const countCategories = categories.reduce((prev, curr) => {
    prev[curr] = (prev[curr] || 0) + 1;
    return prev;
  }, {});

  const allCategories = Object.keys(countCategories);
  allCategories.forEach((cat, i) => {
    const link = `/posts`;
    Array.from({
      length: Math.ceil(countCategories[cat] / postsPerPage),
    }).forEach((_, i) => {
      createPage({
        path: i === 0 ? link : `${link}/page/${i + 1}`,
        component: postsTemplate,
        context: {
          allCategories: allCategories,
          category: cat,
          limit: postsPerPage,
          skip: i * postsPerPage,
          currentPage: i + 1,
          numPages: Math.ceil(countCategories[cat] / postsPerPage),
        },
      });
    });
  });

  // Create author pages
  const authorTemplate = path.resolve('./src/templates/author.tsx');
  result.data.allAuthorYaml.edges.forEach(edge => {
    createPage({
      path: `/author/${_.kebabCase(edge.node.name)}/`,
      component: authorTemplate,
      context: {
        author: edge.node.name,
      },
    });
  });
};

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  // adds sourcemaps for tsx in dev mode
  if (stage === 'develop' || stage === 'develop-html') {
    actions.setWebpackConfig({
      devtool: 'eval-source-map',
    });
  }
};
