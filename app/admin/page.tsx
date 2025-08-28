import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye, Search, MoreHorizontal } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { stats } from '@/constants/mockData.';
import { CatService } from '@/lib/services/catServices';
import { BlogService } from '@/lib/services/blogServices';
import { TagService } from '@/lib/services/tagServices';

export default async function AdminPage() {
	const categories = await CatService.getCategoriesWithPostCount();
	const blogPost = await BlogService.getAllBlogs();
	const tags = await TagService.getTagsWithPostCount();

	return (
		<div className="min-h-screen bg-background">
			<main className="py-8 px-4 sm:px-6 lg:px-8">
				<div className="container mx-auto">
					{/* Page Header */}
					<div className="flex items-center justify-between mb-8">
						<div>
							<h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
							<p className="text-muted-foreground mt-2">
								Manage your blog content, categories, and settings
							</p>
						</div>
						<Button asChild>
							<Link href="/admin/new-post">
								<Plus className="h-4 w-4 mr-2" />
								New Post
							</Link>
						</Button>
					</div>

					{/* Stats Cards */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
						{stats.map((stat) => {
							const IconComponent = stat.icon;
							return (
								<Card key={stat.title}>
									<CardContent className="p-6">
										<div className="flex items-center justify-between">
											<div>
												<p className="text-sm font-medium text-muted-foreground">
													{stat.title}
												</p>
												<p className="text-2xl font-bold text-foreground">
													{stat.value}
												</p>
												<p className="text-xs text-green-600 mt-1">
													{stat.change} from last month
												</p>
											</div>
											<div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center">
												<IconComponent className="h-6 w-6 text-accent" />
											</div>
										</div>
									</CardContent>
								</Card>
							);
						})}
					</div>

					{/* Main Content Tabs */}
					<Tabs defaultValue="posts" className="space-y-6">
						<TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
							<TabsTrigger value="posts">Posts</TabsTrigger>
							<TabsTrigger value="categories">Categories</TabsTrigger>
							<TabsTrigger value="tags">Tags</TabsTrigger>
						</TabsList>

						{/* Posts Tab */}
						<TabsContent value="posts" className="space-y-6">
							<Card>
								<CardHeader>
									<div className="flex items-center justify-between">
										<div>
											<CardTitle>Recent Posts</CardTitle>
											<CardDescription>
												Manage your blog posts and their status
											</CardDescription>
										</div>
										<div className="flex items-center gap-2">
											<div className="relative">
												<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
												<Input placeholder="Search posts..." className="pl-10 w-64" />
											</div>
										</div>
									</div>
								</CardHeader>
								<CardContent>
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Title</TableHead>

												<TableHead>Author</TableHead>
												<TableHead>Date</TableHead>

												<TableHead className="w-[50px]"></TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{blogPost.map((post) => (
												<TableRow key={post.id}>
													<TableCell className="font-medium">
														<Link
															href={`/blog/${post.id}`}
															className="hover:text-accent transition-colors">
															{post.title}
														</Link>
													</TableCell>

													<TableCell>{post.author.first_name}</TableCell>
													<TableCell>
														{new Date(post.createdAt).toLocaleDateString()}
													</TableCell>

													<TableCell>
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button variant="ghost" size="sm">
																	<MoreHorizontal className="h-4 w-4" />
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent align="end">
																<DropdownMenuItem>
																	<Eye className="h-4 w-4 mr-2" />
																	View
																</DropdownMenuItem>
																<DropdownMenuItem>
																	<Edit className="h-4 w-4 mr-2" />
																	Edit
																</DropdownMenuItem>
																<DropdownMenuItem className="text-destructive">
																	<Trash2 className="h-4 w-4 mr-2" />
																	Delete
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</CardContent>
							</Card>
						</TabsContent>

						{/* Categories Tab */}
						<TabsContent value="categories" className="space-y-6">
							<Card>
								<CardHeader>
									<div className="flex items-center justify-between">
										<div>
											<CardTitle>Categories</CardTitle>
											<CardDescription>
												Organize your content with categories
											</CardDescription>
										</div>
										<Button>
											<Plus className="h-4 w-4 mr-2" />
											Add Category
										</Button>
									</div>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
										{categories.map((category) => (
											<Card key={category.id}>
												<CardContent className="p-4">
													<div className="flex items-center justify-between">
														<div>
															<h3 className="font-semibold">{category.name}</h3>
															<p className="text-sm text-muted-foreground">
																{category._count.postCategories} posts
															</p>
														</div>
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button variant="ghost" size="sm">
																	<MoreHorizontal className="h-4 w-4" />
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent align="end">
																<DropdownMenuItem>
																	<Edit className="h-4 w-4 mr-2" />
																	Edit
																</DropdownMenuItem>
																<DropdownMenuItem className="text-destructive">
																	<Trash2 className="h-4 w-4 mr-2" />
																	Delete
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</div>
												</CardContent>
											</Card>
										))}
									</div>
								</CardContent>
							</Card>
						</TabsContent>

						{/* Tags Tab */}
						<TabsContent value="tags" className="space-y-6">
							<Card>
								<CardHeader>
									<div className="flex items-center justify-between">
										<div>
											<CardTitle>Tags</CardTitle>
											<CardDescription>
												Manage tags for better content organization
											</CardDescription>
										</div>
										<Button>
											<Plus className="h-4 w-4 mr-2" />
											Add Tag
										</Button>
									</div>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
										{tags.map((tag) => (
											<Card key={tag.id}>
												<CardContent className="p-4">
													<div className="flex items-center justify-between">
														<div>
															<h3 className="font-semibold">#{tag.name}</h3>
															<p className="text-sm text-muted-foreground">
																{tag._count.postTags} posts
															</p>
														</div>
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button variant="ghost" size="sm">
																	<MoreHorizontal className="h-4 w-4" />
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent align="end">
																<DropdownMenuItem>
																	<Edit className="h-4 w-4 mr-2" />
																	Edit
																</DropdownMenuItem>
																<DropdownMenuItem className="text-destructive">
																	<Trash2 className="h-4 w-4 mr-2" />
																	Delete
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</div>
												</CardContent>
											</Card>
										))}
									</div>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</div>
			</main>
		</div>
	);
}
