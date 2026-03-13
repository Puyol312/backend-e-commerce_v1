import Airtable from "airtable";

if (!process.env.AIRTABLE_API_KEY) { 
  throw new Error("AIRTABLE_API_KEY is not defined in .env");
}
if (!process.env.AIRTABLE_BASE_ID) { 
  throw new Error("AIRTABLE_BASE_ID is not defined in .env");
}

export const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID);