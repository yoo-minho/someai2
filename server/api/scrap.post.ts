import ogs from "open-graph-scraper"

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { url } = body;
  const {result} = await ogs({url});
  return result;
})