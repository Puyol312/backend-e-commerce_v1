import { algoliasearch } from "algoliasearch";

if (!process.env.ALGOLIA_APPLICATION_ID) { 
  throw new Error("ALGOLIA_APPLICATION_ID is not defined in .env");
}
if (!process.env.ALGOLIA_API_KEY) { 
  throw new Error("ALGOLIA_API_KEY is not defined in .env");
}

const client = algoliasearch(process.env.ALGOLIA_APPLICATION_ID, process.env.ALGOLIA_API_KEY);

export { client }