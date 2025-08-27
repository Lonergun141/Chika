'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu } from 'lucide-react';
import { Button } from './ui/button';

export function Header() {
	const { theme, setTheme } = useTheme();
	const [isOpen, setIsOpen] = useState(false);

	const navigation = [
		{ name: 'Home', href: '/' },
		{ name: 'Blog', href: '/blog' },
		{ name: 'Categories', href: '/categories' },
		{ name: 'Tags', href: '/tags' },
		{ name: 'Admin', href: '/admin' },
	];
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto px-4 sm:px-6 lg:px-38">
				<div className="flex h-16 items-center justify-between">
					<Link href="/" className="flex items-center space-x-2">
						<div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
							<span className="text-primary-foreground font-bold text-lg">C</span>
						</div>
						<span className="text-xl font-bold text-foreground">Chika</span>
					</Link>

					<nav className="hidden md:flex items-center space-x-8">
						{navigation.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className="text-muted-foreground hover:text-foreground transition-colors transition-colors duration-200 font-medium">
								{item.name}
							</Link>
						))}
					</nav>

					<div className="flex items-center space-x-2">
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
							className="h-9 w-9">
							<Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
							<Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
							<span className="sr-only">Toggle theme</span>
						</Button>
						<Link
							href="/auth/login"
							className="text-muted-foreground hover:text-foreground transition-colors transition-colors duration-200 font-medium">
							Login
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
}
