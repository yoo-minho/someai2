import { saveLinkInfo } from "../../data/linkInfo";
import fs from "node:fs";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { path, thumbUrl } = body;
  const newThumbUrl = await imgFormatter(path, thumbUrl);
  console.log({ thumbUrl, newThumbUrl });
  await saveLinkInfo({ ...body, thumbUrl: newThumbUrl });
});

async function imgFormatter(path: string, thumbUrl: string) {
  try {
    const response = await fetch(new URL("http://localhost:3000" + thumbUrl));
    const buffer = await response.arrayBuffer();
    const dataBuffer = Buffer.from(buffer);
    fs.writeFileSync(`./downloads/${path}.png`, dataBuffer);
    return `/image/${path}.png`;
  } catch (e) {
    console.error("imgFormatter", e);
    return thumbUrl;
  }
}
