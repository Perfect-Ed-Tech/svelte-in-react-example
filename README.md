# Svelte component in React example

## Getting started

```bash
# install node modules
yarn install

# start dev server
yarn start
```

## How to set it up in already existing create-react-app project

### 1. Setup `react-app-rewired` and add `svelte-loader` to webpack

```bash
# install react-app-rewired
yarn add react-app-rewired --dev

# create config-overrides.js file
touch config-overrides.js
```

update package.json scripts to use `react-app-rewired` instead of `react-scripts`
```json
{
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
}
```

add webpack config for svelte-loader to `config-overrides.js` file
```javascript
const path = require('path')

module.exports = function override(config, env) {
  config.resolve.alias.svelte = path.resolve('node_modules', 'svelte');
  config.resolve.extensions.push('.svelte');
  config.resolve.mainFields = ['svelte', 'browser', 'module', 'main'];
  
  config.module.rules = config.module.rules.map(rule => {
    if (rule.oneOf instanceof Array) {
      return {
        ...rule,
        oneOf: [
          {
            test: /\.svelte$/,
            use: {
              loader: 'svelte-loader'
            }
          },
          ...rule.oneOf
        ]
      };
    }
    return rule;
  })

  return config;
}
```

### 2. Install `svelte-adapter` and start using Svelte components in React :)

install `svelte-adapter`
```bash
yarn add svelte-adapter
```

write a sample Svelte component
```svelte
<script>
  import { createEventDispatcher } from 'svelte';
  export let name;

  const dispatch = createEventDispatcher();
  function sayHello() {
    dispatch('message', {
      text: 'Hello from Svelte!'
    });
  }
</script>

<p>Hello {name} from Svelte</p>
<button on:click={sayHello}>Click me!</button>

<style>
  p {
    color: orange;
    font-size: 2rem;
    font-weight: 700;
  }
</style>
```

use it like this in React
```javascript
import React from 'react';
import toReact from 'svelte-adapter/react';

import HelloComponent from './Hello.svelte';
const Hello = toReact(HelloComponent, {}, 'div');

function ReactComponent = () => {
  return (
    <div>
      <h1>React Component</h1>
      <Hello name="World" onMessage={(event) => alert(event.detail.text)} />
    </div>
  )
}
```
