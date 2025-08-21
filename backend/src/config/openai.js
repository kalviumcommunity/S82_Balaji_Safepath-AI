import OpenAI from "openai";
import { env } from "./env.js";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
