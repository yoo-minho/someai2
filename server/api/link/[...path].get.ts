import { findLinkInfo } from "~/server/data/linkInfo";

export default defineEventHandler(async (event) => {
  const path = getRouterParam(event, "path");
  return findLinkInfo({ path });
});
