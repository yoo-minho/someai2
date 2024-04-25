export type AppType = "KakaoTalk" | "Facebook" | "Slack" | "Twitter";
export type StepType = "Welcome" | "Preview" | "Styling";
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
  twitterCard: "summary_large_image" | "";
  favicon: string;
  domain: string;
  name: string;
};
