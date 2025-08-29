'use server';

import { signIn, signOut } from '@/lib/auth.server';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma'

// val schemas
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export async function authenticate(prevState: any, formData: FormData) {
  try {
    const validatedFields = loginSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { email, password } = validatedFields.data;

    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { message: 'Invalid credentials.' };
        default:
          return { message: 'Something went wrong.' };
      }
    }
    throw error;
  }
  redirect('/');
}

export async function registerUser(prevState: any, formData: FormData) {
  try {
    const validatedFields = registerSchema.safeParse({
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { firstName, lastName, email, password } = validatedFields.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { message: 'User with this email already exists.' };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        name: `${firstName} ${lastName}`,
        email,
        password: hashedPassword,
      },
    });

    // Sign in the user after registration
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return { message: 'An error occurred during registration.' };
  }
  redirect('/');
}

export async function signInWithProvider(provider: string) {
  try {
    await signIn(provider, { redirectTo: '/' });
  } catch (error) {
    if (error instanceof AuthError) {
      console.error('Authentication failed:', error);
     
      return;
    }
    throw error;
  }
}

export async function signInWithGitHub() {
  await signInWithProvider('github');
}

export async function signInWithGoogle() {
  await signInWithProvider('google');
}

export async function signOutUser() {
  await signOut({ redirectTo: '/' });
}