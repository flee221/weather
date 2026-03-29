import asciify from "asciify-image";

function stripANSI(str) {
  return str.replace(/\x1B\[[0-9;]*m/g, "");
}
export async function generateAscii(imageUrl, options = {}) {
  const width = options.width;
  const ascii = await asciify(imageUrl, {
    fit: "box",
    width,
    color: false,
  });
  return stripANSI(ascii);
}
