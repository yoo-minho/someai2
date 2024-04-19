import ogs from "open-graph-scraper";
import { parse } from "node-html-parser";


export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  let { url } = body;

  if (String(url).startsWith('https://blog.naver.com/')){
    console.log("String(url).replace('https://blog.naver.com/', '')", String(url).replace('https://blog.naver.com/', ''))
    const params = String(url).replace('https://blog.naver.com/', '').split('/');
    const blogId = params[0] ?? '';
    const logNo = params[1] ?? '';
    const path = Object.entries({blogId, logNo}).filter(([k,v]) => !!v).map(([k,v]) => `${k}=${v}`).join('&');
    url = `https://blog.naver.com/PostView.naver?${path}`;
  }

  //https://blog.naver.com/PostView.naver?blogId=ar0717&logNo=223333940871

  const userAgent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36";
  try {
    const { error, result, html } = await ogs({
      url,
      fetchOptions: { headers: { "user-agent": userAgent } },
    });

    if (html) {
      const root = parse(html);
      console.log("xxxxx", root.querySelectorAll("img").length);
      root.querySelectorAll("img[src]")?.forEach((image) => {
        console.log(image.getAttribute("src"));
      });
    }

    const {
      ogUrl,
      ogTitle,
      ogDescription,
      twitterCard,
      twitterUrl,
      twitterTitle,
      twitterDescription,
      ogSiteName,
      ogImage,
      twitterImage,
      favicon,
      requestUrl,
    } = result;

    const response = {
      url: ogUrl || twitterUrl,
      title: ogTitle || twitterTitle,
      desc: ogDescription || twitterDescription,
      thumbUrl: decodeURIComponent(
        ogImage?.[0].url || twitterImage?.[0].url || ""
      ).replace(
        "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=",
        ""
      ),
      twitterCard,
      favicon,
      domain: requestUrl?.replace(/(https:\/\/|http:\/\/)/, ""),
      name: ogSiteName,
    };

    console.log({ response });

    return response;
  } catch (e: any) {
    const { error, result } = e;
    if (error) {
      console.log(result);
      if (result.error === "Page not found") {
        setResponseStatus(event, 404);
        return result;
      }
    }
    throw e;
  }
});
