import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, User, Calendar } from 'lucide-react';
import { About } from '@/components/about';
import { featuredPosts } from '@/constants/featuredPost';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';



export default async function Home() {


    return (
        <div className="min-h-screen bg-background">
            <main>
                <section className="py-40 px-4 sm:px-6 lg:px-8 overflow-hidden">
                    <div className="container mx-auto max-w-7xl">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Left side*/}
                            <div className="text-start">
                                <h1 className="text-2xl sm:text-3xl lg:text-6xl font-bold text-foreground mb-4">
                                    WELCOME TO MY<span className="text-blue-500"> CHIKAS</span>
                                </h1>
                                <p className="text-sm sm:text-base text-muted-foreground mb-8">
                                    Welcome to my corner of the internet where I share thoughts on
                                    technology, design, and life.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-start">
                                    <Button
                                        size="lg"
                                        className="text-lg px-8 bg-black text-white hover:bg-gray-800">
                                        <Link
                                            href="/blog"
                                            className="flex items-center justify-between gap-2">
                                            <span className="text-stone-200">Read My Stories</span>
                                            <ArrowRight className="h-5 w-5" />
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="text-lg px-8 bg-transparent border-stone-200">
                                        <Link href="/admin">Join me</Link>
                                    </Button>
                                </div>
                            </div>

                            {/* Right side*/}
                            <div className="flex justify-start lg:justify-center relative mt-10 lg:mt-0 h-96 lg:h-[500px] w-full">
                                <div className="absolute top-1/4 left-1/4 w-3/4 h-3/4 bg-gradient-to-br from-blue-200/60 via-purple-200/60 to-pink-200/60 rounded-full blur-xl z-5"></div>

                                <div className="relative z-10 w-full h-full flex items-end justify-center pb-0">
                                    <Image
                                        src="/clydedp.png"
                                        alt="The Clyde"
                                        width={600}
                                        height={600}
                                        className="w-full max-w-sm lg:max-w-2xl xl:max-w-4xl object-contain scale-115 lg:scale-130 transform translate-y-8 lg:translate-y-80"
                                        priority
                                    />
                                </div>

                                {/* Top left floating icon */}
                                <div className="absolute -top-4 lg:-top-8 left-8 lg:left-32 z-20 animate-float">
                                    <Image
                                        src="/notebook-dynamic-gradient.png"
                                        alt="3D Icon"
                                        width={128}
                                        height={128}
                                        className="w-16 h-16 lg:w-32 lg:h-32 hover:opacity-100 transition-opacity"
                                    />
                                </div>

                                {/* Top middle floating icon */}
                                <div className="absolute -top-8 lg:-top-32 left-4/6 transform -translate-x-1/2 z-20 animate-float-delayed">
                                    <Image
                                        src="/mail-dynamic-gradient.png"
                                        alt="3D Icon"
                                        width={128}
                                        height={128}
                                        className="w-14 h-14 lg:w-32 lg:h-32 hover:opacity-100 transition-opacity"
                                    />
                                </div>

                                {/* Top right floating icon */}
                                <div className="absolute -top-2 lg:-top-6 right-2 lg:right-2 z-20 animate-float-slow">
                                    <Image
                                        src="/chat-bubble-dynamic-gradient.png"
                                        alt="3D Icon"
                                        width={128}
                                        height={128}
                                        className="w-16 h-16 lg:w-32 lg:h-32 opacity-75 hover:opacity-100 transition-opacity"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <About />

                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="container mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-6xl font-bold text-foreground mb-4">Latest Posts</h2>
                            <p className="text-lg text-muted-foreground">
                                Recent thoughts and discoveries from my journey
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredPosts.map((post) => (
                                <Card
                                    key={post.id}
                                    className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                    <div className="aspect-video overflow-hidden">
                                        <Image
                                            src={post.image || '/placeholder.svg'}
                                            alt={post.title}
                                            width={600}
                                            height={340}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <CardHeader>
                                        <div className="flex items-center justify-between mb-2">
                                            <Badge variant="secondary">{post.category}</Badge>
                                            <span className="text-sm text-muted-foreground">
                                                {post.readTime}
                                            </span>
                                        </div>
                                        <CardTitle className="line-clamp-2 hover:text-accent transition-colors">
                                            <Link href={`/blog/${post.id}`}>{post.title}</Link>
                                        </CardTitle>
                                        <CardDescription className="line-clamp-3">
                                            {post.excerpt}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <User className="h-4 w-4 mr-1" />
                                            <span className="mr-4">{post.author}</span>
                                            <Calendar className="h-4 w-4 mr-1" />
                                            <span>{new Date(post.date).toLocaleDateString()}</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <Button variant="outline" size="lg">
                                <Link href="/blog" className="flex items-center justify-between gap-2">
                                    View All Posts <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
