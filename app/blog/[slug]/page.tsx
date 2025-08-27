import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { ArrowLeft, Calendar, MessageCircle } from 'lucide-react';
import { post, comments } from '@/constants/mockData.';

export default function BlogPostPage() {
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
								<Badge variant="secondary">{post.category}</Badge>
							
							</div>

							<h1 className="text-4xl font-bold text-foreground mb-6 leading-tight">
								{post.title}
							</h1>

							<div className="flex items-center justify-between flex-wrap gap-4 mb-8">
								<div className="flex items-center gap-4">
									<Avatar>
										<AvatarImage
											alt={post.author}
										/>
										<AvatarFallback>
											{post.author
												.split(' ')
												.map((n) => n[0])
												.join('')}
										</AvatarFallback>
									</Avatar>
									<div>
										<p className="font-medium text-foreground">{post.author}</p>
										<div className="flex items-center text-sm text-muted-foreground">
											<Calendar className="h-4 w-4 mr-1" />
											<span>{new Date(post.CreatedAt).toLocaleDateString()}</span>
										</div>
									</div>
								</div>

								<div className="flex items-center gap-4">
									<div className="flex items-center gap-2 text-sm text-muted-foreground">
										<MessageCircle className="h-4 w-4" />
										<span>{post.comments ?? comments.length}</span>
									</div>
								</div>
							</div>
						</div>

						{/* Featured Image */}
						<div className="aspect-video overflow-hidden rounded-lg mb-8">
							<img
								src={post.image_url || '/placeholder.svg'}
								alt={post.title}
								className="w-full h-full object-cover"
							/>
						</div>

						{/* Article Content */}
						<div
							className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-li:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-pre:text-foreground"
							dangerouslySetInnerHTML={{ __html: post.content }}
						/>

						{/* Tags */}
						<div className="mt-8 pt-8 border-t">
							<div className="flex flex-wrap gap-2">
								{post.tags.map((tag) => (
									<Badge key={tag} variant="outline">
										<Link href={`/tags/${tag.toLowerCase()}`}>{tag}</Link>
									</Badge>
								))}
							</div>
						</div>
					</article>

					{/* Author Bio */}
					

					{/* Comments Section */}
					<section>
						<h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>

						<div className="space-y-6">
							{comments.map((comment) => (
								<Card key={comment.id}>
									<CardContent className="pt-6">
										<div className="flex items-start gap-4">
											<Avatar>
												<AvatarImage
													src={comment.avatar || '/placeholder.svg'}
													alt={comment.author}
												/>
												<AvatarFallback>
													{comment.author
														.split(' ')
														.map((n) => n[0])
														.join('')}
												</AvatarFallback>
											</Avatar>
											<div className="flex-1">
												<div className="flex items-center gap-2 mb-2">
													<h4 className="font-medium">{comment.author}</h4>
													<span className="text-sm text-muted-foreground">
														{new Date(comment.CreatedAt).toLocaleDateString()}
													</span>
												</div>
												<p className="text-foreground mb-3">{comment.Content}</p>
											
											</div>
										</div>
									</CardContent>
								</Card>
							))}
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
										className="w-full min-h-[120px] p-3 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
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
