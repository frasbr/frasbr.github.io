"use strict";

function _instanceof(left, right) {
  if (
    right != null &&
    typeof Symbol !== "undefined" &&
    right[Symbol.hasInstance]
  ) {
    return right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var mobileNav = function mobileNav(nav, trigger, container) {
  var _this = this;

  _classCallCheck(this, mobileNav);

  _defineProperty(this, "toggle", function(e) {
    e.stopPropagation();
    _this.active = !_this.active;

    _this.setClass();
  });

  _defineProperty(this, "closeNav", function(e) {
    if (_this.active) {
      _this.active = false;

      _this.setClass();
    }
  });

  _defineProperty(this, "setClass", function() {
    if (_this.active) {
      if (_this.debounce) {
        clearTimeout(_this.debounce);
        _this.debounce = null;
      }

      _this.menu.classList.remove("mobile-hidden");
    } else {
      _this.debounce = setTimeout(function() {
        _this.menu.classList.add("mobile-hidden");
      }, 300);
    }

    setTimeout(function() {
      _this.menu.classList.toggle("mobile-inactive");

      _this.menu.classList.toggle("mobile-active");

      _this.trigger.classList.toggle("open");
    }, 0);
  });

  _defineProperty(this, "handleScroll", function() {
    requestAnimationFrame(function() {
      // Control navbar colour at certain scrollpoints
      if (window.scrollY > 700) {
        _this.container.classList.add("purple");
      } else {
        _this.container.classList.remove("purple");
      }

      if (window.scrollY > 0) {
        _this.container.classList.add("scrolled");
      } else {
        _this.container.classList.remove("scrolled");
      }

      // If user scrolled down then pull the navbar up
      if (window.scrollY > 10 && window.scrollY > _this.prevScrollY) {
        _this.container.classList.add("pulled");
      } else {
        _this.container.classList.remove("pulled");
      }

      _this.prevScrollY = window.scrollY;
    });
  });

  this.menu = nav;
  this.trigger = trigger;
  this.container = container;
  this.active = false;
  this.prevScrollY = 0;
  this.debounce = null;
  trigger.addEventListener("click", this.toggle);
  document.addEventListener("scroll", this.handleScroll);
  container.addEventListener("click", this.closeNav);
};

// Select nav elements
var hamburger = document.querySelector(".hamburger");
var navMenu = document.querySelector(".nav-main .nav-menu ul");
var navContainer = document.querySelector(".nav-main");

// Remove noscript class tag from nav to make sure the nav has a background when javascript is disabled
navContainer.classList.remove("noscript");

// Create mobile nav object
var mobileNavMenu = new mobileNav(navMenu, hamburger, navContainer);

// Add parallax effect to hero contents
var parallaxContainer = document.querySelector(".parallax");
window.addEventListener("scroll", function() {
  requestAnimationFrame(function() {
    if (window.scrollY > 0) {
      parallaxContainer.style = "transform: translateY("
        .concat(window.scrollY * 0.3, "px); opacity: ")
        .concat(1 - window.scrollY * 0.0005);
    }
  });
});

// watch for each .section element to enter the page and use CSS to fade it in.
var observer = new IntersectionObserver(function(entries, observer) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.remove("not-visited");
    }
  });
});
var targets = document.querySelectorAll(".section .container");
targets.forEach(function(target) {
  target.classList.add("not-visited"); // this is added here to make sure it is safe to view the page without javascript

  observer.observe(target);
});

// Rotate testimonials
var testimonialContainer = document.querySelector(".testimonial");
var testimonialText = document.querySelector(".testimonial-text");
var testimonialAuthor = document.querySelector(".author");

var testimonials = [
  {
    text:
      "My son Alex has been learning drums from Luke this year and has really loved it. He\u2019s been so encouraged and inspired and has gone along in leaps and bounds. He has learnt to recognise the timing and beat in songs and will often start drumming along with his hands to a song on the radio while I'm driving. A real pleasure to see one so young feeling comfortable with his instrument. I can highly recommend Luke as a drumming teacher.",
    author: "Mary Lane"
  },
  {
    text:
      "Luke is one of the best in the world. \u2018Internationally renowned\u2019\n    is an understatement; I\u2019m honestly not sure that I\u2019ve met a\n    better drummer. He\u2019s also a pretty great guy and a great teacher\n    as well. Pretty excited to watch this channel grow!",
    author: "Bo Brannen"
  }
];
var originalText = testimonialText.textContent;
var originalAuthor = testimonialAuthor.textContent;
testimonials.push({
  text: originalText,
  author: originalAuthor
});
var testimonialCounter = 0;
setTimeout(function() {
  testimonialContainer.classList.add("not-visible");
}, 1000 * 5);
setInterval(function() {
  testimonialText.textContent = testimonials[testimonialCounter].text;
  testimonialAuthor.textContent = testimonials[testimonialCounter].author;
  testimonialCounter = (testimonialCounter + 1) % testimonials.length;
  testimonialContainer.classList.remove("not-visible");
  setTimeout(function() {
    testimonialContainer.classList.add("not-visible");
  }, 1000 * 9);
}, 1000 * 10);
