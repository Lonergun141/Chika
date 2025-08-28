import { PrismaClient, Prisma, Role } from "../app/generated/prisma";

const prisma = new PrismaClient();

// Helper function to generate slugs
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Define interfaces for better type safety
interface PostSeedData {
  title: string;
  content: string;
  image: string;
  published: boolean;
  categories: string[];
  tags: string[];
}

interface UserWithId {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  role: Role;
}

interface CategoryWithId {
  id: string;
  name: string;
}

interface TagWithId {
  id: string;
  name: string;
}

// Sample data
const userData: Prisma.UserCreateInput[] = [
  {
    email: "alice.johnson@techblog.com",
    first_name: "Alice",
    last_name: "Johnson",
    password: "hashedPassword123", // In real app, use proper password hashing
    role: Role.ADMIN,
  },
  {
    email: "bob.smith@techblog.com",
    first_name: "Bob",
    last_name: "Smith",
    password: "hashedPassword456",
    role: Role.USER,
  },
  {
    email: "carol.davis@techblog.com",
    first_name: "Carol",
    last_name: "Davis",
    password: "hashedPassword789",
    role: Role.USER,
  },
  {
    email: "david.wilson@techblog.com",
    first_name: "David",
    last_name: "Wilson",
    password: "hashedPassword101",
    role: Role.USER,
  },
];

const categoryData: Prisma.CategoryCreateInput[] = [
  { name: "Web Development" },
  { name: "JavaScript" },
  { name: "React" },
  { name: "Node.js" },
  { name: "Database" },
  { name: "DevOps" },
  { name: "UI/UX Design" },
  { name: "Mobile Development" },
  { name: "Machine Learning" },
  { name: "Cybersecurity" },
];

const tagData: Prisma.TagCreateInput[] = [
  { name: "beginner" },
  { name: "advanced" },
  { name: "tutorial" },
  { name: "best-practices" },
  { name: "performance" },
  { name: "security" },
  { name: "tips" },
  { name: "guide" },
  { name: "framework" },
  { name: "tools" },
  { name: "api" },
  { name: "frontend" },
  { name: "backend" },
  { name: "fullstack" },
  { name: "responsive" },
];

const postData: PostSeedData[] = [
  {
    title: "Getting Started with React Hooks",
    content: `React Hooks revolutionized how we write React components by allowing us to use state and other React features in functional components. In this comprehensive guide, we'll explore the most commonly used hooks and learn how to implement them effectively.

## useState Hook
The useState hook is the most fundamental hook for managing state in functional components. It returns an array with two elements: the current state value and a function to update it.

## useEffect Hook
The useEffect hook lets you perform side effects in function components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount combined in React classes.

## Custom Hooks
One of the most powerful features of hooks is the ability to create custom hooks that encapsulate reusable stateful logic.`,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    published: true,
    categories: ["React", "JavaScript", "Web Development"],
    tags: ["beginner", "tutorial", "hooks", "react"],
  },
  {
    title: "Building RESTful APIs with Node.js and Express",
    content: `Creating robust and scalable RESTful APIs is crucial for modern web applications. In this tutorial, we'll build a complete API using Node.js and Express, covering authentication, validation, error handling, and best practices.

## Setting Up the Project
We'll start by initializing a new Node.js project and installing the necessary dependencies including Express, middleware for CORS, body parsing, and security.

## Database Integration
Learn how to integrate MongoDB with Mongoose or PostgreSQL with Prisma for data persistence and management.

## Authentication and Authorization
Implement JWT-based authentication and role-based authorization to secure your API endpoints.`,
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800",
    published: true,
    categories: ["Node.js", "Web Development", "Database"],
    tags: ["backend", "api", "tutorial", "express"],
  },
  {
    title: "Modern CSS Grid Layout Techniques",
    content: `CSS Grid has transformed how we approach web layouts. This guide covers advanced Grid techniques, practical examples, and how to create responsive designs that work across all devices.

## Grid Fundamentals
Understanding the basic concepts of CSS Grid including grid containers, grid items, tracks, and areas.

## Responsive Grid Layouts
Learn how to create layouts that adapt seamlessly to different screen sizes using CSS Grid's powerful features.

## Real-world Examples
Practical examples of common layout patterns implemented with CSS Grid.`,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    published: true,
    categories: ["Web Development", "UI/UX Design"],
    tags: ["frontend", "css", "responsive", "guide"],
  },
  {
    title: "Introduction to Machine Learning with Python",
    content: `Machine Learning is transforming industries worldwide. This beginner-friendly guide introduces the fundamental concepts of ML and shows how to get started with Python and popular libraries like scikit-learn.

## Understanding ML Concepts
We'll cover supervised learning, unsupervised learning, and reinforcement learning with practical examples.

## Setting Up Your Environment
Learn how to set up Python, Jupyter notebooks, and essential ML libraries.

## Your First ML Model
Build and train your first machine learning model to make predictions on real data.`,
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
    published: true,
    categories: ["Machine Learning"],
    tags: ["beginner", "python", "tutorial", "data-science"],
  },
  {
    title: "Securing Your Web Applications: Best Practices",
    content: `Web application security is more important than ever. This comprehensive guide covers the OWASP Top 10 vulnerabilities and provides practical steps to secure your applications against common attacks.

## Common Security Vulnerabilities
Understanding injection attacks, broken authentication, sensitive data exposure, and other critical security risks.

## Implementation Strategies
Practical code examples and strategies for implementing security measures in your applications.

## Security Testing
Learn about different types of security testing and tools to help identify vulnerabilities.`,
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800",
    published: true,
    categories: ["Cybersecurity", "Web Development"],
    tags: ["security", "best-practices", "advanced", "guide"],
  },
  {
    title: "Docker and Kubernetes for Developers",
    content: `Containerization has revolutionized software deployment and development workflows. This guide covers Docker fundamentals and introduces Kubernetes for container orchestration.

## Docker Basics
Learn how to create Docker images, run containers, and manage container lifecycles.

## Container Orchestration with Kubernetes
Introduction to Kubernetes concepts including pods, services, deployments, and scaling.

## Development Workflow
How to integrate containers into your development workflow for consistent environments.`,
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800",
    published: false,
    categories: ["DevOps"],
    tags: ["docker", "kubernetes", "devops", "tools"],
  },
];

