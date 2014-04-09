---
layout: post
title: "Parsing scene files using dom-lite"
---
 
So, I went to [Monterey](http://zoomin.co.nz/wellington/newtown/rintoul+street/4/-monterey/) with Rissa last night and drunk a few beers and had a hack at using [dom-lite](https://www.npmjs.org/package/dom-lite) to provide a dom interface to my scene nodes. While I was working on it, I came across [micro-dom](https://www.npmjs.org/package/micro-dom) which uses `htmlparser2` to parse html and turn it into dom-lite nodes. So I decided to replace my handwritten scene parser with htmlparser2.

The full code that I used to prototype the ideas is in this [gist](https://gist.github.com/anonymous/10329377). First up I created a class Element, that extended from HTMLElement, and I could add my own getters, setters and other handy methods too.

    class Element extends HTMLElement
      @getter 'innerXML', -> @innerHTML
      @getter 'outerXML', -> @outerHTML
      @setter 'innerXML', (xml) -> @_setInnerXML(xml)
      @setter 'outerXML', (xml) -> @_setOuterXML(xml)

Because I'm working with XML (or SceneML, or whatever I want to call the scenefile descriptions), I proxy the innerHTML methods and call them innerXML. Something that mv-server has to do quite a lot, is parse xml for individual scene nodes, so I decided I could do this using the outXML method. Something like:

    if packet.type == Packet.XMLChanged
      scene.getElementById(packet.id).outerXML = packet.xml

I implemented this like so...

    _setOuterXML: (xml) ->
      parsed = (err, nodes) =>
        throw err if err
        throw 'Too few/many nodes' if nodes.length != 1

        node = nodes[0]
        throw 'Dont do that' if node.name.toUpperCase() != @nodeName

        @childNodes = []
        @attributes = []
        for name, value of node.attribs
          @setAttribute name, value
        addChildren(this, nodes[0].children)

      parser = new htmlparser.Parser(new htmlparser.DomHandler(parsed))
      parser.write(xml)
      parser.end()

This uses the htmlparser to populate the dom node. Once I had tried out most of the ways this could work, I started hacking up mv-server to use dom-lite and htmlparser2 as a backend. I didn't manage to finish it last night, but I'll have a go this evening possibly, and see if I can get the world server to work. One of the advantages, is that I can program against a normal DOM model, and the loader will also handle comment nodes, text nodes will be handled properly, etc. The biggest problem I've had so far, is that everything that gets sent over the wire has it's `id` attribute stored as a `DWORD`, and dom-lite seems to cast all attributes to strings, so I have to cast those id attributes back into an integer before I can encode them to be sent over the wire.

All very interesting anyway. I'm really enjoying the `npm` ecosystem.