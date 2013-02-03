---
layout: post
title: Designing without thinking
---

When you're working on a hard project where the functionality is spread across several files and modules, and you need to do some rearchitecture. I'll often sit down, work out how I want it to work, then zone out and just refactor without reading the code on the page. Old-school lispers are famous for this, they can work out when to refactor and where the code is unbalanced by looking at the *shape of the code*, due to all the parentheses. I do a similair thing, relying on syntax highlighting and compile-on-save to point out when I've broken something.

The second case is when you're prototyping a project, and you have to force yourself to not overthink things, to prevent becoming an 'architecture astronaut' (abstracting everything away into a GenericFactoryFactoryGenereratorCreator), and instead just deciding 'I want to to X, so I'll copy this code here and just search / replace until everything works'. I've been doing a bunch of this lately with a backbone mobile project I'm working on. I've got about a dozen lines of code that I'm copying and pasting into every model I create. I *should* create a new base class, and inherit from that, instead of cargo-culting (which is error prone and tedious), but I'm not going to do that until copying/pasting becomes unbearably tedious. By refactoring prematurely, I'm bound to make annoying assumptions that I'll end having to code around anyway. So don't overthink it and just copy / paste away until the extraction to make is painfully clear.

Obviously both of these techniques only work in a well tested environment, and I can put aside some time the next day to go over what you did and identify the bits that were left out or done badly.

Oh - and there is obviously that third type of coding without thinking, which is when you need to get something done that you really don't want to, so you grab a few beers and create variables named `the_variable_which_is_a_number_and_gets_incremented`.