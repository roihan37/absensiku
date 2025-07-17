import { prisma } from '../src/config/prisma'
import { hash } from "../src/utils/bcyriptjs";
import { CreateUserBody } from "../src/types/user";

const adminData = {
    name: 'admin',
    username: 'admin',
    password: hash('tasik123'),
    email: 'admin@gmail.com',
    role: 'admin',
    gender: 'male',
    nip: '828172012818263',
    nuptk: '1231983178121',
    phoneNumber: '0812238237132',
    address: 'jln tentara pelajar',
  } as CreateUserBody

  
async function main() {
    await prisma.user.upsert({
      where: { email: 'admin@gmail.com' },
      update: adminData, 
      create: adminData
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

