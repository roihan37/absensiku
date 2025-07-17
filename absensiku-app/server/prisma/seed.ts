import { prisma } from '../src/config/prisma'
import { hash } from "../src/utils/bcyriptjs";
import { User } from "../src/types/user";

const userData = {
  name: 'admin',
  username: 'admin',
  password: hash('tasik123'),
  email: 'admin@gmail.com',
  role: 'admin',
  gender: 'male',
  phoneNumber: '0812238237132',
  address: 'jln tentara pelajar',
} as User


async function main() {
  // === ADMIN ===
  await prisma.user.upsert({
    where: { email: 'admin@gmail.com'},
    update: userData,
    create: userData
  })
  console.log('✅ Admin seeded!')
}

// async function main() {
  
//   const existingUser = await prisma.user.findUnique({
//     where: { email: 'admin@gmail.com' },
//   });

//   if (existingUser) {
//     console.log('⚠️ Admin already exists. Skipping creation.');
//     return;
//   }

//   const user = await prisma.user.create({
//     data: {
//       name: 'admin',
//       username: 'admin',
//       password: hash('tasik123'),
//       email: 'admin@gmail.com',
//       role: 'admin',
//       gender: 'male',
//       phoneNumber: '0812238237132',
//       address: 'jln tentara pelajar',
//       admin: {
//         create: {
//           nip: '989801920821',
//           nuptk: '102918391831082',
//         },
//       },
//     },
//     include: {
//       admin: true, // optional: to return with admin relation
//     },
//   });

//   console.log('✅ Admin seeded:', user);
// }

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

