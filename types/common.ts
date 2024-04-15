export type AppType = "KakaoTalk" | "Facebook" | "Slack" | "Twitter";
export type BaseType = {
  url: string;
  app: AppType;
  isMakeUp: boolean;
};
export type OgType = {
  url: string;
  title: string;
  desc: string;
  thumbUrl: string;
  twitterCard: "summary_large_image" | "";
  favicon: string;
  domain: string;
  name: string;
};
export type OgDataType = {
  ogUrl: string;
  ogTitle: string;
  ogDescription: string;
  twitterCard: string;
  twitterUrl: string;
  twitterTitle: string;
  twitterDescription: string;
  ogSiteName: string;
  ogImage: [{ url: string }];
  twitterImage: [{ url: string }];
  favicon: string;
  requestUrl: string;
};
