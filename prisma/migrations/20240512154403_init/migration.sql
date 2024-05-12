-- CreateTable
CREATE TABLE "LinkInfo" (
    "path" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "thumbUrl" TEXT NOT NULL,
    "twitterCard" TEXT NOT NULL,
    "favicon" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "siteName" TEXT NOT NULL,

    CONSTRAINT "LinkInfo_pkey" PRIMARY KEY ("path")
);
