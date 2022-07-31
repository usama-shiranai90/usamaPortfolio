AOS.init({
  offset: 200,
  duration: 600,
  easing: 'ease-in-sine',
  delay: 100,
});

window.onload = function () {

  const sticky = document.getElementsByTagName('header')[0];
  let headerOffset = findOffset(sticky);
  window.addEventListener('scroll', () => {
    stickyHeader();
    updateList();
  });

  function updateList() {
    const titles = [...document.querySelectorAll('h1, h2')].sort((a, b) => {
      return Math.abs(a.getBoundingClientRect().top) - Math.abs(b.getBoundingClientRect().top);
    });
    document.querySelectorAll(".owl-side-nav-selected").forEach(c => c.classList.remove("owl-side-nav-selected"));
    document.querySelectorAll(".owl-side-nav-d")[[...document.querySelectorAll('h1, h2')].indexOf(titles[0])].classList.add("owl-side-nav-selected");
  }

  function findOffset(element) {
    let top = 0, left = 0;
    do {
      top += element.offsetTop || 0;
      left += element.offsetLeft || 0;
      element = element.offsetParent;
    } while (element);

    return {
      top: top,
      left: left
    };
  }

  function stickyHeader() {
    let bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (bodyScrollTop > headerOffset.top)//if scroll position is greater than stickyDiv, make div fixed at top by adding class 'fixed'
    {
      sticky.classList.add('sticky');
    } else {
      sticky.classList.remove('sticky');
    }
  }

  window.onload = function () {
    $(document).ready(function () {
      /*Navigation Bar*/
      let tabs = $('.tabs');
      let activeItem = tabs.find('.active');
      let activeWidth = activeItem.innerWidth();
      $(".selector").css({
        "left": activeItem.position.left + "px",
        "width": activeWidth + "px"
      });
    })
  }

  function disableScroll() {
    let keys = {37: 1, 38: 1, 39: 1, 40: 1};
    function preventDefault(e) {
      e.preventDefault();
    }
    function preventDefaultForScrollKeys(e) {
      if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
      }
    }
    let supportsPassive = false;
    try {
      window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true; }
      }));
    } catch(e) {}
    let wheelOpt = supportsPassive ? { passive: false } : false;
    let wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);

  }


};
