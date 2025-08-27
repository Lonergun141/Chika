import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Github, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
	return (
		<div className="min-h-screen bg-background">
			<main className="py-12 px-4 sm:px-6 lg:px-8">
				<div className="container mx-auto max-w-md">
					<Card>
						<CardHeader className="text-center">
							<div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center mx-auto mb-4">
								<span className="text-primary-foreground font-bold text-4xl">C</span>
							</div>
							<CardTitle className="text-2xl">Welcome back to Chika</CardTitle>
							<CardDescription>
								Sign in to your account to continue writing and managing your blog
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							{/* Social Login */}
							<div className="space-y-3">
								<Button variant="outline" className="w-full bg-transparent" type="button">
									<Github className="h-4 w-4 mr-2" />
									Continue with GitHub
								</Button>
								<Button variant="outline" className="w-full bg-transparent" type="button">
									<Mail className="h-4 w-4 mr-2" />
									Continue with Google
								</Button>
							</div>

							<div className="relative">
								<div className="absolute inset-0 flex items-center">
									<Separator />
								</div>
								<div className="relative flex justify-center text-xs uppercase">
									<span className="bg-background px-2 text-muted-foreground">
										Or continue with email
									</span>
								</div>
							</div>

							{/* Email Login Form */}
							<form className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="email">Email</Label>
									<div className="relative">
										<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
										<Input
											id="email"
											type="email"
											placeholder="Enter your email"
											minLength={5}
											maxLength={50}
											pattern="^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$"
											className="pl-10"
											required
										/>
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="password">Password</Label>
									<div className="relative">
										<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
										<Input
											id="password"
											type="password"
											placeholder="Enter your password"
											className="pl-10"
											required
										/>
									</div>
								</div>

								<div className="flex items-center justify-between">
									<div className="flex items-center space-x-2">
										<input
											id="remember"
											type="checkbox"
											className="h-4 w-4 rounded border-input"
										/>
										<Label htmlFor="remember" className="text-sm">
											Remember me
										</Label>
									</div>
									<Link
										href="/forgot-password"
										className="text-sm text-muted-forgreground underline">
										Forgot password?
									</Link>
								</div>

								<Button type="submit" className="w-full ">
									Sign In
								</Button>
							</form>

							<div className="text-center text-sm">
								<span className="text-muted-foreground">Don't have an account? </span>
								<Link href="/auth/register" className="text-muted-foreground underline">
									Sign up
								</Link>
							</div>
						</CardContent>
					</Card>

					<div className="mt-8 text-center">
						<p className="text-sm text-muted-foreground">
							By signing in, you agree to our{' '}
							<Link href="/terms" className="text-muted-foreground underline">
								Terms of Service
							</Link>{' '}
							and{' '}
							<Link href="/privacy" className="text-muted-foreground underline">
								Privacy Policy
							</Link>
						</p>
					</div>
				</div>
			</main>
		</div>
	);
}
