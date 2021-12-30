// config
import defaultConfig from "./config.default";
import local from "./config.local";
import unittest from "./config.unittest";
import prod from "./config.prod";

export default (() => {
  switch (process_env_NODE_ENV) {
    case "production":
      return Object.assign(defaultConfig, prod);
    case "test":
      return Object.assign(defaultConfig, unittest);
    case "local":
      return Object.assign(defaultConfig, local);
    default:
      return defaultConfig;
  }
})();