export async function main() {
  console.log("🌱 Starting database seed...");

  // Clean existing data
  console.log("🧹 Cleaning existing data...");
  await prisma.postTag.deleteMany();
  await prisma.postCategory.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.category.deleteMany();

  // Create users
  console.log("👥 Creating users...");
  const users: UserWithId[] = [];
  for (const userInput of userData) {
    const user = await prisma.user.create({ data: userInput });
    users.push(user);
    console.log(`Created user: ${user.first_name} ${user.last_name}`);
  }

  // Create categories
  console.log("📂 Creating categories...");
  const categories: CategoryWithId[] = [];
  for (const categoryInput of categoryData) {
    const category = await prisma.category.create({ data: categoryInput });
    categories.push(category);
    console.log(`Created category: ${category.name}`);
  }

  // Create tags
  console.log("🏷️ Creating tags...");
  const tags: TagWithId[] = [];
  for (const tagInput of tagData) {
    const tag = await prisma.tag.create({ data: tagInput });
    tags.push(tag);
    console.log(`Created tag: ${tag.name}`);
  }

  // Create posts with relationships
  console.log("📝 Creating posts...");
  for (let i = 0; i < postData.length; i++) {
    const postInfo = postData[i];
    const author = users[i % users.length]; // Rotate through users

    // Create the post
    const post = await prisma.post.create({
      data: {
        title: postInfo.title,
        slug: generateSlug(postInfo.title),
        content: postInfo.content,
        image: postInfo.image,
        published: postInfo.published,
        authorId: author.id,
      },
    });

    // Create post-category relationships
    for (const categoryName of postInfo.categories) {
      const category = categories.find(c => c.name === categoryName);
      if (category) {
        await prisma.postCategory.create({
          data: {
            postId: post.id,
            categoryId: category.id,
          },
        });
      }
    }

    // Create post-tag relationships
    for (const tagName of postInfo.tags) {
      const tag = tags.find(t => t.name === tagName);
      if (tag) {
        await prisma.postTag.create({
          data: {
            postId: post.id,
            tagId: tag.id,
          },
        });
      }
    }

    console.log(`Created post: ${post.title}`);
  }

  // Create some comments
  console.log("💬 Creating comments...");
  const posts = await prisma.post.findMany();
  const sampleComments = [
    "Great article! This really helped me understand the concept better.",
    "Thanks for sharing this detailed explanation. Very useful!",
    "I had the same issue and this solution worked perfectly.",
    "Looking forward to more content like this.",
    "Excellent tutorial, easy to follow and well-structured.",
  ];

  for (let i = 0; i < 15; i++) {
    const randomPost = posts[Math.floor(Math.random() * posts.length)];
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomComment = sampleComments[Math.floor(Math.random() * sampleComments.length)];

    await prisma.comment.create({
      data: {
        content: randomComment,
        postId: randomPost.id,
        authorId: randomUser.id,
      },
    });
  }

  console.log("✅ Database seeded successfully!");
  console.log(`Created ${users.length} users`);
  console.log(`Created ${categories.length} categories`);
  console.log(`Created ${tags.length} tags`);
  console.log(`Created ${postData.length} posts`);
  console.log("Created 15 comments");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });