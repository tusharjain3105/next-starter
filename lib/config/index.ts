import brandConfig from "./brand.config";
import googleConfig from "./google.config";
import navigationConfig from "./navigation.config";
import routesConfig from "./routes.config";

const env = process.env.NODE_STATIC_NODE_ENV ?? process.env.NODE_ENV;

const config = {
  env,
  isProd: env === "production",
  isDev: env === "development",
  isTest: env === "test",
  serverUrl: process.env.PUBLIC_STATIC_SERVER_URL,
  navigation: navigationConfig,
  brand: brandConfig,
  routes: routesConfig,
  google: googleConfig,
} as const;

export default config;
