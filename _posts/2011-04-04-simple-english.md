---
layout: post
title: Simple English
---

Simple english has only 800 words, and I've found an english -> basic english [translator](http://www.basic-english.org/down/idp.zip). I think it's a good vocabulary for a chatbot.

# Hypergraphs

I've been reading about hypergraphs, which is what OpenCog uses as a knowledge store. It's a graph where instead of edges being between nodes, edges can have have an infinite number of nodes. You could look at it as a 'set store', where you have many many sets of different 'strengths', surrounding a fixed pool of nodes. Anyway, I'm not totally sure I understand the theory, but it seems like an interesting idea.

My naive implementation of a knowledge store for a chatbot, is to create nodes for terms, and then have bidirectional relationships between terms, and relationships are strengthened when the analyser is fed two terms in sequence. As far as i can tell, this is like the hypergraphs.

# Metropolis-Hasting

After working on [Indigo Renderer](http://indigorenderer.com/) and having many conversations with Nick Chapman, I have a sense that when doing a random walk through the AI's knowledgebase, that it'd be worth calculating a probability that the  path would have been selected.

So for example - the AI queries it's knowledge store for the term 'dog', and the knowledge store would query for a thousand random chains of related terms from dog. It would then rank those chains in terms of likelihood of those chains having been taught to the machine.

So - train the bot:

    dog is animal
    dog is pet
    horse is animal
    
And the knowledge store might return:

    0.2 dog is animal
    0.2 dog is pet
    0.15 dog is animal is pet
    0.1 dog is animal is
    0.1 dog is pet is
    0.1 dog is pet is dog
    0.01 dog is animal is horse