---
layout: post
title: "Tesseract and Postgres Trigrams"
---
 
I was chatting with [@nicobrevin](https://twitter.com/nicobrevin) at the pub the other week, and we were discussing idea for interesting side projects, and we went back and forth over email for a few weeks, until we came across the idea of building some kind of tool around scanning and OCRing your shopping receipts.

Nick thought we could do something around analysis of how you spend your money (a histogram of how much you spend on beer over the course of a year?) and I thought we could maybe do something to make expense reporting easier (which is a bit of a silly idea really, since there are about a dozen xero-add-ins that already do receipt scanning via an app), so although I couldn't see a clear way to make money from receipt-OCR-ing, it did seem like a fun project, and there was some cool technology to play around with.

# Tesseract

[Tesseract](http://code.google.com/p/tesseract-ocr/) is 'probably the most accurate open source OCR engine available'. I've been using it in a very simple mode, where I take a photo with my nexus 4 (not the worlds best camera), run the image through autolevels using imagemagick, then send it through tesseract. The accuracy isn't amazing, but it's pretty good given the circumstances. Out of the box, the accuracy is good enough to pull prices out of the receipt. Nick has been doing a bit of work on training the software to recognize supermarket receipts directly, and the accuracy he's got (out of flatbed scanned receipts admittedly) is really impressive, close to 99% recognition.

# Postgres Trigrams

One of the things I wanted to do with the app, was the ability to scan all your receipts you get for warranty purposes, and be able to scan back over time with them, basically do a fulltext search on your purchases, so that I could easily find the receipt for that macbook case or whatever. The only problem is, with the OCR results I was getting from the nexus's camera, you couldn't really do a fulltext search since the line for a Tuatara Pilsner might look like:

    TUOTARA 6xPack $18.99
  
Happily, I had been reading about the [Postgres Trigram extension](http://www.postgresql.org/docs/9.1/static/pgtrgm.html), which even has a mode that uses GIST indexes to speed up similarity queries. You can now do something like:

    select * from receipts where similarity(content, 'tuatara') > 0.3
    
And that lets you do a index-scan fuzzy search of all your receipts. I thought this was pretty cool, by combining `similarity` queries, with Nicks improved OCR rules, you would have a searchable list of all your indexes.

# Writing an Android app

Currently I've got a rails webapp that uses html5 to capture images from my Nexus's camera, and upload them to the server for Tesseract. However, I'd like to do some processing (autolevels, greyscale, resample) on the mobile before I upload (raw uploads are 4mb, which is pretty slow over 3g, and I think sub 400k uploads should be possible), so this seems like a good opportunity to sharpen up my Android chaps with an Android app.

# Foursquare integration?

If I knock out an app, I was thinking I might use foursquare to suggest nearby venues when you upload a receipt, then you'd have receipts tagged to the place you bought your goods

# What do you think?

Can you see any weight in this idea? Might be worth expanding upon - what would you do if you had a fully searchable list of all your purchases over the last year? We also reached out to the guys at [Paperkut](http://www.paperlessreceipt.com/), since they're doing something really interesting about getting your receipts emailed to you, which would obviously cut out the middle man of having to scan in your receipts.