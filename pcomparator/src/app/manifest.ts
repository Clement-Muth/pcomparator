import type { MetadataRoute } from "next";

export default (): MetadataRoute.Manifest => {
  return {
    name: "PComparator",
    short_name: "PComparator",
    description: "PComparator is the price comparator for foods, cosmetic and more",
    start_url: "/",
    display: "standalone",
    background_color: "#000",
    theme_color: "#000",
    orientation: "portrait",
    dir: "ltr",
    lang: "en",
    screenshots: [
      {
        src: "/static/logo.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
    icons: [
      {
        src: "/static/logo.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
};
