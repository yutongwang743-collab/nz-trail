-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sourcePlatform" TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorAvatar" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "rawContent" TEXT NOT NULL,
    "aiSummary" TEXT NOT NULL,
    "screenshots" TEXT NOT NULL,
    "routeId" INTEGER,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "saves" INTEGER NOT NULL DEFAULT 0,
    "comments" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'auto_published',
    "sourcePublishedAt" DATETIME NOT NULL,
    "crawledAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Post_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("aiSummary", "authorAvatar", "authorName", "comments", "crawledAt", "createdAt", "id", "likes", "rawContent", "routeId", "saves", "screenshots", "sourcePlatform", "sourcePublishedAt", "sourceUrl", "status", "title") SELECT "aiSummary", "authorAvatar", "authorName", "comments", "crawledAt", "createdAt", "id", "likes", "rawContent", "routeId", "saves", "screenshots", "sourcePlatform", "sourcePublishedAt", "sourceUrl", "status", "title" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE UNIQUE INDEX "Post_sourceUrl_key" ON "Post"("sourceUrl");
CREATE TABLE "new_RouteDestination" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "routeId" INTEGER NOT NULL,
    "destinationId" INTEGER NOT NULL,
    "dayIndex" INTEGER NOT NULL,
    CONSTRAINT "RouteDestination_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "RouteDestination_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_RouteDestination" ("dayIndex", "destinationId", "id", "routeId") SELECT "dayIndex", "destinationId", "id", "routeId" FROM "RouteDestination";
DROP TABLE "RouteDestination";
ALTER TABLE "new_RouteDestination" RENAME TO "RouteDestination";
CREATE UNIQUE INDEX "RouteDestination_routeId_destinationId_dayIndex_key" ON "RouteDestination"("routeId", "destinationId", "dayIndex");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
