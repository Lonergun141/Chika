import prisma from '@/lib/prisma';

export default async function Categories() {
	const tags = await prisma.tag.findMany();

	return (
		<div className="min-h-screen bg-background mx-40">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
				{tags.map((tag) => (
					<div
						key={tag.id}
						className="p-6 border rounded-lg hover:shadow-lg transition-shadow duration-200">
						<h2 className="text-2xl font-bold mb-2 text-foreground">{tag.name}</h2>
					</div>
				))}
			</div>
		</div>
	);
}
