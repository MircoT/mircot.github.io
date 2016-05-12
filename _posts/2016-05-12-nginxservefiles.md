---
layout: post
title:  "(server, web, nginx) Serve only some files by exension"
date:   2016-05-12 09:00:00
categories: server web
---

Often I manage websites that use *bower* as package manager and I don't want to grant the access to all the packages installed, so I have to filter the file served by nginx. You can see the regex of the service in the next snippet of code:

{% highlight nginx %}
server {
    listen  80  ssl;
    server_name localhost;

    location ~* ^/mywebsite/(.*)\.(html|htm|js|css|png|jpe?g|ico|gif|eot|ttf|woff)(.*)$ {
        alias /path/to/my/static/www/;
        
        try_files $1.$2$3 =404;
    }
}
{% endhighlight %}

So the website `http://mydomain.domain/mywebsite/` is the base *URL*, what remains of the string is divided in three parts: file name, extension, query.

File name is a string composed by any characters: `http://mydomain.domain/mywebsite/filename`. After this you have to find a point and a valid extension: `http://mydomain.domain/mywebsite/filename.html`. In the end you can find also some query string: `http://mydomain.domain/mywebsite/filename.html?param1=test`.

As you can see in the last *URL* example (`http://mydomain.domain/mywebsite/filename.html?param1=test`) the three parts are:

 1. filename
 2. html
 3. ?param1=test
 
At this point I try to serve the file composed with these three components `try_files $1.$2$3` otherwise I will return a not found error `=404`. The files will be searched in the path indicated in alias, that correspond to the main folder of the website.

The third component is useful for some *URL* that require some file with a parameter, like bootstrap fonts.

If you need some help to start with **nginx** take a look to this [tutorial](https://www.digitalocean.com/community/tutorials/understanding-nginx-server-and-location-block-selection-algorithms).