/** @format */

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
});

const data = [
  {
    email: "udin@mail.com",
    password: "$2b$10$pdGEAn.G2ocUQNpaPKK6HOsnuLgytgyO0GEY1sLcxHyPrpxVAMlf2",
    first_name: "udin",
    last_name: "dong",
    gender: "male",
    avatar_url:
      "https://www.bmw.co.id/content/dam/bmw/common/all-models/m-series/m3-sedan/2023/highlights/bmw-3-series-cs-m-automobiles-sp-desktop.jpg",
    id: 1,
    role: "user",
  },
  {
    email: "admin@mail.com",
    password: "$2b$10$pdGEAn.G2ocUQNpaPKK6HOsnuLgytgyO0GEY1sLcxHyPrpxVAMlf2",
    first_name: "admin",
    last_name: "",
    id: 2,
    role: "admin",
    avatar_url: "",
    products: {
      create: [
        {
          id: 1,
          product_name: "Nike Air Force 1 '07 Low White Swoosh Panda",
          image_url:
            "https://d5ibtax54de3q.cloudfront.net/eyJidWNrZXQiOiJraWNrYXZlbnVlLWFzc2V0cyIsImtleSI6InByb2R1Y3RzLzI2MjYzL2E4NGFlOGFiNTcwYzZlODRjZWEzMDI1OGY2ZTAwMTI5LnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NDAwfSwid2VicCI6eyJxdWFsaXR5Ijo1MH19fQ==",
          price: 1570000,
          description: "",
        },

        {
          id: 2,
          product_name: "Nike Dunk Low Grey Fo",
          image_url:
            "https://d5ibtax54de3q.cloudfront.net/eyJidWNrZXQiOiJraWNrYXZlbnVlLWFzc2V0cyIsImtleSI6InByb2R1Y3RzLzQyMTgzLzQ5NDRkZGZhOTdmODQxNTg1NjU5ODhiNGNiOWMzNzRmLmpwZWciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjQwMH0sIndlYnAiOnsicXVhbGl0eSI6NTB9fX0=",
          price: 1550000,
          description: "",
        },
        {
          id: 3,
          product_name: "Nike Dunk Low Polar Blue",
          image_url:
            "https://d5ibtax54de3q.cloudfront.net/eyJidWNrZXQiOiJraWNrYXZlbnVlLWFzc2V0cyIsImtleSI6InByb2R1Y3RzLzQyMTgzLzQ5NDRkZGZhOTdmODQxNTg1NjU5ODhiNGNiOWMzNzRmLmpwZWciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjQwMH0sIndlYnAiOnsicXVhbGl0eSI6NTB9fX0=",
          price: 1450000,
          description: "",
        },
        {
          id: 4,
          product_name: "Nike P-6000 Light Iron Ore",
          image_url:
            "https://d5ibtax54de3q.cloudfront.net/eyJidWNrZXQiOiJraWNrYXZlbnVlLWFzc2V0cyIsImtleSI6InByb2R1Y3RzLzcyODg5LzQ1ZDZjM2RjOTEzNTY3NjEyYjcwZjNlZGJiMzk1YzAwLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MTQwMH19fQ==",
          price: 2050000,
          description: "",
        },
        {
          id: 5,
          product_name: "Nike SB Dunk Low The Powerpuff Girls Bubbles",
          image_url:
            "https://d5ibtax54de3q.cloudfront.net/eyJidWNrZXQiOiJraWNrYXZlbnVlLWFzc2V0cyIsImtleSI6InByb2R1Y3RzLzc3MjE3LzMzZjBkYmNlNGQ3YTc4OTQyMzllOTU1ZTgzOWE0OGNkLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MTQwMH19fQ==",
          price: 4950000,
          description: "",
        },
      ],
    },
  },
];

async function main() {
  try {
    data.map(async (user) => {
      const newUser = await prisma.user.create({
        data: user,
      });
      console.log(`Created user with id: ${newUser.id}`);
    });
    console.log(`Seeding finished.`);
  } catch (error) {
    console.log(error);
  }
}

main()
  .then(() => {
    prisma.$disconnect;
  })
  .catch((err) => {
    console.log(err);
    prisma.$disconnect;
    process.exit(1);
  });
