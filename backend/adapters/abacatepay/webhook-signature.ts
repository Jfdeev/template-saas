import crypto from "node:crypto";

function safeEqual(a: string, b: string) {
  const A = Buffer.from(a);
  const B = Buffer.from(b);
  return A.length === B.length && crypto.timingSafeEqual(A, B);
}

export function verifyAbacatepayHmac(rawBody: string, signatureFromHeader: string, key: string) {
  const expected = crypto.createHmac("sha256", key).update(Buffer.from(rawBody, "utf8")).digest("base64");
  return safeEqual(expected, signatureFromHeader);
}
