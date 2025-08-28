import prisma from '@/lib/prisma';

export class PostService {
	// Get top posts by comment count
	static async getTopPostsByComments(limit: number = 3) {
		return await prisma.post.findMany({
			include: {
				author: {
					select: {
						first_name: true,
						last_name: true,
						email: true,
					},
				},
				postCategories: {
					include: {
						category: {
							select: {
								name: true,
							},
						},
					},
				},
				postTags: {
					include: {
						tag: {
							select: {
								name: true,
							},
						},
					},
				},
				comments: {
					select: {
						id: true,
					},
				},
				_count: {
					select: {
						comments: true,
					},
				},
			},
			orderBy: {
				comments: {
					_count: 'desc',
				},
			},
			take: 3, 
		});
	}
}
