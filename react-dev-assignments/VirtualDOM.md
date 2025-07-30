# React Homework July-28-2025

## 1. What is Virtual DOM?
The Virtual DOM is a lightweight in-memory representation of the actual DOM. It allows React to make changes efficiently without directly updating the real DOM each time.

## 2. Why does React use it?
React uses the Virtual DOM to improve performance. Updating the real DOM is slow, so React minimizes costly operations by batching and applying only the necessary changes.

## 3. How does it work?
When a component’s state or props change, React creates a new Virtual DOM tree. It then compares it with the previous one using a process called *diffing*. Only the differences are updated in the real DOM, making updates fast and efficient.