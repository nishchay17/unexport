# unexport

Find unused exports or unused packages in your project.

# How to install

```
npm install unexport --global
```

# How to use this project

1.  Install the project with "npm install unexport --global"
2.  Your project need to have unexport.json, you can auto generate using "unexport init"
3.  Run "unexport go" and find the unused exports and node modules

## Optional parameters

1. -p/--packages: show only unused installed packages
2. -f/--file: show only usused exports

_Note: Currently this project don't support alias or CommonJS module syntax (ie require)_
