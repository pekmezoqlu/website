import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const targets = [
  path.resolve("public/tractors"),
  path.resolve("public/hero.jpg"),
  path.resolve("public/hero2.jpg"),
];

async function convert(input) {
  const output = input.replace(/\.(jpg|jpeg|png)$/i, ".webp");

  await sharp(input)
    .rotate()
    .resize({
      width: 1800,
      height: 1800,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({
      quality: 82,
      effort: 5,
    })
    .toFile(output);

  console.log(`${path.basename(input)} → ${path.basename(output)}`);
}

async function walk(directory) {
  const entries = await readdir(directory);

  for (const entry of entries) {
    const input = path.join(directory, entry);
    const info = await stat(input);

    if (info.isDirectory()) {
      await walk(input);
      continue;
    }

    if (!/\.(jpg|jpeg|png)$/i.test(entry)) continue;

    await convert(input);
  }
}

for (const target of targets) {
  const info = await stat(target);

  if (info.isDirectory()) {
    await walk(target);
  } else {
    await convert(target);
  }
}

console.log("Dönüştürme tamamlandı.");
