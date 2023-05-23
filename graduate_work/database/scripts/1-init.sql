CREATE TABLE "Categories" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(355) UNIQUE NOT NULL,
    "createdAt" TIMESTAMPTZ,
    "updatedAt" TIMESTAMPTZ
);

CREATE TABLE "Locations" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(355) UNIQUE NOT NULL,
    "createdAt" TIMESTAMPTZ,
    "updatedAt" TIMESTAMPTZ
);
