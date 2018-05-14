const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const resolvers = {
  Query: {
    feed(parent, args, ctx, info) {
      return ctx.db.query.campaigns(info)
    },
    campaign(parent, { id }, ctx, info) {
      return ctx.db.query.campaign({ where: { id } }, info)
    },
  },
  Mutation: {
    createCampaign(parent, { name, imgUrl, isPublished }, ctx, info) {
      return ctx.db.mutation.createCampaign(
        {
          data: {
            name,
            imgUrl,
            isPublished,
          },
        },
        info,
      )
    },
    deleteCampaign(parent, { id }, ctx, info) {
      return ctx.db.mutation.deleteCampaign({ where: { id } }, info)
    },
    updateCampaign(parent, {id, name, imgUrl, isPublished}, ctx, info) {
      return ctx.db.mutation.updateCampaign(
        {
          data: {
            name,
            imgUrl,
            isPublished
          },
          where: {
            id
          }
        }, info)
    }
  },
  Subscription: {
    campaignAdded: {
      subscribe: async (parent, args, ctx, info) => {
        return  ctx.db.subscription.campaign({}, info)
      }
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql', // the auto-generated GraphQL schema of the Prisma API
      endpoint: 'https://eu1.prisma.sh/bilal-saeed-7b3c8b/campaign/dev', // the endpoint of the Prisma API
      debug: true, // log all GraphQL queries & mutations sent to the Prisma API
      // secret: 'mysecret123', // only needed if specified in `database/prisma.yml`
    }),
  }),
})

server.start(() => console.log('Server is running on http://localhost:4000'))
