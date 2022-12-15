import { XMLParser } from 'fast-xml-parser';

export function xmlToJson(xml) {
    const parser = new XMLParser();
    return parser.parse(xml);
}