+++
author = "Mirco Tracolli"
title = "Unknown compiler option 'p'"
date = "2015-08-31"
description = "Unknown compiler option 'p'"
tags = [
    "javascript",
    "typescript",
    "vscode",
]
categories = [
    "blog",
    "programming",
    "VSCode",
]
+++

I was trying [VS Code](https://code.visualstudio.com/) on windows, setting up a project with *TypeScript* when I received this error:

```bash
error TS5023: Unknown compiler option 'p'.
```

This was a big surprise because the parameter is also present in the [documentation](https://github.com/Microsoft/TypeScript/wiki/tsconfig.json).

After some attempts I figured out that *VS Code* was using a different executable for *TypeScript*, that was installed with **Microsoft SDKs** (and obviuosly was an older version... **1.0.3** instead of **1.5.3** on **npm**). So I had to remove that **tsc** *environment* from the **System PATH** to work with the correct version installed by **npm**, as they suggest on the [official web page](http://www.typescriptlang.org/#Download).
