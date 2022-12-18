# IBAN Server

This is a Node.js webserver to validate IBAN Codes. The server is built in Typescript
on top of [Fastify](https://www.fastify.io/docs/latest/Guides/Getting-Started/).

## Environment

Environment variables are parsed at startup. There are no defaults, make sure you have your variables in place. The watch scripts import a `.env` file if you have any present.

## Development

```
npm run watch:ts
npm run watch:js

(or to do both at the same time)

npm run watch
```

## Tests

We use [Ava](https://github.com/avajs/ava/blob/main/docs/01-writing-tests.md) for the tests.

```
npm run watch:ts
npm run test:watch
```

## Module Structure

The architecture is split into self contained modules, at the moment we only have an IBAN Module,
but further development should try to follow that architecture.

A module follows this pattern:

```
awesomeModule/
├── _private
│   ├── measureAwesomeness.ts
│   ├── measureAwesomeness.test.ts
│   ├── generateAwesomeness.ts
│   ├── generateAwesomeness.test.ts
│   └── types.ts
└── index.ts
```

All the public parts of the module are exported from `index.ts`, by directly reexporting it from the `_private` folder. Some examples:

```ts
// Make a single function public
export { measureAwesomeness } from "./_private/measureAwesomeness.js";

// Make all exports public under a single Namespace
export * as GenAwessome from "./_private/generateAwesomeness.js";

// Make everything public without Namespace
export * from "./_private/generateAwesomeness.js";
```

Other parts of the system should never import from the `_private` folder. We don't have a Linter in place for that yet, be good.
