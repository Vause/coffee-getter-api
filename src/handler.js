import { url } from './config.js';
import getSitemap from './caller.js';
import xmlToJson from './parser.js';
import { nonCoffeeStrings } from './constants.js';
import { error } from './logger.js';

const getProductInfo = (element) => ({
  imageInfo: element['image:image'],
  siteLocation: element.loc,
});

const getActiveProductInfo = (jsonSitemap) => jsonSitemap.urlset.url.map((e) => getProductInfo(e)).filter((x) => x.imageInfo);

const getStructuredProductData = (element) => ({
  location: element.siteLocation,
  description: element.imageInfo['image:title'],
  image: element.imageInfo['image:loc'],
});

const filterOutNonCoffees = (data) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const s of nonCoffeeStrings) {
    // eslint-disable-next-line no-param-reassign
    data = data.filter((a) => a.description.toUpperCase().indexOf(s.toUpperCase()) === -1);
  }
  return data;
};

export default async function handler() {
  try {
    const sitemapData = await getSitemap(url);
    const parsedJson = xmlToJson(sitemapData);
    const productInfo = getActiveProductInfo(parsedJson);

    const structuredProductInfo = productInfo.map((e) => getStructuredProductData(e));

    return filterOutNonCoffees(structuredProductInfo);
  } catch (e) {
    error(e);
    throw new Error(`Error getting coffee data ${e}`);
  }
}
