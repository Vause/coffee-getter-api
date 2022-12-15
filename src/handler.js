import { url } from './config.js';
import { getSitemap } from './caller.js';
import { xmlToJson } from './parser.js';
import { nonCoffeeStrings } from './constants.js';

const _filterOutNonCoffees = (data) => {
    for (const s of nonCoffeeStrings) {
        data = data.filter((a) => a.description.toUpperCase().indexOf(s.toUpperCase()) === -1);
    }

    return data;
}

export async function handler() {
    const siteMapData = await getSitemap(url);
    const parsedJson = xmlToJson(siteMapData);
    const images = parsedJson.urlset.url.map((e) => e['image:image']);
    const filteredImages = images.filter((a) => a);
    return _filterOutNonCoffees(filteredImages.map((a) => {
        return {
            description: a['image:title'], image: a['image:loc']
        }
    }));
}