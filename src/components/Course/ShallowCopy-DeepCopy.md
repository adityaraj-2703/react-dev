### Shallow Copy
(only the first level is copied, nested objects are still references)

#### Spread Operator
```
const shallowObj = { ...originalObj };
const shallowArr = [ ...originalArr ];
```

#### Object.assign

```
const shallowObj = Object.assign({}, originalObj);
```
#### Array slice

```
const shallowArr = originalArr.slice();
```

### Deep Copy
(copies nested objects/arrays too)

#### JSON Methods (simple, but loses functions and special values like Date)

```
const deepCopy = JSON.parse(JSON.stringify(originalObj));
```
#### structuredClone (modern JS)
```
const deepCopy = structuredClone(originalObj);
```
#### Lodash cloneDeep
```
import _ from "lodash";
const deepCopy = _.cloneDeep(originalObj);
```