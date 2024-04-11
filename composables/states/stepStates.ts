import type { OgDataType, BaseType } from "~/types/common";

export const useBase = () =>
  useState<BaseType>("base", () => ({
    url: "",
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
  }));
