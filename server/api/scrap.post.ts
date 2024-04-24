import ogs from "open-graph-scraper";
import fs from "node:fs";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  let { url } = body;

  url = inputConverter(url);

  //https://blog.naver.com/dellose/223408421941
  //https://docs.google.com/spreadsheets/d/1P2kL6Y3iu4JyOdeS9afb70GPfIKn8SQlJlLqvFJCboc/edit#gid=296100132
  //https://uminoh.tistory.com/61
  //https://drive.google.com/open?id=19JdqSo_xPuR31oDAXwyVBLaJUfKUpJjx
  //https://drive.google.com/open?id=1ak85WVUWVJr6-8H1yYBY_YwqxTSmL2w0

  const userAgent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36";
  try {
    const { error, result, html } = await ogs({
      url,
      fetchOptions: { headers: { "user-agent": userAgent } },
    });

    // if (html) {
    //   const root = parse(html);
    //   console.log("xxxxx", root.querySelectorAll("img").length);
    //   root.querySelectorAll("img[src]")?.forEach((image) => {
    //     console.log(image.getAttribute("src"));
    //   });
    // }

    console.log({result})

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

    const domain = cutUrlUntilFirstSlash(removeHttpPrefix("" + requestUrl));

    const response = {
      url: ogUrl || twitterUrl,
      title: ogTitle || twitterTitle,
      desc: ogDescription || twitterDescription,
      thumbUrl: await imgFormatter(
        ogImage?.[0].url || twitterImage?.[0].url || ""
      ),
      twitterCard,
      favicon: makeFaviconUrl(domain,""+favicon),
      domain: domain,
      name: ogSiteName,
    };

    // console.log({ response });

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

function inputConverter(url: string) {
  if (String(url).startsWith("https://blog.naver.com/")) {
    const params = String(url)
      .replace("https://blog.naver.com/", "")
      .split("/");
    const blogId = params[0] ?? "";
    const logNo = params[1] ?? "";
    const path = Object.entries({ blogId, logNo })
      .filter(([k, v]) => !!v)
      .map(([k, v]) => `${k}=${v}`)
      .join("&");
    url = `https://blog.naver.com/PostView.naver?${path}`;
  }
  return url;
}

function makeFaviconUrl(domain: string, url: string){
  if(url.startsWith('http')){
    return url;
  }
  return 'https://' + cutUrlUntilFirstSlash(domain) + '/' + url.replace('/', '');
}

async function imgFormatter(imgUrl: string) {
  const _imgUrl = decodeURIComponent(imgUrl).replace(
    "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=",
    ""
  );

  const response = await fetch(_imgUrl);
  const buffer = await response.arrayBuffer();
  const dataBuffer = Buffer.from(buffer);
  fs.writeFileSync('./downloads/xxx.png', dataBuffer);
  return '/image/xxx.png';
}

function cutUrlUntilFirstSlash(url: string) {
  const firstSlashIndex = url.indexOf("/");
  if (firstSlashIndex !== -1) {
    return url.substring(0, firstSlashIndex);
  }
  return url;
}

function removeHttpPrefix(url: string) {
  return url.replace(/(https:\/\/|http:\/\/)/, "");
}
