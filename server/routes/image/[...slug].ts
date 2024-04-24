import { readFile } from 'fs/promises';

export default defineEventHandler(async (event) => {
  const {slug} = getRouterParams(event);
  const imageBuffer = await readFile(`./downloads/${slug}`);
  return imageBuffer;
});