export const env = {
  ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "dev-access-secret",
  REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "dev-refresh-secret",
};
