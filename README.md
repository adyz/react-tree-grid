# React tree grid (Flatten)
[![Build Status](https://travis-ci.org/adyz/react-tree-grid.svg?branch=master)](https://travis-ci.org/adyz/react-tree-grid)

## Usage
- Install this component `npm install react-tree-grid-flat`
- Install react-virtualized `npm install react-virtualized` (if not already installed)
- Import tree in your component `import VirtualTree from "react-tree-grid-flat";`
- Pass an array to it. `inteface Tree {...any, children: Tree[]}[]}`


## Expample
https://codesandbox.io/s/virtual-tree-from-npm-g0h7v

## Using this project as contributor
- Clone this project
- Create a new branch along the lines of `feature/newcomponent`
- Install dependencies `npm install`
- Start the local development environment running `npm run storybook`
- Add your changes
- Add tests for your changes
- If you add new component, make sure to add that in the storybook editing the `stories/index.js` file
- Add the changes to git with `git add -A .`
- Commit your change using "Angular Commit Message Conventions" ([Read more](https://gist.github.com/stephenparish/9941e89d80e2bc58a153)) using `npm run commit` and a wizard will guide you.
- Push the changes to origin and create a pull request.






