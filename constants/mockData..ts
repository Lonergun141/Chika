export const blogPosts = [
	{
		id: 1,
		title: 'Getting Started with Next.js 14',
		slug: 'getting-started-with-nextjs-14',
		image_url: '/nextjs-development-coding.png',
		content:
			'Learn the fundamentals of Next.js 14 and build modern web applications with the latest features and improvements.',
		CreatedAt: '2024-01-15',
		UpdatedAt: '2024-01-16',
		published: true,
		author: 'Nimal',
		category: 'Development',
		tags: ['Next.js', 'React', 'JavaScript'],
		excerpt:
			'Learn the fundamentals of Next.js 14 and build modern web applications with the latest features and improvements.',
	},
	{
		id: 2,
		title: 'The Future of Web Design',
		slug: 'the-future-of-web-design',
		image_url: '/web-design-modern-interface.png',
		content:
			"Exploring upcoming trends in web design and how they'll shape user experiences in 2024 and beyond.",
		CreatedAt: '2024-01-12',
		UpdatedAt: '2024-01-13',
		published: true,
		author: 'Nimal',
		category: 'Design',
		tags: ['Design', 'UI/UX', 'Trends'],
		excerpt:
			"Exploring upcoming trends in web design and how they'll shape user experiences in 2024 and beyond.",
	},
	{
		id: 3,
		title: 'Building Scalable APIs',
		slug: 'building-scalable-apis',
		image_url: '/api-development-server-architecture.png',
		content:
			'Best practices for creating robust and scalable API architectures that grow with your business needs.',
		CreatedAt: '2024-01-10',
		UpdatedAt: '2024-01-11',
		published: false,
		author: 'Nimal',
		category: 'Backend',
		tags: ['API', 'Backend', 'Architecture'],
		excerpt:
			'Best practices for creating robust and scalable API architectures that grow with your business needs.',
	},
	{
		id: 4,
		title: 'CSS Grid vs Flexbox: When to Use What',
		slug: 'css-grid-vs-flexbox',
		image_url: '/css-grid-flexbox-layout.png',
		content:
			'A comprehensive guide to understanding the differences between CSS Grid and Flexbox and when to use each.',
		CreatedAt: '2024-01-08',
		UpdatedAt: '2024-01-09',
		published: true,
		author: 'Nimal',
		category: 'Development',
		tags: ['CSS', 'Layout', 'Frontend'],
		excerpt:
			'A comprehensive guide to understanding the differences between CSS Grid and Flexbox and when to use each.',
	},
	{
		id: 5,
		title: 'The Art of Technical Writing',
		slug: 'the-art-of-technical-writing',
		image_url: '/technical-writing-documentation.png',
		content:
			'Tips and techniques for writing clear, concise, and effective technical documentation that developers love.',
		CreatedAt: '2024-01-05',
		UpdatedAt: '2024-01-06',
		published: false,
		author: 'Nimal',
		category: 'Writing',
		tags: ['Writing', 'Documentation', 'Communication'],
		excerpt:
			'Tips and techniques for writing clear, concise, and effective technical documentation that developers love.',
	},
	{
		id: 6,
		title: 'Database Optimization Strategies',
		slug: 'database-optimization-strategies',
		image_url: '/database-optimization-performance.png',
		content:
			'Learn how to optimize your database queries and improve application performance with proven strategies.',
		CreatedAt: '2024-01-03',
		UpdatedAt: '2024-01-04',
		published: true,
		author: 'Nimal',
		category: 'Backend',
		tags: ['Database', 'Performance', 'Optimization'],
		excerpt:
			'Learn how to optimize your database queries and improve application performance with proven strategies.',
	},
];

