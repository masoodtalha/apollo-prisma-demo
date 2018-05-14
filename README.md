# Prisma & Graph.Cool

* To start the server locally
> cd campaign
> yarn dev

#### Deployment to your own Prisma Workspace

> npm i -g prisma
> cd campaign

* Change end points in `prisma.yml` and `src/index.js`, such as https://eu1.prisma.sh/YOUR_WORKSPACE_SLUG/campaign/dev
* prisma deploy
* yarn dev

#### Run React App
> npm start