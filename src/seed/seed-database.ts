import prisma from "../lib/prisma";

import { initialData } from "./seed";

async function main() {
  // Delete all data
  await Promise.all([
    await prisma.productImage.deleteMany(),
    await prisma.product.deleteMany(),
    await prisma.category.deleteMany(),
  ]);

  console.log("Seed executed!");
}

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();
