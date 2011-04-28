---
layout: post
title: Proof of work in Javascript
---

[Proof of work](http://www.thefengs.com/wuchang/work/puzzles/globalinternet08_kapow.pdf) is the idea of getting a client to do some computational work that is expensive to perform, but cheap to verify.

For example - if you send a client a random number, and then ask the client to keep increasing that number until the md5 hash of the number starts with four zeroes, it will take on average 2^16 attempts to find the matching number. Then the client sends the number back to the server and the server verifies that the hash starts with 0000...

The idea is to make the computation expensive enough that it makes it less worthwhile for spammers to attack your system. It's a nice alternative to a captcha because it doesn't require any user intervention. 

# Example proof-of-work solver

    var x = parseInt(Math.random() * 0xFFFFFFFF),
      doWork = function(){
        var count = 100, y, h;
        while(--count > 0){
          x += 1;
          y = x.toString();
          h = hex_md5(y);
          if(h.match(/^0000/)){
            console.log("Solved... " + x);
            return;
          }
        }
        setTimeout(doWork, 25)
      };

    doWork();

This code generates a random number, then increases it until a suitable hash is found. The work unit is broken up into 100 tests at a time, with a timeout between subsequent work so that the browser doesnt warn about script timeouts. This runs fine on a modern browser, but I imagine it would nail ie6. For production code you'd probably want to profile the doWork function and adapt the work unit size to keep the browser responsive.

# Native solvers

One of the obvious downsides is that any javascript implementation of a hashing function is going to be much slower than a native implementation, so if a spammer wrote a native solver for your proof-of-work, they would be able to trivially solve your work requests.

For example - firefox takes about 8 seconds to solve my proof of work prototype, firefox takes about 6 seconds, and ruby can solve it in 0.23 seconds.

# Alternative work algorithms

Many hashes is a well known and provably computationally difficult proof-of-work technique, but given the problem that a browser will never be able to solve them as fast as a modern GPU, it would be worth investigating other work that a browser could solve that could not be solved faster by any other method, for example calculating the size of an HTML layout.

