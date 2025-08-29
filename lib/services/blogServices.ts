import { prisma } from '@/lib/prisma';

export class BlogService {
	static async getAllBlogs() {
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
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
	}
}
