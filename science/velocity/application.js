(function(){
  var App;
  App = function() {
    var zoom;
    $(".board").draggable();
    $(".column").droppable({
      hoverClass: 'highlight'
    });
    $(".card").draggable();
    $("a[href*='flip']").click((function(__this) {
      var __func = function(e) {
        var card;
        card = $(e.currentTarget).parents('.card');
        card.addClass('flipped');
        return e.preventDefault();
      };
      return (function() {
        return __func.apply(__this, arguments);
      });
    })(this));
    zoom = 1.0;
    $('body').bind('mousewheel', (function(__this) {
      var __func = function(e, delta) {
        zoom += delta / 500;
        if (zoom < 0.3) {
          zoom = 0.3;
          return zoom;
        } else if (zoom > 3.0) {
          zoom = 3.0;
          return zoom;
        }
      };
      return (function() {
        return __func.apply(__this, arguments);
      });
    })(this));
    return this;
  };

  $(document).ready(function() {
    return new App();
  });
})();
