// eslint-disable-next-line import/no-unresolved
import got from 'got';

export default async function getSitemap(url) {
  const result = await got(url);
  return result.body;
}
