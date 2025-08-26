'use client';
import { Calendar, Eye, User } from 'lucide-react';

export function About() {
	return (
		<section className="py-16 px-4 sm:px-6 lg:px-8">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<h2 className="text-6xl font-bold text-foreground mb-8 text-center">
					About This Space
				</h2>
				<p className=" text-lg text-muted-foreground max-w-4xl mx-auto text-center">
					This is my personal blog where I document my journey as a developer, share insights
					about technology, and explore ideas that fascinate me. Feel free to browse, read, and
					if something resonates with you, 
					<span className="text-accent">join the conversation.</span>
				</p>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-12 max-w-6xl mx-auto">
					<div className="text-center">
						<div className="h-24 w-24 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
							<User className="h-14 w-14 text-primary-foreground" />
						</div>
						<h3 className="text-xl font-semibold mb-2">Community Driven</h3>
						<p className="text-muted-foreground">
							Connect with like-minded writers and readers
						</p>
					</div>

					<div className="text-center">
						<div className="h-24 w-24 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
							<Eye className="h-14 w-14 text-primary-foreground" />
						</div>
						<h3 className="text-xl font-semibold mb-2">Clean Design</h3>
						<p className="text-muted-foreground">
							Focus on content with our minimalist interface
						</p>
					</div>

					<div className="text-center">
						<div className="h-24 w-24 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
							<Calendar className="h-14 w-14 text-primary-foreground" />
						</div>
						<h3 className="text-xl font-semibold mb-2">Regular Updates</h3>
						<p className="text-muted-foreground">
							Fresh content and features added regularly
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
