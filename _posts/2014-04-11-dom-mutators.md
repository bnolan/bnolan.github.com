---
layout: post
title: "Dom Mutators"
---
 
What I'm envisaging for the scene server I'm working on at the moment, is a dom-like API that you can script against, and then changes to the world get reflected down to all the connected clients. So you've got something like this:

    <box position='50 10 0' rotation='0 1.57 0' scale='1 1 1'>
      <script>
        {
          tick : function(self){
            var t = new Date().getTime() / 10000.0 + 20
            self.setAttribute('position', new THREE.Vector3(Math.sin(t * 11) * 200,10,Math.cos(t * 7) * 200));
          }
        }
      </script>
    </box>

That's a first cut, the end code will probably be quite different to that, but as you can see, you can animate a box (moving around in a circle) using just a few lines of code, and using dom methods like `setAttribute`. The current way the code works, you actually have to call `setPosition`, which marks the node as `dirty`, so it's position is sent to all the connected clients at the next tick.

This is all well and good, but I'm looking to generalize the code a bit. In the long term, I'm sure there will be lots of need for performance, but for starters, I'd like to off load as much of the api writing and scene parsing to other libs. So one of the things I've been thinking of, is using something like the [dom mutators api](https://developer.mozilla.org/en/docs/Web/API/MutationObserver) to keep track of changes to the dom, and then reflect them out.

It'd make my code a lot simpler. Something like:

    networkTick: ->
      packets = for node in @changes
        new Packet.NotifyChanges(node)
        
      send(packets)
      
      @changes = []
      
    onMutationEvent: (node) ->
      @changes.push node
      
Obviously it'd be a bit more complicated than that, for starters you want to use the `UpdatePosition` packet which binary encodes positional changes and sends them over the wire, rather than serializing the entire node. But I think it's a nice way to get started. Sadly - `dom-lite` doesn't have built in support for the MutationObserver api. But that might be a task for this weekend, adding support for the MutationObsever api to dom-lite. We'll see...