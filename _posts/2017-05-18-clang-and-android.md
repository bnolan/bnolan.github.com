---
layout: post
title: "Clang and Android"
---
 
As my side project, I've been working on a [c++ renderer](http://fontus.bennolan.com/) for [a-minus scenes](http://fontus.bennolan.com/a-minus.html). This has been a super fun project, using c++11, three.cpp and opengl to make a pretty lightweight and nice and speedy renderer.

I've written renderers for xml markup before using unity, but I don't really enjoy using unity that much, because it's quite far away from my ideal toolchain (git, command line and sublime text). Using c++11 and cmake, I've been enjoying developing on the command line. I still have to dig out an IDE from time to time (like using xcode to get proper stack traces), but mostly it's been all command line (so in theory I can automate the builds on CI). A lot of unity debugging is 'do all this in the gui and it'll work again', I much prefer the 'search for error, find answer on stack overflow, copy paste' style development that I get with C++.

Also, c++ is super fast, and it's really easy to merge in helper c libraries (like the tiny html renderer, [litehtml](https://github.com/litehtml/litehtml) that i use).

Anyway, last night and today, I've been trying to get my project to build for android. After a few false starts last night, I realised that I can't get it to build using a `Cmake` (sdl only has `ndk-build` support), but after fighting that losing battle for a while (I really wanted to be able to use one set of cmake files for all platforms, but cest la vie), I've finally got the app *starting* to compile - even if the clang version for ndk refuses to enable c++11 support:

    error: no type named 'unique_ptr' in namespace 'std'
    std::unique_ptr<std::stringstream> stream;

I feel like this is going to be a long battle, but I'll keep at it, and hopefully I'll have a gear vr build of Fontus in a week or so.