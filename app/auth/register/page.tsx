'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Github, Mail } from 'lucide-react';
import { useFormState, useFormStatus } from 'react-dom';
import { registerUser } from '@/lib/actions/auth';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';
import React from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Creating Account...' : 'Create Account'}
    </Button>
  );
}

function SocialButton({ provider, icon: Icon, children, onClick }: { 
  provider: string; 
  icon: React.ComponentType<{ className?: string }>; 
  children: React.ReactNode;
  onClick: () => void;
}) {
  const [isPending, startTransition] = React.useTransition();
  
  return (
    <Button 
      variant="outline" 
      className="w-full bg-transparent" 
      type="button"
      disabled={isPending}
      onClick={() => startTransition(onClick)}
    >
      <Icon className="h-4 w-4 mr-2" />
      {children}
    </Button>
  );
}

export default function RegisterPage() {
  const [state, dispatch] = useFormState(registerUser, undefined);

  useEffect(() => {
    if (state?.message) {
      toast.error(state.message);
    }
  }, [state]);

  const handleProviderSignIn = (provider: string) => {
    signIn(provider, { callbackUrl: '/' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
          <CardDescription className="text-center">
            Join Chika to comment and engage with posts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <SocialButton 
              provider="github" 
              icon={Github}
              onClick={() => handleProviderSignIn('github')}
            >
              GitHub
            </SocialButton>
            <SocialButton 
              provider="google" 
              icon={Mail}
              onClick={() => handleProviderSignIn('google')}
            >
              Google
            </SocialButton>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <form action={dispatch} className="space-y-4">
            {/* ... rest of your form remains the same ... */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  required
                  minLength={2}
                  maxLength={30}
                  placeholder="First Name"
                  autoComplete="given-name"
                />
                {state?.errors?.firstName && (
                  <p className="text-sm text-destructive">{state.errors.firstName[0]}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  required
                  minLength={2}
                  maxLength={30}
                  placeholder="Last Name"
                  autoComplete="family-name"
                />
                {state?.errors?.lastName && (
                  <p className="text-sm text-destructive">{state.errors.lastName[0]}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                minLength={5}
                maxLength={50}
                placeholder="you@example.com"
                autoComplete="email"
              />
              {state?.errors?.email && (
                <p className="text-sm text-destructive">{state.errors.email[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                maxLength={100}
                placeholder="Password"
                autoComplete="new-password"
              />
              {state?.errors?.password && (
                <p className="text-sm text-destructive">{state.errors.password[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                minLength={8}
                maxLength={100}
                placeholder="Confirm Password"
                autoComplete="new-password"
              />
              {state?.errors?.confirmPassword && (
                <p className="text-sm text-destructive">{state.errors.confirmPassword[0]}</p>
              )}
            </div>
            <SubmitButton />
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/auth/login" className="underline underline-offset-4 hover:text-primary">
              Sign in
            </Link>
          </div>
          <div className="text-center text-xs text-muted-foreground">
            By creating an account, you agree to our{' '}
            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}