AOS.init({
  offset: 200,
  duration: 600,
  easing: 'ease-in-sine',
  delay: 100,
});

window.ga = function () {
  ga.q.push(arguments)
};
ga.q = [];
ga.l = +new Date;
ga('create', 'UA-XXXXX-Y', 'auto');
ga('set', 'anonymizeIp', true);
ga('set', 'transport', 'beacon');
ga('send', 'pageview')

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
    var bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (bodyScrollTop > headerOffset.top)//if scroll position is greater than stickyDiv, make div fixed at top by adding class 'fixed'
    {
      sticky.classList.add('sticky');
    } else {
      sticky.classList.remove('sticky');
    }
  }
};
