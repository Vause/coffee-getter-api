import { url } from './config.js';
import getSitemap from './caller.js';
import parser from './parser.js';
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

const filterOutNonCoffees = (data) => nonCoffeeStrings.map((s) => data.filter((a) => a.description.toUpperCase().indexOf(s.toUpperCase()) === -1));

export default async function handler() {
  const siteMapData = await getSitemap(url);
  const parsedJson = parser.xmlToJson(siteMapData);
  const productInfo = parsedJson.urlset.url.map((e) => getProductInfo(e));

  const filteredProductInfo = productInfo.filter((x) => x.imageInfo);

  return filterOutNonCoffees(filteredProductInfo.map((e) => getStructuredProductData(e)));
}