// Single post mock (for article page)
export const post = {
	id: 1,
	title: 'Getting Started with Next.js 14: A Complete Guide',
	content: `
    <p>Next.js 14 brings exciting new features and improvements that make building React applications even more powerful and efficient. In this comprehensive guide, we'll explore everything you need to know to get started with Next.js 14.</p>
    <h2>What's New in Next.js 14</h2>
    <p>Next.js 14 introduces several groundbreaking features that enhance developer experience and application performance:</p>
    <ul>
      <li><strong>Turbopack (Beta):</strong> A new bundler that's up to 700x faster than Webpack</li>
      <li><strong>Server Actions (Stable):</strong> Simplified server-side form handling</li>
      <li><strong>Partial Prerendering:</strong> Combine static and dynamic content seamlessly</li>
      <li><strong>Improved Metadata API:</strong> Better SEO and social sharing support</li>
    </ul>
    <h2>Getting Started</h2>
    <p>To create a new Next.js 14 project, run the following command:</p>
    <pre><code>npx create-next-app@latest my-app --typescript --tailwind --eslint</code></pre>
    <p>This will set up a new Next.js project with TypeScript, Tailwind CSS, and ESLint configured out of the box.</p>
    <h2>Key Features to Explore</h2>
    <p>Once you have your project set up, here are the key features you should explore:</p>
    <h3>1. App Router</h3>
    <p>The App Router is the recommended way to create routes in Next.js 14. It provides a more intuitive file-based routing system with support for layouts, loading states, and error boundaries.</p>
    <h3>2. Server Components</h3>
    <p>Server Components allow you to render components on the server, reducing the JavaScript bundle size and improving performance. They're perfect for data fetching and rendering static content.</p>
    <h3>3. Client Components</h3>
    <p>When you need interactivity, you can use Client Components by adding the 'use client' directive at the top of your component file.</p>
    <h2>Best Practices</h2>
    <p>Here are some best practices to follow when working with Next.js 14:</p>
    <ul>
      <li>Use Server Components by default, and only use Client Components when necessary</li>
      <li>Leverage the built-in Image component for optimized image loading</li>
      <li>Take advantage of automatic code splitting for better performance</li>
      <li>Use the Metadata API for better SEO</li>
    </ul>
    <h2>Conclusion</h2>
    <p>Next.js 14 represents a significant step forward in React development, offering improved performance, better developer experience, and powerful new features. Whether you're building a simple blog or a complex web application, Next.js 14 provides the tools you need to create fast, scalable, and maintainable applications.</p>
    <p>Start exploring these features today and see how Next.js 14 can transform your development workflow!</p>
  `,
	author: 'John Doe',
	CreatedAt: '2024-01-15',
	UpdatedAt: '2024-01-16',
	published: true,
	category: 'Development',
	tags: ['Next.js', 'React', 'JavaScript', 'Web Development'],
	image_url: '/nextjs-development-coding-tutorial.png',
	comments: 8,
};

// Mock comments data
export const comments = [
	{
		id: 1,
		author: 'Alice Johnson',
		avatar: '/user-avatar-alice.png',
		Content:
			'Great article! The explanation of Server Components vs Client Components was really helpful.',
		CreatedAt: '2024-01-16',
		likes: 5,
	},
	{
		id: 2,
		author: 'Bob Smith',
		avatar: '/user-avatar-bob.png',
		Content:
			"Thanks for the comprehensive guide. I'm excited to try out Turbopack in my next project.",
		CreatedAt: '2024-01-16',
		likes: 3,
	},
	{
		id: 3,
		author: 'Carol Davis',
		avatar: '/user-avatar-carol.png',
		Content: 'The best practices section is gold. Bookmarking this for future reference!',
		CreatedAt: '2024-01-17',
		likes: 7,
	},
];

import { FileText, MessageCircle } from 'lucide-react';

// Mock data for admin dashboard
export const stats = [
	{ title: 'Total Posts', value: '42', change: '+12%', icon: FileText },
	{ title: 'Comments', value: '156', change: '+23%', icon: MessageCircle },
];

export const recentPosts = [
	{
		id: 1,
		title: 'Getting Started with Next.js 14',
		status: 'Published',
		author: 'John Doe',
		date: '2024-01-15',
		views: 1250,
		comments: 8,
	},
	{
		id: 2,
		title: 'The Future of Web Design',
		status: 'Draft',
		author: 'Jane Smith',
		date: '2024-01-12',
		views: 0,
		comments: 0,
	},
	{
		id: 3,
		title: 'Building Scalable APIs',
		status: 'Published',
		author: 'Mike Johnson',
		date: '2024-01-10',
		views: 890,
		comments: 5,
	},
	{
		id: 4,
		title: 'CSS Grid vs Flexbox Guide',
		status: 'Published',
		author: 'Sarah Wilson',
		date: '2024-01-08',
		views: 2100,
		comments: 12,
	},
	{
		id: 5,
		title: 'Database Optimization Tips',
		status: 'Draft',
		author: 'Lisa Chen',
		date: '2024-01-05',
		views: 0,
		comments: 0,
	},
];

export const categories = [
	{ id: 1, name: 'Development', postCount: 24, slug: 'development' },
	{ id: 2, name: 'Design', postCount: 18, slug: 'design' },
	{ id: 3, name: 'Backend', postCount: 15, slug: 'backend' },
	{ id: 4, name: 'Writing', postCount: 12, slug: 'writing' },
];

export const tags = [
	{ id: 1, name: 'React', postCount: 18 },
	{ id: 2, name: 'Next.js', postCount: 15 },
	{ id: 3, name: 'JavaScript', postCount: 22 },
	{ id: 4, name: 'TypeScript', postCount: 12 },
	{ id: 5, name: 'CSS', postCount: 14 },
];
