const readEnvironmentVariable = (key, defaultValue = undefined) => {
  const value = process.env[key];

  if (value === undefined && defaultValue === undefined) {
    throw new Error(`The environment variable "${key} is missing".`);
  }

  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  return value || defaultValue;
};

/**
 * @returns {import('next').NextConfig}
 */
const nextConfig = () => {
  const PCOMPARATOR_ENV = readEnvironmentVariable("PCOMPARATOR_ENV", "production");

  if (!["development", "test", "staging", "production"].includes(PCOMPARATOR_ENV)) {
    throw new Error(
      `The environment variable "PCOMPARATOR_ENV" should have one the value: "development", "test", "staging", "production". Current value: "${PCOMPARATOR_ENV}"`
    );
  }

  return {
    env: {
      PCOMPARATOR_ENV,
      PCOMPARATOR_API_ENDPOINT: readEnvironmentVariable("PCOMPARATOR_API_ENDPOINT"),
      ALGOLIA_APP_ID: readEnvironmentVariable("ALGOLIA_APP_ID"),
      ALGOLIA_API_KEY: readEnvironmentVariable("ALGOLIA_API_KEY"),
    },
    reactStrictMode: true,
    swcMinify: true,
    compress: true,
    images: {
      domains: ["lh3.googleusercontent.com", "firebasestorage.googleapis.com", "vercel.com"]
    },
  };
};

const withPWA = require("@imbios/next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  scope: "/",
  sw: "service-worker.js"
});

module.exports = withPWA(nextConfig());
