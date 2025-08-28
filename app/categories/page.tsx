// pages/categories.tsx
import { GetServerSideProps } from 'next';
import prisma from '@/lib/prisma';

type Category = {
  id: string;
  name: string;
};

interface CategoriesProps {
  categories: Category[];
}

export const getServerSideProps: GetServerSideProps<CategoriesProps> = async () => {
  const categories = await prisma.category.findMany();
  return { props: { categories } };
};

export default function Categories({ categories }: CategoriesProps) {
  return (
    <div className="min-h-screen bg-background mx-40">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
        {categories.map((category) => (
          <div
            key={category.id}
            className="p-6 border rounded-lg hover:shadow-lg transition-shadow duration-200">
            <h2 className="text-2xl font-bold mb-2 text-foreground">{category.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
