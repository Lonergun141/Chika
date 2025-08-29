import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { ArrowLeft, Calendar, MessageCircle } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
	params: Promise<{
		slug: string;
	}>;
}


export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const { slug } = await params;

	const post = await prisma.post.findUnique({
		where: { slug },
		include: {
			author: {
				select: {
					first_name: true,
					last_name: true,
					email: true,
				}
			},
			postCategories: {
				include: {
					category: {
						select: {
							name: true,
						}
					}
				}
			},
			postTags: {
				include: {
					tag: {
						select: {
							name: true,
						}
					}
				}
			},
			comments: {
				include: {
					author: {
						select: {
							first_name: true,
							last_name: true,
						}
					}
				},
				orderBy: {
					createdAt: 'desc',
				}
			}
		}
	});

	// If post not found, show 404
	if (!post) {
		notFound();
	}

	const authorName = `${post.author.first_name} ${post.author.last_name}`;
	const primaryCategory = post.postCategories[0]?.category.name || 'Uncategorized';
	const tags = post.postTags.map(pt => pt.tag.name);
	const comments = post.comments;

	const formatContent = (content: string) => {
		return content
			.replace(/\n## (.*)/g, '<h2>$1</h2>')
			.replace(/\n# (.*)/g, '<h1>$1</h1>')
			.replace(/\n\n/g, '</p><p>')
			.replace(/^\n/, '<p>')
			.concat('</p>');
	};

	return (
		<div className="min-h-screen bg-background">
			<main className="py-8 px-4 sm:px-6 lg:px-8">
				<div className="container mx-auto max-w-4xl">
					{/* Back Button */}
					<div className="mb-8">
						<Button variant="ghost" asChild>
							<Link href="/blog">
								<ArrowLeft className="h-4 w-4 mr-2" />
								Back to Blog
							</Link>
						</Button>
					</div>

					{/* Article Header */}
					<article className="mb-12">
						<div className="mb-8">
							<div className="flex items-center gap-2 mb-4">
								<Badge variant="secondary">{primaryCategory}</Badge>
								{!post.published && (
									<Badge variant="destructive">Draft</Badge>
								)}
							</div>

							<h1 className="text-4xl font-bold text-foreground mb-6 leading-tight">
								{post.title}
							</h1>

							<div className="flex items-center justify-between flex-wrap gap-4 mb-8">
								<div className="flex items-center gap-4">
									<Avatar>
										<AvatarFallback>
											{post.author.first_name[0]}{post.author.last_name[0]}
										</AvatarFallback>
									</Avatar>
									<div>
										<p className="font-medium text-foreground">{authorName}</p>
										<div className="flex items-center text-sm text-muted-foreground">
											<Calendar className="h-4 w-4 mr-1" />
											<span>{new Date(post.createdAt).toLocaleDateString()}</span>
										</div>
									</div>
								</div>

								<div className="flex items-center gap-4">
									<div className="flex items-center gap-2 text-sm text-muted-foreground">
										<MessageCircle className="h-4 w-4" />
										<span>{comments.length}</span>
									</div>
								</div>
							</div>
						</div>

						{/* Featured Image */}
						{post.image && (
							<div className="aspect-video overflow-hidden rounded-lg mb-8">
								<img
									src={post.image}
									alt={post.title}
									className="w-full h-full object-cover"
								/>
							</div>
						)}

						{/* Article Content */}
						<div
							className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-li:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-pre:text-foreground"
							dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
						/>

						{/* Tags */}
						{tags.length > 0 && (
							<div className="mt-8 pt-8 border-t">
								<div className="flex flex-wrap gap-2">
									{tags.map((tag) => (
										<Badge key={tag} variant="outline">
											<Link href={`/tags/${tag.toLowerCase()}`}>{tag}</Link>
										</Badge>
									))}
								</div>
							</div>
						)}
					</article>

					{/* Author Bio Section */}
					<Card className="mb-12">
						<CardContent className="pt-6">
							<div className="flex items-start gap-4">
								<Avatar className="h-16 w-16">
									<AvatarFallback className="text-lg">
										{post.author.first_name[0]}{post.author.last_name[0]}
									</AvatarFallback>
								</Avatar>
								<div className="flex-1">
									<h3 className="text-lg font-semibold mb-2">About {authorName}</h3>
									<p className="text-muted-foreground">
										Content creator and developer passionate about sharing knowledge 
										through writing. Connect with {post.author.first_name} at {post.author.email}.
									</p>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Comments Section */}
					<section>
						<h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>

						<div className="space-y-6">
							{comments.map((comment) => {
								const commentAuthorName = `${comment.author.first_name} ${comment.author.last_name}`;
								return (
									<Card key={comment.id}>
										<CardContent className="pt-6">
											<div className="flex items-start gap-4">
												<Avatar>
													<AvatarFallback>
														{comment.author.first_name[0]}{comment.author.last_name[0]}
													</AvatarFallback>
												</Avatar>
												<div className="flex-1">
													<div className="flex items-center gap-2 mb-2">
														<h4 className="font-medium">{commentAuthorName}</h4>
														<span className="text-sm text-muted-foreground">
															{new Date(comment.createdAt).toLocaleDateString()}
														</span>
													</div>
													<p className="text-foreground mb-3">{comment.content}</p>
												</div>
											</div>
										</CardContent>
									</Card>
								);
							})}

							{comments.length === 0 && (
								<Card>
									<CardContent className="pt-6">
										<p className="text-center text-muted-foreground">
											No comments yet. Be the first to share your thoughts!
										</p>
									</CardContent>
								</Card>
							)}
						</div>

						{/* Add Comment Form */}
						<Card className="mt-8">
							<CardHeader>
								<h3 className="text-lg font-semibold">Leave a Comment</h3>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<textarea
										placeholder="Write your comment here..."
										className="w-full min-h-[120px] p-3 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
									/>
									<div className="flex justify-end">
										<Button>Post Comment</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					</section>
				</div>
			</main>
		</div>
	);
}