import { prisma } from '@/lib/prisma';

export class TagService {
	static async getTagsWithPostCount() {
		return await prisma.tag.findMany({
			include: {
				_count: {
					select: {
						postTags: {
							where: {
								post: {
									published: true,
								},
							},
						},
					},
				},
			},
			orderBy: {
				name: 'asc',
			},
		});
	}
}
