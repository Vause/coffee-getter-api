import { url } from './config.js';
import { getSitemap } from './caller.js';
import { xmlToJson } from './parser.js';
import { nonCoffeeStrings } from './constants.js';

const _getProductInfo = (element) => {
    return {
        imageInfo: element['image:image'],
        siteLocation: element.loc
    }
}

const _getStructuredProductData = (element) => {
    return {
        location: element.siteLocation,
        description: element.imageInfo['image:title'],
        image: element.imageInfo['image:loc']
    }
}

const _filterOutNonCoffees = (data) => {
    for (const s of nonCoffeeStrings) {
        data = data.filter((a) => a.description.toUpperCase().indexOf(s.toUpperCase()) === -1);
    }

    return data;
}

export async function handler() {
    const siteMapData = await getSitemap(url);
    const parsedJson = xmlToJson(siteMapData);
    const productInfo = parsedJson.urlset.url.map((e) => {
        return _getProductInfo(e);
    });

    const filteredProductInfo = productInfo.filter((x) => x.imageInfo);

    return _filterOutNonCoffees(filteredProductInfo.map((e) => {
        return _getStructuredProductData(e);
    }));
}