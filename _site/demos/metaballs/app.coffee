
class Unit
  constructor: (params) ->
    if params
      for key, value in params
        @[key]: value
      
    @selected: false
    
    @el: $("<canvas width='64' height='64' />").addClass('unit').appendTo 'body'
    @context: @el[0].getContext('2d')
    
    @el.click @onclick
    
  focusRing: ->
    @context.save()

    @context.translate 32, 32
    @context.fillStyle: "rgba(141, 145, 51, 1)"
    @context.beginPath()
    @context.arc 0, 0, 15, 0, Math.PI*2, true
    @context.closePath()
    @context.fill()

    @context.restore()

  redraw: ->
    @focusRing()
    @draw()
      
class Walker extends Unit
  walk: ->
    if @destination
      @position: @position.add(v)

class Eater extends Walker
  draw: ->
    # ...
    
class Hive extends Unit
  draw: ->
    # ...
    
  onclick: =>
    # ...
    
class App
  constructor: ->
    @units: []

    h: new Hive
    h.position = new Vector(300,300)
    
    @addUnit(h)

    @redraw()
    
  addUnit: (u) ->
    @units.push u
    
  redraw: ->
    
    for u in @units
      u.redraw()


$(document).ready =>
  new App