import { encode } from "gpt-tokenizer";

/**
 * Count tokens in a given string
 */
export function countTokens(text) {
  if (!text) return 0;
  return encode(text).length;
}

/**
 * Truncate text to fit within a max token limit
 */
export function truncateToTokens(text, maxTokens = 512) {
  if (!text) return "";
  const tokens = encode(text);
  if (tokens.length <= maxTokens) return text;

  // If text is too long, truncate
  const truncatedTokens = tokens.slice(0, maxTokens);
  return new TextDecoder().decode(Uint8Array.from(truncatedTokens));
}
