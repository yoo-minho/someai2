import prisma from "./prisma";

export async function saveLinkInfo(data) {
  const {
    path,
    url,
    title,
    desc,
    thumbUrl,
    twitterCard,
    favicon,
    domain,
    siteName,
  } = data;

  return await prisma.linkInfo.create({
    data: {
      path,
      url,
      title,
      desc,
      thumbUrl,
      twitterCard,
      favicon,
      domain,
      siteName,
    },
  });
}
