import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  await prisma.user.upsert({
    where: { email: "admin@gmail.com" },
    update: {},
    create: {
      email: "admin@gmail.com",
      username: "Admin",
      displayName: "Admin",
      passwordHash:
        "$argon2id$v=19$m=19456,t=2,p=1$oznZqojvODjKAsIjVpbpDg$EWo0dzHOTygfnJLA64Nb/d0qvw96RsqfOUBaHpO65y0",
      role: "ADMIN",
    },
  });
  await prisma.user.upsert({
    where: { email: "pusheen@gmail.com" },
    update: {},
    create: {
      email: "pusheen@gmail.com",
      username: "Pusheen",
      displayName: "Pusheen",
      passwordHash:
        "$argon2id$v=19$m=19456,t=2,p=1$oznZqojvODjKAsIjVpbpDg$EWo0dzHOTygfnJLA64Nb/d0qvw96RsqfOUBaHpO65y0",
    },
  });
  // category
  const category = await prisma.category.create({
    data: {
      name: "tea",
    },
  });

  //  products
  await prisma.product.createMany({
    data: [
      {
        image_url:
          "https://utfs.io/f/cb1478b9-5622-493f-89d1-9f91d501ead2-bo2e61.jpg",
        name: "Earl Grey Tea",
        description:
          "Earl Grey is a black tea blend flavored with the oil of bergamot, a fragrant citrus fruit. Known for its distinctive aroma and floral notes, Earl Grey is a popular choice for tea drinkers seeking a rich, smooth flavor with a hint of citrus. Perfect for a morning boost or afternoon relaxation.",
        price: 12.99,
        stock: 80,
        category_id: category.id,
      },
      {
        image_url:
          "https://utfs.io/f/b00a3ad2-dd7f-47f1-8a0f-f78e43be3578-pcjpat.jpg",
        name: "Chamomile Herbal Tea",
        description:
          "Chamomile tea is a naturally caffeine-free herbal tea made from the dried flowers of the chamomile plant. This calming tea is known for its gentle, floral taste and soothing properties, making it a favorite bedtime beverage to help promote relaxation and restful sleep.",
        price: 7.99,
        stock: 150,
        category_id: category.id,
      },
      {
        image_url:
          "https://utfs.io/f/dfdd8793-b754-486f-abfb-f57daf8ac322-u3hq3a.jpg",
        name: "Matcha Green Tea Powder",
        description:
          "Matcha is a finely ground powder of specially grown and processed green tea leaves. Originating from Japan, it is known for its vibrant green color and earthy, umami flavor. Matcha is packed with antioxidants and provides a clean, focused energy boost without the crash of coffee.",
        price: 18.99,
        stock: 50,
        category_id: category.id,
      },
      {
        image_url:
          "https://utfs.io/f/cc9ce40b-81c2-48d2-9ef4-68fa55995965-mn0z8e.jpg",
        name: "Jasmine Green Tea",
        description:
          "Jasmine tea is a blend of high-quality green tea and fresh jasmine blossoms, infusing the leaves with a delicate floral aroma. The light, refreshing flavor makes it a great choice for both hot and iced tea. Known for its calming effects, Jasmine Green Tea is perfect for unwinding after a long day.",
        price: 10.99,
        stock: 120,
        category_id: category.id,
      },
      {
        image_url:
          "https://utfs.io/f/571f7e23-65ba-48e1-88aa-5d5f8143ff1c-wrb1cn.jpg",
        name: "Organic Peppermint Tea",
        description:
          "Organic Peppermint Tea is a refreshing and naturally caffeine-free herbal tea made from premium peppermint leaves. Its cool, minty flavor is invigorating, making it perfect for aiding digestion, soothing headaches, or simply enjoying as an after-meal treat.",
        price: 8.49,
        stock: 200,
        category_id: category.id,
      },
      {
        image_url:
          "https://utfs.io/f/0878a62a-3b17-4611-9cae-25556ae1e849-c8lwzf.jpg",
        name: "English Breakfast Tea",
        description:
          "English Breakfast is a classic blend of robust black teas, offering a full-bodied, malty flavor that pairs perfectly with milk and sugar. This traditional tea is a popular choice for starting the day or enjoying during a relaxing afternoon break.",
        price: 9.99,
        stock: 140,
        category_id: category.id,
      },
      {
        image_url:
          "https://utfs.io/f/01f8b3aa-95db-4f59-a1ef-71ea676c1da4-yqe12e.jpg",
        name: "Hibiscus Tea",
        description:
          "Hibiscus Tea is a tart and tangy herbal tea made from dried hibiscus flowers. Its vibrant red color and refreshing taste make it a popular choice for iced tea. Hibiscus is also known for its health benefits, including supporting heart health and lowering blood pressure.",
        price: 6.99,
        stock: 90,
        category_id: category.id,
      },
      {
        image_url:
          "https://utfs.io/f/b7a94a07-c8b9-4de9-96c9-dbecc6e759b9-dhfgi4.jpg",
        name: "Oolong Tea",
        description:
          "Oolong tea is a traditional Chinese tea that falls between green and black tea in terms of oxidation. Its rich and complex flavor ranges from fruity and floral to roasted and nutty, offering a dynamic tea-drinking experience. Oolong is often enjoyed by tea connoisseurs seeking a balanced, full-bodied brew.",
        price: 14.99,
        stock: 70,
        category_id: category.id,
      },
      {
        image_url:
          "https://utfs.io/f/86133c02-55ed-4826-9949-9e878580919b-v3dpn4.jpg",
        name: "Rooibos Red Tea",
        description:
          "Rooibos is a naturally caffeine-free herbal tea from South Africa, known for its rich, earthy flavor and deep red color. It's packed with antioxidants and has a smooth, slightly sweet taste that is perfect on its own or with a splash of milk.",
        price: 11.49,
        stock: 110,
        category_id: category.id,
      },
      {
        image_url:
          "https://utfs.io/f/41f0ce53-d699-49eb-91ae-834c47b1dca0-6zrr9e.jpg",
        name: "White Peony Tea",
        description:
          "White Peony Tea (Bai Mu Dan) is a delicate, lightly oxidized white tea with a subtle floral flavor. Made from young tea leaves and silvery buds, it offers a smooth, refreshing taste with hints of sweetness. White Peony is prized for its high levels of antioxidants and calming properties.",
        price: 16.99,
        stock: 60,
        category_id: category.id,
      },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
