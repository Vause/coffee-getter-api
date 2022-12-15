import got from 'got';

export async function getSitemap(url) {
    const result = await got(url);
    return result.body;
}