(function(){
  var App, Eater, Hive, Unit, Walker;
  var __extends = function(child, parent) {
    var ctor = function(){ };
    ctor.prototype = parent.prototype;
    child.__superClass__ = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
  };
  Unit = function(params) {
    var _a, _b, key, value;
    if (params) {
      _a = params;
      for (value = 0, _b = _a.length; value < _b; value++) {
        key = _a[value];
        this[key] = value;
      }
    }
    this.selected = false;
    this.el = $("<canvas width='64' height='64' />").addClass('unit').appendTo('body');
    this.context = this.el[0].getContext('2d');
    this.el.click(this.onclick);
    return this;
  };
  Unit.prototype.focusRing = function() {
    this.context.save();
    this.context.translate(32, 32);
    this.context.fillStyle = "rgba(141, 145, 51, 1)";
    this.context.beginPath();
    this.context.arc(0, 0, 15, 0, Math.PI * 2, true);
    this.context.closePath();
    this.context.fill();
    return this.context.restore();
  };
  Unit.prototype.redraw = function() {
    this.focusRing();
    return this.draw();
  };

  Walker = function() {
    return Unit.apply(this, arguments);
  };
  __extends(Walker, Unit);
  Walker.prototype.walk = function() {
    if (this.destination) {
      this.position = this.position.add(v);
      return this.position;
    }
  };

  Eater = function() {
    return Walker.apply(this, arguments);
  };
  __extends(Eater, Walker);
  Eater.prototype.draw = function() {  };

  Hive = function() {
    var _a;
    _a = this;
    this.onclick = function(){ return Hive.prototype.onclick.apply(_a, arguments); };
    return Unit.apply(this, arguments);
  };
  __extends(Hive, Unit);
  Hive.prototype.draw = function() {  };
  Hive.prototype.onclick = function() {  };

  App = function() {
    var h;
    this.units = [];
    h = new Hive();
    h.position = new Vector(300, 300);
    this.addUnit(h);
    this.redraw();
    return this;
  };
  App.prototype.addUnit = function(u) {
    return this.units.push(u);
  };
  App.prototype.redraw = function() {
    var _a, _b, _c, _d, u;
    _a = []; _c = this.units;
    for (_b = 0, _d = _c.length; _b < _d; _b++) {
      u = _c[_b];
      _a.push(u.redraw());
    }
    return _a;
  };

  $(document).ready((function(__this) {
    var __func = function() {
      return new App();
    };
    return (function() {
      return __func.apply(__this, arguments);
    });
  })(this));
})();
