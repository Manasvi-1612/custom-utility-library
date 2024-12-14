# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Configure project

### Setup vite project:

```
npm create vite@latest
cd my-project
```

Change my-project with the name of your project.

### Run:

`npm install`
`npm run dev`
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Install Tailwind CSS:

```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Install tailwindcss and its peer dependencies, then generate your `tailwind.config.js` and `postcss.config.js` files.

### Configure Template:

Add the paths to all of your template files in your tailwind.config.js file.
`tailwind.config.js`

```
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Add the Tailwind directives to your CSS

`index.css`

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Add the @tailwind directives for each of Tailwind’s layers to your ./src/index.css file.

## Configure `custom-utility-library`

### Installation

```
npm i @manasvi-1612/custom-utility-library
```

For more info visit [https://www.npmjs.com/package/@manasvi-1612/custom-utility-library](https://www.npmjs.com/package/@manasvi-1612/custom-utility-library)

### Update `src/index.css`

Add import as:

```
@import "@manasvi-1612/custom-utility-library/styles.css";
```

### import Button Component - `App.tsx`

```
import { Button } from "@manasvi-1612/custom-utility-library";

function App() {
  return (
    <>
      <Button>
        Hello
      </Button>
    </>
  )
}

export default App

```

#### Customization:

```
import { Button } from "@manasvi-1612/custom-utility-library";

function App() {
  return (
    <>
      <Button variant={'ghost'} className="bg-fuchsia-300 text-black">
        Hello
      </Button>
    </>
  )
}

export default App
```
