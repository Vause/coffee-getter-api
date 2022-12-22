import { XMLParser } from 'fast-xml-parser';

export default function xmlToJson(xml) {
  const parser = new XMLParser();
  return parser.parse(xml);
}
