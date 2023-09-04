import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {

  await prisma.category.upsert({
    where: { categoryId: 1 },
    update: {},
    create: {
      title: 'Поиск',
      tasks: {
        create: [
          {
            title: 'Найти кота',
            description: 'Найти пропавшего кота, серого цвета',
            price: 99.9,
            deadline: new Date(2023, 10, 1),
            creatorId: '13',
            city: 'Moscow'
          }
        ]
      },
    }
  });

  await prisma.category.upsert({
    where: { categoryId: 2 },
    update: {},
    create: {
      title: ' Уборка',
      tasks: {
        create: [
          {
            title: 'Убрать в квартире',
            description: 'Полный клининг квартиры',
            price: 10,
            deadline: new Date(2023, 8, 8),
            creatorId: '15',
            city: 'Moscow',
            comments: {
              create: [
                {
                  message: 'За эти гроши сами шваброй мохайте',
                  userId: '14',
                },
                {
                  message: 'Чистящие средства свои????',
                  userId: '114',
                },
              ]
            }
          }
        ]
      },
    }
  });

  await prisma.category.upsert({
    where: { categoryId: 3 },
    update: {},
    create: {
      title: 'Дельфинопластика',
      tasks: {
        create: [
          {
            title: 'Провести полную дельфинопластику кота',
            description: 'Провести полную дельфинопластику кота, желательно хвост побольше. Надеюсь найдуться специалисты',
            price: 12000,
            deadline: new Date(2023, 10, 1),
            city: 'SaintPetersburg',
            creatorId: '155',
            executorId: '133',
            review: {
              create: {
                message: 'Идеальная работа, кот отлично смотрится в аквариуме',
                grade: 5
              }
            }
          }
        ]
      },
    }
  });
  console.info('🤘️ Database was filled')
}

fillDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect()

    //process.exit(1);
  })