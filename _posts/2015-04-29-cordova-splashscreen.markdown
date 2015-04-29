---
layout: post
title:  "(cordova, splashscreen, 0) Splash screen doesn't shown..."
date:   2015-04-29 10:05:49
categories: blog programming cordova
---
Sometimes I had some problems to show the splash screen on some cordova projects.

Most of the times the images were linked properly in the **config.xml** file
and the plugin was correctly added and compiled,
so the problem was in another part and after several attempts and online 
searches I realized that the mistake was to not have written the
following preference:

{% highlight xml %}
<preference name="SplashScreen" value="screen" />
{% endhighlight %}

This have to be checked immediately, especially if you are working in a 
project made from someone else.
