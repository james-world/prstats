# Introduction

This Azure DevOps extension adds a "PR Stats" menu entry to the Repos menu that lists out pull requests and displays their age.

## How to compile extension

1. Use `npm run build` to compile the solution using webpack.
2. Use `npm run package` to package the solution into a .vsix file using the tfx utility - this will also update the `vss-extension.json` file by bumping the package version. All packages uploaded to Azure DevOps marketplace must have a unique version number.