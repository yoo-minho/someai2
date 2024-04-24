import type { BaseType, OgType } from "~/types/common";

export const useBase = () =>
  useState<BaseType>("base", () => ({
    url: "",
    step: "Welcome",
    app: "KakaoTalk",
    isMakeUp: false,
  }));
export const useOg = (name = "") =>
  useState<OgType>(`og-${name}`, () => ({
    url: "",
    title: "",
    desc: "",
    thumbUrl: "",
    twitterCard: "",
    favicon: "",
    domain: "",
    name: "",
  }));
