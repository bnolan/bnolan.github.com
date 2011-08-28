---
layout: post
title: Detecting phonegap
---

With my capt apps, I do most of the development and testing using the desktop safari browser, and then move onto testing on actual devices later on, once I've got the app mostly working. I use this fragment of code to detect if I'm running inside phonegap, or if it's a desktop browser, and then instantiate my app appropriately.

    function onDeviceReady(){
      window.app = new Application;
      app.start();
    }

    if(window.PhoneGap){
        document.addEventListener("deviceready",onDeviceReady,false);
    }else{
      $(document).ready(function(){
        onDeviceReady();
      });
    }

The window.app style of encapsulating my apps has worked well for me in apps I've built using `capt` and `backbone`, I still haven't got to the point of encapsulating everything (all classes are copied into the window scope for example).
