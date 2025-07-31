# React Homework Answers

## 1. The Two Forms of `setState` Argument
React provides two main ways to update state:

### Object Form
You pass an object directly.  
- In **class components**, this object is merged into the current state.  
- In **functional components** (using `useState`), the object replaces the state.

```jsx
// Functional component
const [count, setCount] = useState(0);
setCount(5); // sets count to 5

// Class component
this.setState({ name: "Aditya" });
```

### Function (Updater) Form
You pass a function that receives the previous state (and props in class components).  
This prevents stale state issues when multiple updates occur quickly.

```jsx
// Functional component
setCount(prev => prev + 1);

// Class component
this.setState((prevState, props) => ({
  count: prevState.count + props.increment
}));
```

**Difference:**  
- **Object Form:** Directly applies the new state.  
- **Function Form:** Ensures updates always use the latest state, crucial in async or batched updates.

---

## 2. State Update Batching
**Definition:**  
State update batching is when React groups multiple state updates that occur in the same event loop into a single re-render, improving efficiency.

```jsx
function Example() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(c => c + 1);
    setCount(c => c + 1);
  }

  return <button onClick={handleClick}>Count</button>;
}
```

- **Without batching:** React would re-render twice.  
- **With batching:** React applies both updates together, resulting in only one render and `count` increasing by 2.  

**Why:**  
It avoids unnecessary re-renders, improving performance.

---

## 3. React Lifecycle
**Definition:**  
The React lifecycle describes the stages a component goes through: mounting, updating, and unmounting. It defines methods (in class components) for running code at each stage.

### Phases

#### 1. Mounting  
When the component is created and inserted into the DOM.  
- `constructor()` - initialize state and bind methods  
- `render()` - returns JSX to display  
- `componentDidMount()` - runs once after mounting  

#### 2. Updating  
Triggered when state or props change.  
- `shouldComponentUpdate()` - decides if re-render should occur  
- `render()` - outputs new UI with updated state/props  
- `componentDidUpdate()` -runs after updates are applied  

#### 3. Unmounting  
When the component is removed from the DOM.  
- `componentWillUnmount()` - cleanup (e.g., stop timers, remove listeners)  

**Summary:**  
The lifecycle ensures components initialize, update predictably, and clean up resources when removed.

---

## 4. Immutability in One Sentence
**Definition:**  
Immutability means creating a new object or array instead of modifying the existing one, so React can detect changes by comparing references.

```jsx
// ❌ Mutable (bad)
state.items.push("newItem");

// ✅ Immutable (good)
setItems(prev => [...prev, "newItem"]);
```
