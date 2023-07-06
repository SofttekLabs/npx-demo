# NPX CLI tool

Example of how to create a NodeJS CLI tool comparable to create-react-app

> based on https://blog.shahednasser.com/how-to-create-a-npx-tool/#use-your-published-package


## Setup
NPM project, with a Typescript configuration

tsconfig.json
```json
{
    "compilerOptions": {
        "target": "ES2020",
        "module": "commonjs",
        "declaration": true,
        "outDir": "./dist",
        "strict": true
    },
    "include": [
        "src"
    ],
    "exclude": [
        "node_modules",
        "**/__tests__/*"
    ]
}
```

`src/index.ts` will be the entry point of our CLI, here I'll use yargs to get the input params.
- `command` the instruction to run
- `args` the arguments for said command

### IMPORTANT
Add this line to the `index.ts` file, because it is needed for the CLI tool to work. It will tell the system to use node to run this file
```
#! /usr/bin/env node
```

You'll need to set the CLI as public, because private packages require payment or complex setup. So in `package.json`. The command line always tries to publish in private mode by default. You must explicitly set your package as public.
```json
{
    ...
    "publishConfig": {
        "access": "public"
    }
    ...
}
```

### Private package
If you have a paid plan in npmjs.com then you can publish private packages. The changes in `package.json` are:
```json
{
    "name": "@fridaplatform-stk/runnable-demo", // @scope/package-name
    ...
    "publishConfig": {
        "access": "private"
    }
    ...
}
```

## Publish
> You'll need a unique name for the package, check npmjs.com.

Add a script to build the project whenever you attempt to publish.
```json
{
    ...
    "scripts":{
        ...
        "prepublishOnly": "npm run build"
    }
}
```
Login
```
npm login
```

then publish it, remember to patch the package version
```ps
## npm version patch
npm publish
```

### Access control

After publishing your package, if it is private, nobody will be able to use it (besides you) unless you give them access. You should explore how to do that in npmjs docs.

However, in our Softtek Innovation team we created an organization `@fridaplatform-stk`. An admin can invite you to the organization OR share `fridaplatform`'s credentials (our generic username).

## Example
This repo is a real example of a CLI.

There are three commands available
- sum
- mult
- salute (no args)

The CLI expects args to be an array of numbers, and will output the result of the selected operation (except salute)

Example
```cmd
npx @gantonioid/runnable-demo --command sum --args [1,2,3]
## Expected output: 6

npx @gantonioid/runnable-demo --command mult --args [2,2,2,2,2]
## Expected output: 32

npx @gantonioid/runnable-demo --command salute
## Expected output: hello world
```