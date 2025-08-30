import { Search, Filter, User, Calendar } from 'lucide-react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import {
	Pagination,
	PaginationContent,
	PaginationLink,
	PaginationItem,
	PaginationPrevious,
	PaginationNext,
	PaginationEllipsis,
} from '@/components/ui/pagination';
import { BlogService } from '@/lib/services/blogServices';
import { CatService } from '@/lib/services/catServices';

export default async function BlogPage() {
	const blogPosts = await BlogService.getAllBlogs();
	const categories = await CatService.getCategoriesWithPostCount();

	return (
		<div className="min-h-screen bg-background mx-4 md:mx-20 lg:mx-40">
			<main className="py-10">
				<div className="text-start mb-12">
					<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-8">Blog.</h1>
					<p className="text-muted-foreground text-lg sm:text-xl md:text-lg lg:text-xl">
						Discover articles, tutorials, and insights on web development, design, and
						technology.
					</p>
				</div>

				<div className="mb-12">
					<div className="flex flex-col sm:flex-row gap-4 max-w-2xl">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
							<Input placeholder="Search blogs..." className="pl-10" />
						</div>
						<Select defaultValue="all">
							<SelectTrigger className="w-full sm:w-48">
								<Filter className="h-4 w-4 mr-2" />
								<SelectValue placeholder="Category" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Categories</SelectItem>
								{categories.map((category) => (
									<SelectItem key={category.id} value={category.name.toLowerCase()}>
										{category.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{blogPosts.map((post) => {
						// Extract the first category for the badge
						const primaryCategory = post.postCategories[0]?.category.name || 'Uncategorized';

						// Extract author full name with null checks
						const authorName =
							`${post.author.first_name || ''} ${post.author.last_name || ''}`.trim() ||
							'Unknown Author';

						// Extract tags
						const tags = post.postTags.map((pt) => pt.tag.name);

						// Create excerpt from content (first 150 characters)
						const excerpt = post.content.replace(/[#*`]/g, '').substring(0, 150) + '...';

						return (
							<Card
								key={post.id}
								className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
								<div className="aspect-video overflow-hidden">
									<img
										src={post.image || '/placeholder.svg'}
										alt={post.title}
										className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
									/>
								</div>
								<CardHeader>
									{/* Category badge */}
									<div className="flex items-center justify-between mb-2">
										<Badge variant="secondary">{primaryCategory}</Badge>
										{post.comments.length > 0 && (
											<span className="text-xs text-muted-foreground">
												{post.comments.length} comment
												{post.comments.length !== 1 ? 's' : ''}
											</span>
										)}
									</div>
									{/* Title (linked by slug) */}
									<CardTitle className="line-clamp-2 hover:text-accent transition-colors">
										<Link href={`/blog/${post.slug}`}>{post.title}</Link>
									</CardTitle>
									{/* Description/Excerpt */}
									<CardDescription className="line-clamp-3">{excerpt}</CardDescription>
								</CardHeader>
								<CardContent>
									{/* Author and CreatedAt */}
									<div className="flex items-center text-sm text-muted-foreground mb-3">
										<User className="h-4 w-4 mr-1" />
										<span className="mr-4">{authorName}</span>
										<Calendar className="h-4 w-4 mr-1" />
										<span>{new Date(post.createdAt).toLocaleDateString()}</span>
									</div>
									{/* Tags */}
									<div className="flex flex-wrap gap-1">
										{tags.slice(0, 3).map((tag) => (
											<Badge key={tag} variant="outline" className="text-xs">
												{tag}
											</Badge>
										))}
										{tags.length > 3 && (
											<Badge variant="outline" className="text-xs">
												+{tags.length - 3} more
											</Badge>
										)}
									</div>
									{/* Published status indicator */}
									{!post.published && (
										<div className="mt-2">
											<Badge variant="destructive" className="text-xs">
												Draft
											</Badge>
										</div>
									)}
								</CardContent>
							</Card>
						);
					})}
				</div>

				{/* Pagination */}
				<div className="flex justify-center mt-12">
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious href="#" />
							</PaginationItem>
							<PaginationItem>
								<PaginationLink href="#">1</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
							<PaginationItem>
								<PaginationNext href="#" />
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			</main>
		</div>
	);
}
