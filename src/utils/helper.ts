import { decode, encode } from "js-base64";
import { v4 as uuidv4 } from "uuid";

export const slugify = (text: string): string => {
  const uuid = uuidv4().replace(/\s+/g, "").slice(0, 4);

  const slug = text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

  return `${slug}-${uuid}`;
};

export function encodeState(data: any): string {
  return encode(JSON.stringify(data));
}

export function decodeState(data: string): any {
  return JSON.parse(decode(data));
}
