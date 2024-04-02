import ogs from "open-graph-scraper"

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { url } = body;
  const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36';

  console.log({url});
  try {
    const {error, result, html} = await ogs({url, fetchOptions: { headers: { 'user-agent': userAgent } } });
    console.log({error, result, html});
    return result;
  } catch(e){
  console.log('qwe', {e})
  }   
})