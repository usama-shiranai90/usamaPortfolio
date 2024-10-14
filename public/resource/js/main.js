AOS.init({
  offset: 200,
  duration: 600,
  easing: 'ease-in-sine',
  delay: 100,
});

window.onload = function () {
  let contextList = ["33343e3f2274322e3736", "283f292f373f74322e3736", "3935342e3b392e74322e3736"];
  const sticky = document.getElementsByTagName('header')[0];
  let headerOffset = findOffset(sticky);
  window.addEventListener('scroll', () => {
    stickyHeader(headerOffset, sticky);
    updateList();
  });

  $(document).ready(function () {

  });

  contextList.forEach((value, index) => {
    contextList[index] = cipherDecryption("mirror-on-the-wall")(value.concat(""))
  });

  document.querySelectorAll('.-dark-side-move').forEach((value, key, parent) => {
    value.addEventListener('click', event => {
      console.log("hello" , value, key, parent)
    });
  });

};


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

function stickyHeader(headerOffset, sticky) {
  let bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  if (bodyScrollTop > headerOffset.top)//if scroll position is greater than stickyDiv, make div fixed at top by adding class 'fixed'
  {
    sticky.classList.add('sticky');
  } else {
    sticky.classList.remove('sticky');
  }
}

const cipherEncryption = (saltText) => {
  const splitText = text => text.split('').map(c => c.charCodeAt(0));
  const toHex = number => ("0" + Number(number).toString(16)).substr(-2);
  const applySaltToChar = enc => splitText(saltText).reduce((a, b) => a ^ b, enc);
  return code => code.split('').map(splitText).map(applySaltToChar).map(toHex).join('');
}

const cipherDecryption = (saltText) => {
  const textToChars = text => text.split('').map(c => c.charCodeAt(0));
  const applySaltToChar = code => textToChars(saltText).reduce((a, b) => a ^ b, code);
  return encoded => encoded.match(/.{1,2}/g)
    .map(hex => parseInt(hex, 16))
    .map(applySaltToChar)
    .map(charCode => String.fromCharCode(charCode))
    .join('');
}


function disableScroll() {
  let keys = {37: 1, 38: 1, 39: 1, 40: 1};
  let supportsPassive = false;
  try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
      get: function () {
        supportsPassive = true;
      }
    }));
  } catch (e) {
  }
  let wheelOpt = supportsPassive ? {passive: false} : false;
  let wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}
