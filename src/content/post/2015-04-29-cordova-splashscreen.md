+++
author = "Mirco Tracolli"
title = "Splash screen doesn't show"
date = "2015-04-29"
description = "Splash screen doesn't show"
tags = [
    "cordova",
]
categories = [
    "blog",
    "programming",
    "cordova",
]
+++

Sometimes I had some problems to show the splash screen on some cordova projects.

Most of the times the images were linked properly in the **config.xml** file
and the plugin was correctly added and compiled,
so the problem was in another part and after several attempts and online 
searches I realized that the mistake was to not have written the
following preference:

```xml
<preference name="SplashScreen" value="screen" />
```

This has to be checked immediately, especially if you are working in a 
project made by someone else.
