import { parse } from "node-html-parser";

export async function callHtml() {
  const { data } = await useFetch<string>("https://www.npmjs.com/");
  const root = parse(data.value);

  const getContent = (name: string) =>
    root.querySelector(`meta[property=og:${name}]`)?.getAttribute("content");

  const ogTitle = getContent("title");
  const ogDescription = getContent("description");
  const ogUrl = getContent("url");
  const ogImage = getContent("image");
  return { title: ogTitle, desc: ogDescription, url: ogUrl, image: ogImage };
}
