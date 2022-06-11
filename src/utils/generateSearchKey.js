import unicodeNormalizer from "./unicodeNormalizer";

export default function generateSearchKey(str) {
  str = unicodeNormalizer(str);

  const res = [];
  const words = str.split(" ");
  for (let i = 0; i < words.length; i++) {
    for (let j = 1; j <= words.length; j++) {
      const slice = words.slice(i, j);
      if (slice.length) res.push(slice.join(" "));
    }
  }
  for (let word of res) {
    for (let i in word) {
      res.push(word.slice(0, i));
    }
  }

  return [...new Set(res)].filter(word => word);
}
