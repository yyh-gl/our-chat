# TypeScript & Next.js Style Guide

This document outlines the coding standards and best practices for our Next.js project using TypeScript.

## Table of Contents
1. [TypeScript Conventions](#typescript-conventions)
2. [Next.js Architectural Patterns](#nextjs-architectural-patterns)
3. [Component Design](#component-design)
4. [State Management](#state-management)
5. [Styling Approach](#styling-approach)
6. [Common Pitfalls](#common-pitfalls)

## TypeScript Conventions

### Type Definitions
- Prefer explicit type annotations for function parameters and return types
- Use interfaces for object shapes that will be implemented or extended
- Use type aliases for unions, intersections, and complex types
- Avoid using `any` type; use `unknown` when type is truly uncertain
- Utilize generics for reusable components and functions

```typescript
// Good
interface User {
  id: string;
  name: string;
  email: string;
}

type UserResponse = User | null;

function fetchUser(id: string): Promise<UserResponse> {
  // implementation
}

// Bad
function fetchUser(id): any {
  // implementation
}
```

### Null and Undefined
- Use `undefined` for uninitialized values
- Use `null` for intentionally absent values
- Always use strict null checking (tsconfig: `strictNullChecks: true`)
- Use optional chaining (`?.`) and nullish coalescing (`??`) operators

### Naming Conventions
- Use PascalCase for types, interfaces, classes, and React components
- Use camelCase for variables, functions, and methods
- Use UPPER_SNAKE_CASE for constants
- Prefix interfaces with `I` only when necessary to avoid naming conflicts
- Prefix private properties with `_` to indicate they shouldn't be accessed directly

## Next.js Architectural Patterns

### Project Structure
- Follow the App Router pattern with the `/app` directory
- Group related files by feature or route
- Use the following directory structure:
  ```
  app/
    (routes)/
      page.tsx
      layout.tsx
    components/
      ui/         # Reusable UI components
      features/   # Feature-specific components
    lib/          # Utility functions and shared code
    hooks/        # Custom React hooks
    types/        # TypeScript type definitions
    api/          # API client code
  ```

### Data Fetching
- Prefer server components for data fetching when possible
- Use React Query for client-side data fetching and caching
- Implement proper error handling and loading states
- Utilize Next.js's built-in data fetching methods:
  - `getServerSideProps` for server-side rendering
  - `getStaticProps` for static site generation
  - `getStaticPaths` for dynamic routes with SSG

### Routing
- Use file-based routing with the App Router
- Implement dynamic routes with the `[param]` syntax
- Use route groups with parentheses `(group)` for organization without affecting URL structure
- Implement proper loading and error states for each route

## Component Design

### Functional Components
- Always use functional components with hooks instead of class components
- Use arrow functions for component definitions
- Destructure props in the function parameters

```
// Good: Arrow function with destructured props
const UserProfile = ({ user, onUpdate }) => {
  // Component implementation
};

// Bad: Traditional function with props object
function UserProfile(props) {
  const { user, onUpdate } = props;
  // Component implementation
}
```

### Component Organization
- Keep components small and focused on a single responsibility
- Extract reusable logic into custom hooks
- Separate UI components from container components
- Use composition over inheritance

### Props
- Define prop types with TypeScript interfaces
- Use default props when appropriate
- Avoid excessive prop drilling; consider context or state management solutions

## State Management

### Local State
- Use `useState` for simple component state
- Use `useReducer` for complex state logic
- Prefer multiple simple state variables over complex state objects

### Global State
- Use React Context for state that needs to be accessed by many components
- Consider using Zustand or Redux Toolkit for more complex state management
- Keep global state minimal and focused

## Styling Approach

### CSS Modules
- Use CSS Modules for component-specific styles
- Name CSS files with the `.module.css` extension
- Use semantic class names based on the component's purpose, not appearance

### Tailwind CSS
- Follow utility-first approach
- Extract common patterns into reusable components
- Use consistent spacing and sizing scales

## Common Pitfalls

### TypeScript Pitfalls
- Avoid type assertions (`as`) when possible; use type guards instead
- Be cautious with type narrowing in conditional blocks
- Don't use `!` non-null assertion operator unless absolutely necessary
- Avoid excessive type complexity; simplify when possible

### React/Next.js Pitfalls
- Avoid direct DOM manipulation; use refs when necessary
- Don't use `useEffect` for data fetching in server components
- Prevent unnecessary re-renders by memoizing with `useMemo` and `useCallback`
- Be mindful of the difference between server and client components

### Performance Considerations
- Implement proper code-splitting with dynamic imports
- Use `React.memo` for expensive components that render often
- Optimize images using Next.js Image component
- Implement virtualization for long lists

---

This style guide is a living document and should be updated as best practices evolve and new patterns emerge in the TypeScript and Next.js ecosystem.
