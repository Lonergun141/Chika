'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Github, Mail, Lock } from 'lucide-react';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate, signInWithProvider } from '@/lib/actions/auth';
import { useEffect } from 'react';
import { toast } from 'sonner';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Signing in...' : 'Sign In'}
    </Button>
  );
}

function SocialButton({ provider, icon: Icon, children }: { 
  provider: string; 
  icon: React.ComponentType<{ className?: string }>; 
  children: React.ReactNode;
}) {
  const { pending } = useFormStatus();
  
  return (
    <Button 
      variant="outline" 
      className="w-full bg-transparent" 
      type="button"
      disabled={pending}
      onClick={() => signInWithProvider(provider)}
    >
      <Icon className="h-4 w-4 mr-2" />
      {children}
    </Button>
  );
}

export default function LoginPage() {
  const [state, dispatch] = useFormState(authenticate, undefined);

  useEffect(() => {
    if (state?.message) {
      toast.error(state.message);
    }
  }, [state]);

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
                <form action={() => signInWithProvider('github')}>
                  <SocialButton provider="github" icon={Github}>
                    Continue with GitHub
                  </SocialButton>
                </form>
                <form action={() => signInWithProvider('google')}>
                  <SocialButton provider="google" icon={Mail}>
                    Continue with Google
                  </SocialButton>
                </form>
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
              <form action={dispatch} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      minLength={5}
                      maxLength={50}
                      pattern="^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$"
                      className="pl-10"
                      required
                    />
                  </div>
                  {state?.errors?.email && (
                    <p className="text-sm text-destructive">{state.errors.email[0]}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      className="pl-10"
                      required
                    />
                  </div>
                  {state?.errors?.password && (
                    <p className="text-sm text-destructive">{state.errors.password[0]}</p>
                  )}
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
                    className="text-sm text-muted-foreground underline">
                    Forgot password?
                  </Link>
                </div>

                <SubmitButton />
              </form>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">Don&apos;t have an account? </span>
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