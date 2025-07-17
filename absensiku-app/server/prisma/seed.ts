import { prisma } from "../db/config";

async function main() {
    await prisma.user.upsert(
        {
            create: {
                name: 'admin',
                username: 'admin',
                password: 'tasik123',
                email: 'admin@gmail.com',
                role: 'admin',
                gender: 'male',
                nip: '828172012818263',
                nuptk: '1231983178121',
                phoneNumber: '0812238237132',
                address: 'jln tentara pelajar',
            },
            where: { email: 'admin@gmail.com' },
            update: {}
        }
    )
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