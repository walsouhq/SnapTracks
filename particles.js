/* -----------------------------------------------
/* Author : Vincent Garreau  - vincentgarreau.com
/* MIT license: http://opensource.org/licenses/MIT
/* Demo / Generator : vincentgarreau.com/particles.js
/* GitHub : github.com/VincentGarreau/particles.js
/* How to use? : Check the GitHub README
/* v2.0.0
/* ----------------------------------------------- */

var pJS = function(tag_id, params){

  var canvas_el = document.querySelector('#'+tag_id+' > canvas');

  /* particles.js variables with default values */
  this.pJS = {
    canvas: {
      el: canvas_el,
      w: canvas_el.offsetWidth,
      h: canvas_el.offsetHeight
    },
    particles: {
      number: {
        value: 400,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#fff'
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#ff0000'
        },
        polygon: {
          nb_sides: 5
        },
        image: {
          src: '',
          width: 100,
          height: 100
        }
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 20,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 100,
        color: '#fff',
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'grab'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 100,
          line_linked: {
            opacity: 1
          }
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3
        },
        repulse: {
          distance: 200,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        }
      }
    },
    retina_detect: true
  };

  /* params settings */
  if(params){
    Object.deepExtend(this.pJS, params);
  }

  /* ---------- pJS functions - canvas ------------ */

  this.pJS.fn.canvasInit = function() {
    this.pJS.canvas.ctx = this.pJS.canvas.el.getContext('2d');
  };

  this.pJS.fn.canvasSize = function() {
    this.pJS.canvas.el.width = this.pJS.canvas.w;
    this.pJS.canvas.el.height = this.pJS.canvas.h;

    if(this.pJS.retina_detect && window.devicePixelRatio > 1) {
      this.pJS.canvas.w = this.pJS.canvas.el.offsetWidth * window.devicePixelRatio;
      this.pJS.canvas.h = this.pJS.canvas.el.offsetHeight * window.devicePixelRatio;
      this.pJS.canvas.el.width = this.pJS.canvas.w;
      this.pJS.canvas.el.height = this.pJS.canvas.h;
    }
  };

  this.pJS.fn.canvasPaint = function() {
    this.pJS.canvas.ctx.fillRect(0, 0, this.pJS.canvas.w, this.pJS.canvas.h);
  };

  this.pJS.fn.canvasClear = function() {
    this.pJS.canvas.ctx.clearRect(0, 0, this.pJS.canvas.w, this.pJS.canvas.h);
  };

  /* ---------- pJS functions - particles ------------ */

  this.pJS.fn.particle = function(color, opacity, position) {
    /* size */
    var size = this.pJS.particles.size.value;
    if(this.pJS.particles.size.random) size = Math.random() * size;

    /* position */
    var pos = {
      x: position ? position.x : Math.random() * this.pJS.canvas.w,
      y: position ? position.y : Math.random() * this.pJS.canvas.h
    };

    /* opacity */
    var op = this.pJS.particles.opacity.value;
    if(this.pJS.particles.opacity.random) op = Math.random() * op;

    return {
      x: pos.x,
      y: pos.y,
      color: color,
      opacity: op,
      size: size,
      size_origin: size,
      vx: 0,
      vy: 0
    };
  };

  this.pJS.fn.particlesCreate = function() {
    for(var i = 0; i < this.pJS.particles.number.value; i++) {
      this.pJS.particles.array.push(this.pJS.fn.particle());
    }
  };

  this.pJS.fn.particlesUpdate = function() {
    for(var i = 0; i < this.pJS.particles.array.length; i++) {
      /* the particle */
      var p = this.pJS.particles.array[i];

      /* move the particle */
      p.x += p.vx;
      p.y += p.vy;

      /* out of canvas */
      if(p.x > this.pJS.canvas.w || p.x < 0 || p.y > this.pJS.canvas.h || p.y < 0) {
        this.pJS.particles.array.splice(i, 1);
        i--;
        continue;
      }

      /* interaction auto */
      if(this.pJS.particles.move.enable) {
        var ms = this.pJS.particles.move.speed / 2;
        p.vx = p.vx + (Math.random() * ms * 2 - ms);
        p.vy = p.vy + (Math.random() * ms * 2 - ms);
      }
    }
  };

  this.pJS.fn.particlesDraw = function() {
    /* clear canvas */
    this.pJS.fn.canvasClear();

    /* update each particles param */
    this.pJS.fn.particlesUpdate();

    /* draw each particle */
    for(var i = 0; i < this.pJS.particles.array.length; i++) {
      var p = this.pJS.particles.array[i];

      this.pJS.canvas.ctx.beginPath();
      this.pJS.canvas.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2, false);
      this.pJS.canvas.ctx.fillStyle = 'rgba('+p.color.r+','+p.color.g+','+p.color.b+','+p.opacity+')';
      this.pJS.canvas.ctx.fill();

      /* shadow */
      this.pJS.canvas.ctx.shadowBlur = 10;
      this.pJS.canvas.ctx.shadowColor = p.color;
    }
  };

  this.pJS.fn.particlesEmpty = function() {
    this.pJS.particles.array = [];
  };

  this.pJS.fn.particlesRefresh = function() {
    /* init all */
    this.pJS.fn.canvasInit();
    this.pJS.fn.canvasSize();
    this.pJS.fn.canvasPaint();
    this.pJS.fn.particlesEmpty();
    this.pJS.fn.particlesCreate();
    this.pJS.fn.particlesDraw();
  };

  /* ---------- pJS functions - modes events ------------ */

  this.pJS.fn.modes.grab = function(p) {
    if(this.pJS.interactivity.events.onhover.enable && this.pJS.interactivity.status == 'mousemove') {
      var dx_mouse = p.x - this.pJS.interactivity.mouse.pos_x;
      var dy_mouse = p.y - this.pJS.interactivity.mouse.pos_y;
      var dist_mouse = Math.sqrt(dx_mouse*dx_mouse + dy_mouse*dy_mouse);

      if(dist_mouse <= this.pJS.interactivity.modes.grab.distance) {
        var opacity = this.pJS.interactivity.modes.grab.line_linked.opacity;
        if(dist_mouse > this.pJS.interactivity.modes.grab.distance / 2) {
          opacity = opacity / dist_mouse * this.pJS.interactivity.modes.grab.distance / 2;
        }

        this.pJS.canvas.ctx.beginPath();
        this.pJS.canvas.ctx.strokeStyle = 'rgba(255,255,255,'+opacity+')';
        this.pJS.canvas.ctx.lineWidth = this.pJS.particles.line_linked.width;
        this.pJS.canvas.ctx.moveTo(p.x, p.y);
        this.pJS.canvas.ctx.lineTo(this.pJS.interactivity.mouse.pos_x, this.pJS.interactivity.mouse.pos_y);
        this.pJS.canvas.ctx.stroke();
        this.pJS.canvas.ctx.closePath();
      }
    }
  };

  this.pJS.fn.modes.bubble = function(p) {
    // Bubble mode implementation
  };

  this.pJS.fn.modes.repulse = function(p) {
    // Repulse mode implementation
  };

  this.pJS.fn.modes.push = function(p) {
    // Push mode implementation
  };

  this.pJS.fn.modes.remove = function(p) {
    // Remove mode implementation
  };

  /* ---------- pJS functions - vendors ------------ */

  this.pJS.fn.vendors.eventsListeners = function() {
    /* resize event */
    window.addEventListener('resize', function(){
      this.pJS.fn.canvasSize();
      this.pJS.fn.particlesDraw();
    }.bind(this));

    /* mouse move event */
    this.pJS.interactivity.el.addEventListener('mousemove', function(e) {
      this.pJS.interactivity.mouse.pos_x = e.offsetX || e.clientX;
      this.pJS.interactivity.mouse.pos_y = e.offsetY || e.clientY;
      this.pJS.interactivity.status = 'mousemove';
    }.bind(this));

    /* mouse leave event */
    this.pJS.interactivity.el.addEventListener('mouseleave', function(e) {
      this.pJS.interactivity.status = 'mouseleave';
    }.bind(this));

    /* click event */
    this.pJS.interactivity.el.addEventListener('click', function(e) {
      this.pJS.interactivity.mouse.click_pos_x = e.offsetX || e.clientX;
      this.pJS.interactivity.mouse.click_pos_y = e.offsetY || e.clientY;
      this.pJS.interactivity.status = 'click';
    }.bind(this));
  };

  this.pJS.fn.vendors.densityAutoParticles = function() {
    if(this.pJS.particles.number.density.enable) {
      var area = this.pJS.canvas.el.width * this.pJS.canvas.el.height / 1000;
      this.pJS.particles.number.value = area * this.pJS.particles.number.density.value_area;
    }
  };

  this.pJS.fn.vendors.checkBeforeDraw = function() {
    /* if theme is set */
    if(this.pJS.tmp.theme !== undefined) {
      if(this.pJS.tmp.theme == 'dark') {
        this.pJS.canvas.ctx.fillStyle = 'rgb(10, 10, 10)';
      } else if(this.pJS.tmp.theme == 'light') {
        this.pJS.canvas.ctx.fillStyle = 'rgb(255, 255, 255)';
      }
    } else {
      this.pJS.canvas.ctx.fillStyle = this.pJS.tmp.bg_color;
    }
  };

  this.pJS.fn.vendors.init = function() {
    this.pJS.fn.canvasInit();
    this.pJS.fn.canvasSize();
    this.pJS.fn.canvasPaint();
    this.pJS.fn.particlesCreate();
    this.pJS.fn.particlesDraw();
    this.pJS.fn.vendors.eventsListeners();
  };

  /* launch initialization */
  this.pJS.fn.vendors.init();

};

/* --- Global functions --- */

window.particlesJS = function(tag_id, params) {
  return new pJS(tag_id, params);
};

window.particlesJS.load = function(tag_id, path_config_json, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', path_config_json);
  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4) {
      if(xhr.status == 200) {
        var params = JSON.parse(xhr.responseText);
        var pJS = new pJS(tag_id, params);
        if(callback) callback();
      } else {
        console.log('Error pJS - XMLHttpRequest status: '+xhr.status);
      }
    }
  };
  xhr.send();
};

Object.deepExtend = function(destination, source) {
  for (var property in source) {
    if (source[property] && source[property].constructor && source[property].constructor === Object) {
      destination[property] = destination[property] || {};
      arguments.callee(destination[property], source[property]);
    } else {
      destination[property] = source[property];
    }
  }
  return destination;
};
