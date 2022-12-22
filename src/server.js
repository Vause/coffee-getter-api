import { server as hapiServer } from '@hapi/hapi';
import { info } from './logger.js';
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
  info('Server running on %s', server.info.uri);
}
