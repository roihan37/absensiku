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


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

