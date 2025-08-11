# Questions:

## 1. JSX
JSX is a syntax extension for JavaScript that allows writing UI elements in a format that looks similar to HTML. It looks like HTML code but is not actual HTML. Behind the scenes, JSX is compiled into React.createElement() calls, which produce JavaScript objects describing the UI.

## 2. State vs Props
State is data that belongs to a specific component and can change during the component’s lifecycle. Props are data passed from a parent component to a child. Props are read-only, meaning a component should never directly modify them. State can be updated using React hooks or setState in classes. State is controlled internally by the component itself, while props are controlled externally by whatever renders the component.

## 3. Controlled vs Uncontrolled Components
In a controlled component, the form data is handled by React state, and any input changes trigger state updates. In an uncontrolled component, the form data is handled directly by the DOM, often using ref to access values.

## 4. useState
useState takes an initial value and returns an array containing the state variable and the function to update it The setState function is asynchronous, meaning updates may be batched for performance and won’t reflect immediately after calling it. There are two ways to update state: by passing a new value directly, or by passing a callback function that receives the previous state and returns the new one.

## 5. useEffect
useEffect is used for side effects like API calls, subscriptions, or modifying the DOM. It accepts a function and a dependency array. If no dependency array is provided, it runs after every render. If it’s empty [], it runs only once after mount. If it contains variables, it runs when any of them change. It can return a cleanup function to run when the component unmounts or before the effect re-runs.

## 6. useMemo & useCallback
useMemo caches a calculated value so it doesn’t get recalculated unnecessarily. useCallback caches a function to prevent it from being recreated every render. Both use a dependency array to decide when to recalculate or recreate the value/function.

## 7. Class Components vs Functional Components
Class components use ES6 class syntax, require render() method, and use lifecycle methods (componentDidMount, componentDidUpdate, etc.). Functional components are plain JavaScript functions and use hooks (useEffect, useState) instead of lifecycle methods. Class components rely on this keyword for accessing state and props, while functional components don’t. Functional components manage state via hooks, class components use this.state and setState().

## 8. PureComponent
PureComponent is a React class that implements shouldComponentUpdate() by default to skip re-renders if props and state haven’t changed. It uses shallow comparison of props and state. Works best with immutable data structures so changes can be detected easily.

## 9. Props Drilling
Props drilling happens when data is passed down multiple layers of components unnecessarily. This can make code hard to maintain and debug, especially when intermediate components don’t use the data. The Context API or state management libraries like Redux can help avoid this problem.

## 10. useRef
useRef provides a .current property to store a value that persists across renders. It’s mutable and updating it does not trigger a re-render. Commonly used to reference DOM elements or store values like timers and previous state without causing re-renders.