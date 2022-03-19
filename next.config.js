/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
const withImages = require("next-images");
module.exports = withImages();

module.exports = {
  images: {
    disableStaticImages: true,
  },
};
module.exports = {
  images: {
    formats: ["image/png", "image/jpg"],
  },
};
