export type AppType = "KakaoTalk" | "Facebook" | "Slack" | "Twitter";
export type StepType = "Welcome" | "Preview" | "Styling" | "Submit";
export type BaseType = {
  url: string;
  step: StepType;
  app: AppType;
  isMakeUp: boolean;
};
export type OgType = {
  url: string;
  title: string;
  desc: string;
  thumbUrl: string;
  newThumbUrl: string;
  twitterCard: string;
  favicon: string;
  domain: string;
  siteName: string;
};
