import { server as hapiServer } from '@hapi/hapi';
import { coffeesGetRoute } from './route.js';

export default async function start() {
  const server = hapiServer({
    router: {
      isCaseSensitive: false,
    },
    port: 3000,
    host: 'localhost',
  });

  server.route(coffeesGetRoute);

  await server.start();
  console.log('Server running on %s', server.info.uri);
}
