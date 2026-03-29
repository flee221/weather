import asciify from "asciify-image";

function stripANSI(str) {
  return str.replace(/\x1B\[[0-9;]*m/g, "");
}
export async function generateAscii(imageUrl) {
  const ascii = await asciify(imageUrl, {
    fit: "box",
    width: 50,
    color: true,
  });
  return stripANSI(ascii);
}
