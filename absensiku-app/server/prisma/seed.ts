import { prisma } from '../src/config/prisma';
import { hash } from '../src/utils/bcyriptjs';
import { faker } from '@faker-js/faker';

async function main() {
  // === ADMIN ===
  await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      name: 'Admin User',
      username: 'admin',
      password: await hash('tasik123'),
      email: 'admin@gmail.com',
      role: 'admin',
      gender: 'male',
      phoneNumber: '0812238237132',
      address: 'Jl. Tentara Pelajar',
      admin: {
        create: {
          nip: '19851231',
          nuptk: '100200300',
        },
      },
    },
  });
  console.log('✅ Admin seeded!');

  // === TEACHERS ===
  for (let i = 1; i <= 5; i++) {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    await prisma.user.create({
      data: {
        name,
        username: faker.internet.userName({ firstName: name.split(' ')[0] }),
        password: await hash('password123'),
        email,
        role: 'teacher',
        gender: faker.person.sexType(),
        phoneNumber: '08##########',
        address: faker.location.streetAddress(),
        teacher: {
          create: {
            nip: faker.string.alphanumeric(10),
            nuptk: faker.string.alphanumeric(10),
          },
        },
      },
    });
    console.log(`✅ Teacher ${i} seeded!`);
  }

  // === CLASSES ===
  for (let i = 1; i <= 3; i++) {
    await prisma.class.create({
      data: {
        name: `Class ${i}`,
        status: 'active',
      },
    });
  }
  console.log('✅ Classes seeded!');

  // === STUDENTS ===
  const classes = await prisma.class.findMany();

  let studentCount = 1;
  for (const kelas of classes) {
    for (let j = 1; j <= 10; j++) {
      const name = faker.person.fullName();
      const email = faker.internet.email();
      await prisma.user.create({
        data: {
          name,
          username: faker.internet.userName({ firstName: name.split(' ')[0] }),
          password: await hash('student123'),
          email,
          role: 'student',
          gender: studentCount % 2 === 0 ? 'male' : 'female',
          phoneNumber: '08##########',
          address: faker.location.streetAddress(),
          student: {
            create: {
              classId: kelas.id,
              nis: `NIS${studentCount}A`,
              nisn: `NISN${studentCount}B`,
              status: 'active',
            },
          },
        },
      });
      console.log(`✅ Student ${studentCount} seeded!`);
      studentCount++;
    }
  }
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