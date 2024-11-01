import * as yaml from "yaml";
import { z } from "zod";
import { createDocument, extendZodWithOpenApi } from "zod-openapi";
import { components, paths } from "pcomparator/src/app/api/documentation";

extendZodWithOpenApi(z);

const document = createDocument({
  openapi: "3.1.0",
  info: {
    title: "Price Comparator API",
    description: "An API for comparing prices of foods, cosmetics and more.",
    version: "1.0.0"
  },
  paths: paths,
  servers: [
    {
      url: "https://pcomparator.vercel.app/api",
      description: "The production server."
    }
  ],
  components: {
    schemas: {
      components
    }
  }
});

console.log(yaml.stringify(document));
