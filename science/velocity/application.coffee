
class App
  constructor: ->
    $(".board").draggable()

    $(".column").droppable {
      hoverClass : 'highlight'
    }

    $(".card").draggable()

    $("a[href*='flip']").click (e) =>
      card = $(e.currentTarget).parents('.card')
      
      card.addClass 'flipped'

      e.preventDefault()

    zoom = 1.0
    
    $('body').bind 'mousewheel', (e, delta) =>

      zoom += delta / 500
      
      if zoom < 0.3
        zoom = 0.3
      else if zoom > 3.0
        zoom = 3.0
        
      # $('.board').css { '-webkit-transform' : "scale(${zoom})" }

$(document).ready ->
  new App