import matter from 'gray-matter';
import { BlogPost, BlogMetadata } from '@/types/blog';

// Updated sample posts with Molathoti Sarath as author and removed cover images
const samplePosts: BlogPost[] = [
  {
    slug: 'getting-started-with-react',
    title: 'Getting Started with React: A Comprehensive Guide',
    date: '2024-01-15',
    author: 'Molathoti Sarath',
    category: 'React',
    tags: ['React', 'JavaScript', 'Frontend', 'Beginner'],
    excerpt: 'Learn the fundamentals of React.js and build your first component. This comprehensive guide covers everything you need to know to get started with React development.',
    content: `# Getting Started with React: A Comprehensive Guide

React is a powerful JavaScript library for building user interfaces. In this guide, we'll explore the fundamentals and build your first component.

## What is React?

React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components."

## Key Concepts

### 1. Components

Components are the building blocks of React applications. They're like JavaScript functions that return JSX.

\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}
\`\`\`

### 2. JSX

JSX is a syntax extension for JavaScript that looks similar to HTML.

\`\`\`jsx
const element = <h1>Hello, world!</h1>;
\`\`\`

### 3. Props

Props are how components receive data from their parent components.

\`\`\`jsx
function UserCard({ name, email, avatar }) {
  return (
    <div className="user-card">
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
}
\`\`\`

### 4. State

State allows components to manage their own data and re-render when it changes.

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## Building Your First Component

Let's create a simple Todo component:

\`\`\`jsx
import { useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="todo-app">
      <h1>My Todo App</h1>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
\`\`\`

## Next Steps

Now that you understand the basics, here are some next steps:

1. **Learn about useEffect** - For handling side effects
2. **Explore React Router** - For navigation in single-page applications
3. **State Management** - Learn about Context API or Redux
4. **Testing** - Write tests for your components
5. **Performance** - Learn about React.memo and useMemo

## Conclusion

React is a powerful tool for building modern web applications. With these fundamentals, you're ready to start building your own React applications!

Happy coding! 🚀`,
    readingTime: 8
  },
  {
    slug: 'modern-javascript-features',
    title: 'Modern JavaScript Features Every Developer Should Know',
    date: '2024-01-10',
    author: 'Molathoti Sarath',
    category: 'JavaScript',
    tags: ['JavaScript', 'ES6', 'Modern JS', 'Programming'],
    excerpt: 'Explore the latest JavaScript features that will make your code more efficient and readable. From arrow functions to async/await, master modern JS.',
    content: `# Modern JavaScript Features Every Developer Should Know

JavaScript has evolved significantly over the years. Let's explore the modern features that every developer should master.

## Arrow Functions

Arrow functions provide a more concise way to write functions:

\`\`\`javascript
// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// With single parameter
const square = x => x * x;

// With no parameters
const greet = () => console.log('Hello!');
\`\`\`

## Destructuring

Extract values from arrays and objects:

\`\`\`javascript
// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];

// Object destructuring
const { name, age, email } = user;

// With default values
const { theme = 'light', language = 'en' } = settings;
\`\`\`

## Template Literals

Create strings with embedded expressions:

\`\`\`javascript
const name = 'John';
const age = 30;

// Template literal
const message = \`Hello, my name is \${name} and I'm \${age} years old.\`;

// Multiline strings
const html = \`
  <div>
    <h1>\${title}</h1>
    <p>\${content}</p>
  </div>
\`;
\`\`\`

## Async/Await

Handle asynchronous operations more elegantly:

\`\`\`javascript
// Promise-based approach
function fetchUserData(id) {
  return fetch(\`/api/users/\${id}\`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.error(error));
}

// Async/await approach
async function fetchUserData(id) {
  try {
    const response = await fetch(\`/api/users/\${id}\`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
\`\`\`

## Spread Operator

Expand arrays and objects:

\`\`\`javascript
// Array spreading
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];

// Object spreading
const user = { name: 'John', age: 30 };
const updatedUser = { ...user, email: 'john@example.com' };
\`\`\`

## Optional Chaining

Safely access nested properties:

\`\`\`javascript
// Without optional chaining
if (user && user.address && user.address.street) {
  console.log(user.address.street);
}

// With optional chaining
console.log(user?.address?.street);

// With arrays
console.log(users?.[0]?.name);

// With function calls
user?.getName?.();
\`\`\`

## Nullish Coalescing

Provide default values for null or undefined:

\`\`\`javascript
// Using || (can be problematic with falsy values)
const value1 = someValue || 'default';

// Using ?? (only null/undefined trigger default)
const value2 = someValue ?? 'default';

// Examples
console.log(0 ?? 'default'); // 0
console.log(null ?? 'default'); // 'default'
console.log(undefined ?? 'default'); // 'default'
\`\`\`

## Conclusion

These modern JavaScript features make code more readable, maintainable, and efficient. Start incorporating them into your projects today!`,
    readingTime: 6
  }
];

export function getAllPosts(): BlogPost[] {
  return samplePosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return samplePosts.find(post => post.slug === slug);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return samplePosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
}

export function getPostsByTag(tag: string): BlogPost[] {
  return samplePosts.filter(post => post.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
}

export function searchPosts(query: string): BlogPost[] {
  const lowercaseQuery = query.toLowerCase();
  return samplePosts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.content.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

export function getCategories(): string[] {
  const categories = new Set(samplePosts.map(post => post.category));
  return Array.from(categories).sort();
}

export function getAllTags(): string[] {
  const tags = new Set(samplePosts.flatMap(post => post.tags));
  return Array.from(tags).sort();
}

export function getRelatedPosts(currentPost: BlogPost, limit: number = 3): BlogPost[] {
  return samplePosts
    .filter(post => post.slug !== currentPost.slug)
    .filter(post => 
      post.category === currentPost.category ||
      post.tags.some(tag => currentPost.tags.includes(tag))
    )
    .slice(0, limit);
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}