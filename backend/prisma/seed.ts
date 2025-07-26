import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Insert 3 cameras
  await prisma.camera.createMany({
    data: [
      { name: 'Shop Floor A', location: 'First Floor' },
      { name: 'Vault', location: 'Basement' },
      { name: 'Entrance', location: 'Main Gate' },
    ]
  });

  const cameraData = await prisma.camera.findMany();
  const types = ['Unauthorised Access', 'Gun Threat', 'Face Recognised'];
  const now = new Date();

  const incidents = [];
  for (let i = 0; i < 12; i++) {
    const start = new Date(now.getTime() - i * 60 * 60 * 1000); // each 1 hour apart
    const end = new Date(start.getTime() + 5 * 60 * 1000); // 5 mins duration
    incidents.push({
      cameraId: cameraData[i % 3].id,
      type: types[i % 3],
      tsStart: start,
      tsEnd: end,
      thumbnailUrl: '/thumbnails/thumb1.jpg',
    });
  }

  await prisma.incident.createMany({ data: incidents });

  console.log('🌱 Seeding complete.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
