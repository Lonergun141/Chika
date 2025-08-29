'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, User, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { useSession } from '@/lib/auth-client';
import { clientSignOut } from '@/lib/auth-client';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Header() {
	const { theme, setTheme } = useTheme();
	const [isOpen, setIsOpen] = useState(false);
	const { data: session, status } = useSession();

	const navigation = [
		// Only show Blog link if user is logged in
		...(session ? [{ name: 'Home', href: '/home' }] : []),
		...(session ? [{ name: 'Blog', href: '/blog' }] : []),
		// Show Admin link only for ADMIN users
		...(session?.user?.role === 'ADMIN' ? [{ name: 'Admin', href: '/admin' }] : []),
	];

	const getInitials = (name: string | null | undefined) => {
		if (!name) return 'U';
		return name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase()
			.slice(0, 2);
	};

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto px-4 sm:px-6 lg:px-32">
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
								className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium">
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

						{status === 'loading' ? (
							<div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
						) : session ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" className="relative h-8 w-8 rounded-full">
										<Avatar className="h-8 w-8">
											<AvatarImage
												src={session.user.image || ''}
												alt={session.user.name || ''}
											/>
											<AvatarFallback>{getInitials(session.user.name)}</AvatarFallback>
										</Avatar>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-56" align="end" forceMount>
									<div className="flex items-center justify-start gap-2 p-2">
										<div className="flex flex-col space-y-1 leading-none">
											{session.user.name && (
												<p className="font-medium">{session.user.name}</p>
											)}
											{session.user.email && (
												<p className="w-[200px] truncate text-sm text-muted-foreground">
													{session.user.email}
												</p>
											)}
										</div>
									</div>
									<DropdownMenuSeparator />
									<DropdownMenuItem asChild>
										<Link href="/profile" className="flex items-center">
											<User className="mr-2 h-4 w-4" />
											<span>Profile</span>
										</Link>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem
										className="cursor-pointer"
										onSelect={(event) => {
											event.preventDefault();
											clientSignOut();
										}}>
										<LogOut className="mr-2 h-4 w-4" />
										<span>Log out</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<div className="flex items-center space-x-2">
								<Link
									href="/auth/login"
									className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium">
									Login
								</Link>
								<Link href="/auth/register">
									<Button size="sm">Sign Up</Button>
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
}
