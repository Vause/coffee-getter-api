import { url } from './config.js';
import getSitemap from './caller.js';
import xmlToJson from './parser.js';
import { nonCoffeeStrings } from './constants.js';

const getProductInfo = (element) => ({
  imageInfo: element['image:image'],
  siteLocation: element.loc,
});

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
  const siteMapData = await getSitemap(url);
  const parsedJson = xmlToJson(siteMapData);
  const productInfo = parsedJson.urlset.url.map((e) => getProductInfo(e));

  const filteredProductInfo = productInfo.filter((x) => x.imageInfo);

  const structuredProductInfo = filteredProductInfo.map((e) => getStructuredProductData(e));

  return filterOutNonCoffees(structuredProductInfo);
}
