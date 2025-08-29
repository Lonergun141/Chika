import { prisma } from '@/lib/prisma';

export class CatService {
    static async getCategoriesWithPostCount() {
    return await prisma.category.findMany({
      include: {
        _count: {
          select: {
            postCategories: {
              where: {
                post: {
                  published: true 
                }
              }
            }
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });
  }
}
