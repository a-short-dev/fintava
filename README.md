## Fintava

Nodejs Api Wrapper for [Fintava](https://fintavapay.com/).

## Installation

```js
npm install fintava
pnpm add fintava
```

## Usage

```ts
import Fintava from "fintava";


const fintava = new Fintava(
    apiKey: process.env.FINTAVA_API_KEY,
    env: "test",
);
```

### Resources

- customer
  - create
  - get
  - list
  - update
