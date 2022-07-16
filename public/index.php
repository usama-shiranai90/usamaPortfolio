<!doctype html>
<html class="no-js" lang="">
<head>
  <meta charset="UTF-8">
  <title>OnEyeOwl | Portfolio</title>
  <meta content="" name="description">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <meta content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        name="viewport">
  <meta content="ie=edge" http-equiv="X-UA-Compatible">
  <meta content="" property="og:title">
  <meta content="" property="og:type">
  <meta content="" property="og:url">
  <meta content="" property="og:image">
  <meta content="#fafafa" name="theme-color">

  <!--  <link href="../site.webmanifest" rel="manifest">-->
  <link href="../assets/Icons/Logo.ico" rel="icon" type="image/x-icon">
  <link href="../assets/Icons/Logo.ico" rel="apple-touch-icon" type="image/x-icon">
  <link href="../assets/css/Tailwind.css" rel="stylesheet">
  <link href="../assets/css/main.css" rel="stylesheet">
  <link crossorigin="anonymous" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
        integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
        referrerpolicy="no-referrer" rel="stylesheet"/>

  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
  <!--  <link rel="preconnect" href="https://fonts.googleapis.com">-->
  <!--  <link rel="preconnect" href="https://fonts.gstatic.com" crossing>-->
  <!--  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700&display=swap" rel="stylesheet">-->
</head>
<body class="bg-gray-50">

<header class="bg-light-cultured w-full">
  <div class="relative top-0 px-4 py-3 text-white pr-14 bg-bluesh-richBlack sm:bg-red-200 md:bg-blue-200 lg:bg-yellow-200 2xl:bg-gray-200">
    <p class="text-base font-medium text-center capitalize sticky">
      Owl's website is underdevelopment.
    </p>
    <button aria-label="Close"
            class="absolute p-1 transition -translate-y-1/2 rounded-lg top-1/4 right-4">
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path clip-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              fill-rule="evenodd"/>
      </svg>
    </button>
  </div>
  <div class="container w-full flex gap-20 md:gap-5 justify-between items-center mx-auto px-8 md:px-14 lg:px-24">
    <a class="block py-2 lg:py-3" href="#">
<!--      height="50" width="240"-->
      <img alt="logo" class="-w-8/12 -h-8/12 sm:w-1/3 md:w-8/12" src="../assets/images/Logo.svg"/>
    </a>
    <nav class="hidden md:flex md:space-x-8 lg:space-x-12 items-center antialiased font-medium md:text-base lg:text-lg">
      <a class="font-semibold border-b-0 bg-contain rounded-b-md text-shaddy-PrussianBlue" href="#"><span
        class="owl-nav-uline">Home</span></a>
      <a class="owl-animate-linear hover:scale-105" href="#owl-info"><span class="owl-nav-uline owl-nav-uline-color">Self</span></a>
      <a class="owl-animate-linear hover:scale-105" href="#owl-work"><span class="owl-nav-uline owl-nav-uline-color">Work</span></a>
      <a class="owl-animate-linear hover:scale-105" href="#owl-contact"><span class="owl-nav-uline owl-nav-uline-color">Contact</span></a>
      <a class="owl-animate-linear hover:scale-105" href="#owl-resume">
        <button class="owl-p-button owl-animate-out"><span class="opacity-100">My Resume</span>
        </button>
      </a>
    </nav>
    <nav class="md:hidden">
      <label class="flex flex-col w-16 cursor-pointer">
        <input class="w-full" id="owlToggle" type="checkbox"/>
        <span class="w-1/2 bg-shaddy-l_Charcoal rounded h-1.5 my-1.5 mx-0 transition ease-out duration-300"></span>
        <!-- transition: .4s cubic-bezier(0.68, -0.6, 0.32, 1.6);-->
        <span class="w-full bg-shaddy-l_Charcoal rounded h-1.5 my-1.5 mx-0 transition ease-out duration-300"></span>
        <span class="w-9/12 bg-shaddy-l_Charcoal rounded h-1.5 my-1.5 mx-0 transition ease-out duration-300"></span>
      </label>
    </nav>
  </div>
</header>

<!-- OWL Landing Page-->
<div class="container w-full flex justify-between items-center mt-16 mx-auto px-8 z-0 md:px-14 lg:px-24">
  <div class="flex flex-wrap md:flex-nowrap sm:items-center sm:justify-center">
    <!--md:bg-red-300 lg:bg-red-500 xl:bg-red-700 2xl:bg-yellow-500-->

    <nav class="fixed hidden  lg:mr-24 lg:w-4 left-10 top-1/3 lg:inline-block">
      <div class="absolute left-50 transform -translate-x-1/2 space-y-6 mt-36 text-white">
        <a class="owl-side-nav-d owl-side-nav-selected block w-7 h-7 rounded-full border-4 border-gray-300" href="#">
          <span class="bg-shaddy-l_MidnightGreenEagleGreen p-2 px-4 rounded-md ml-10 opacity-0">Home</span>
        </a>
        <a class="owl-side-nav-d block w-7 h-7 rounded-full border-4 border-gray-300" href="#owl-info">
          <span class="bg-shaddy-lxx_MidnightGreenEagleGreen p-2 px-4 rounded-md ml-10 opacity-0">Self</span>
        </a>
        <a class="owl-side-nav-d block w-7 h-7 rounded-full border-4 border-gray-300" href="#owl-work">
          <span class="bg-shaddy-lx_MidnightGreenEagleGreen p-2 px-4 rounded-md ml-10 opacity-0">Work</span>
        </a>
        <a class="owl-side-nav-d block w-7 h-7 rounded-full border-4 border-gray-300" href="#owl-contact">
          <span class="bg-shaddy-SpaceCadet p-2 px-4 rounded-md ml-10 opacity-0">Contact</span>
        </a>
      </div>
    </nav>

    <div class="flex flex-wrap justify-center max-w-2xl mt-0 md:justify-start md:my-36 lg:ml-20 md:mr-64">
      <h1
        class="font-semibold text-center md:text-left text-4xl md:text-5xl lg:text-6xl text-shaddy-PalatinatePurple capitalize">
        Web developer & <span class="text-shaddy-DarkPurple">Data science</span> <span
        class="text-shaddy-lx_MidnightGreenEagleGreen">Enthusiast.</span></h1>
      <div class="w-full flex justify-center md:justify-start">
        <button
          class="owl-p-button owl-animate-out px-10 py-4 border-2 rounded border-shaddy-l_Charcoal bg-bluesh-richBlack text-gray-50 mt-12 flex items-center space-x-3 text-lg ">
          <svg fill="none" height="22" viewBox="0 0 22 22" width="22" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14.4375 11C14.4375 11.9117 14.0753 12.786 13.4307 13.4307C12.786 14.0753 11.9117 14.4375 11 14.4375C10.0883 14.4375 9.21398 14.0753 8.56932 13.4307C7.92466 12.786 7.5625 11.9117 7.5625 11C7.5625 10.0883 7.92466 9.21398 8.56932 8.56932C9.21398 7.92466 10.0883 7.5625 11 7.5625C11.9117 7.5625 12.786 7.92466 13.4307 8.56932C14.0753 9.21398 14.4375 10.0883 14.4375 11Z"
              fill="white"/>
            <path
              d="M0 11C0 11 4.125 3.4375 11 3.4375C17.875 3.4375 22 11 22 11C22 11 17.875 18.5625 11 18.5625C4.125 18.5625 0 11 0 11ZM11 15.8125C12.2764 15.8125 13.5004 15.3055 14.403 14.403C15.3055 13.5004 15.8125 12.2764 15.8125 11C15.8125 9.72365 15.3055 8.49957 14.403 7.59705C13.5004 6.69453 12.2764 6.1875 11 6.1875C9.72365 6.1875 8.49957 6.69453 7.59705 7.59705C6.69453 8.49957 6.1875 9.72365 6.1875 11C6.1875 12.2764 6.69453 13.5004 7.59705 14.403C8.49957 15.3055 9.72365 15.8125 11 15.8125Z"
              fill="white"/>
          </svg>
          <span class="opacity-100">My Resume</span>
        </button>
      </div>
    </div>
    <img alt="owl-isometric"
         class="flex-grow bg-cover md:absolute md:w-1/3 hidden md:flex md:h-1/2 lg:h-4/6 md:-mt-6 md:mt-0 right-0 -z-1"
         src="../assets/images/land-page.svg">
  </div>
</div>

<!-- Owl Self  container mt-64 flex flex-col justify-between items-center mx-auto px-8 md:px-14 lg:px-24 -->
<section id="owl-info" class="z-0 w-full bg-light-darkCultured">
  <div class="container mt-64 flex justify-between items-center mx-auto px-8 md:px-14 lg:px-24 w-full">
    <div class="flex items-center py-16 md:my-20 flex-col sm:shadow-none md:shadow-md rounded-t-md ">
      <div class="flex flex-col items-center lg:flex-row pb-10">
        <div class="w-full px-0 py-5 sm:w-3/4 lg:w-1/4 lg:px-5 lg:py-0">
          <img alt="Owl-Image"
               class="bg-contain object-cover bg-no-repeat bg-center rounded w-full h-1/2 lg:w-full bg-local bg-clip-content bg-origin-content"
               src="../assets/images/IMG_20210529_131731_Bokeh.jpg">
          <!--      <img src="../assets/images/IMG_20210529_131731_Bokeh.jpg" alt="image" class="flex-1 flex-shrink-0  h-64 mb-4 bg-center ">-->
        </div>
        <div class="flex-grow w-full text-center sm:w-3/4 lg:w-3/5 lg:text-left px-5">
          <h2 class="owl-ni-title">Who am
            <span class="text-shaddy-lx_MidnightGreenEagleGreen">I</span>?</h2>
          <h4 class="pt-6 font-header text-xl font-medium text-bluesh-richBlack sm:text-2xl lg:text-3xl">
            I'm <span class="text-catalystDark-dark italic">Syed Usama Bukhari</span>, a Web Developer and Java
            Developer.
          </h4>
          <p class="pt-6 leading-relaxed">
            Result-oriented individual with a strong aptitude to solve complex problem. Capable of showing firm and
            positive
            response to work while under pressure. Firm grip in numerous programming languages incl. Java, Sprint-boot,
            Vaadin, Python, PHP, SQL and Web Development ( HTML-5 , CSS3 , Tailwind , JavaScript ). Offering more than
            two
            years of experience in Java and its related frameworks. Area of interest includes Artificial Intelligence,
            Data
            Science, and Machine Learning
          </p>
        </div>
      </div>

      <!--      bg-white p-4  gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3-->
      <div class="text-sm leading-normal text-center flex flex-wrap gap-4 w-full py-5 justify-center items-stretch">
        <div data-aos="zoom-in"
             class="w-full md:w-1/2 lg:w-1/4 rounded shadow-sm flex flex-col gap-1.5 transform transition duration-150 ease-linear group hover:scale-105 hover:shadow-lg hover:bg-gray-50">
          <div class="block w-full text-shaddy-lxx_MidnightGreenEagleGreen text-5xl text-center"><i
            class="fab fa-java"></i></div>
          <h3 class="text-shaddy-PalatinatePurple text-2xl font-semibold">Java</h3>
          <div class="w-full lg:w-auto flex flex-wrap justify-center gap-3 my-4 mx-4">
            <div class="owl-sub-badge">Spring-Boot</div>
            <div class="owl-sub-badge">Vaadin</div>
            <div class="owl-sub-badge">JavaFX</div>
            <div class="owl-sub-badge">JUnit</div>
            <div class="owl-sub-badge">Maven</div>
            <div class="owl-sub-badge">MVC</div>
          </div>
        </div>
        <div data-aos="zoom-in"
             class="w-full md:w-1/2 lg:w-1/4 rounded shadow-sm flex flex-col gap-1.5 transform transition duration-150 ease-linear group hover:scale-105 hover:shadow-lg hover:bg-gray-50 ">
          <div class="block w-full text-shaddy-lxx_MidnightGreenEagleGreen text-5xl text-center">
            <i class="fab fa-python"></i></div>
          <h3 class="text-shaddy-PalatinatePurple text-2xl font-semibold">Python</h3>

          <div class="w-full lg:w-auto flex flex-wrap justify-center gap-3 my-4 mx-4">
            <div class="owl-sub-badge">Basic</div>
            <div class="owl-sub-badge">Numpy</div>
            <div class="owl-sub-badge">Panda</div>
            <div class="owl-sub-badge">Django</div>
          </div>
        </div>
        <div data-aos="zoom-in"
             class="w-full md:w-1/2 lg:w-1/4 rounded shadow-sm flex flex-col gap-1.5 transform transition duration-150 ease-linear group hover:scale-105 hover:shadow-lg hover:bg-gray-50 ">
          <div class="block w-full text-shaddy-lxx_MidnightGreenEagleGreen text-5xl text-center"><i
            class="fa-solid fa-database"></i></div>
          <h3 class="text-shaddy-PalatinatePurple text-2xl font-semibold">Databases</h3>

          <div class="w-full lg:w-auto flex flex-wrap justify-center gap-3 my-4 mx-4">
            <div class="owl-sub-badge">MySQL</div>
            <div class="owl-sub-badge">PostGradSQL</div>
          </div>
        </div>
        <div data-aos="zoom-in"
             class="w-full md:w-1/2 lg:w-1/4 rounded shadow-sm flex flex-col gap-1.5 transform transition duration-150 ease-linear group hover:scale-105 hover:shadow-lg hover:bg-gray-50 ">
          <div class="block w-full text-5xl text-center"><i class="fa-brands fa-html5"></i></div>
          <h3 class="text-shaddy-PalatinatePurple text-2xl font-semibold">Web Development</h3>

          <div class="w-full lg:w-auto flex flex-wrap justify-center gap-3 my-4 mx-4">
            <div class="owl-sub-badge">HTML</div>
            <div class="owl-sub-badge">CSS</div>
            <div class="owl-sub-badge">JavaScript</div>
            <div class="owl-sub-badge">JQuery</div>
            <div class="owl-sub-badge">Ajax</div>
          </div>
        </div>
        <div data-aos="zoom-in"
             class="w-full md:w-1/2 lg:w-1/4 rounded shadow-sm flex flex-col gap-1.5 transform transition duration-150 ease-linear group hover:scale-105 hover:shadow-lg hover:bg-gray-50 ">
          <div class="block w-full text-shaddy-lxx_MidnightGreenEagleGreen text-5xl text-center"><i
            class="fa-brands fa-php"></i></div>
          <h3 class="text-shaddy-PalatinatePurple text-2xl font-semibold">PHP</h3>

          <div class="w-full lg:w-auto flex flex-wrap justify-center gap-3 my-4 mx-4">
            <div class="owl-sub-badge">Core</div>
            <div class="owl-sub-badge">Laravel</div>
          </div>
        </div>
        <div data-aos="zoom-in"
             class="w-full md:w-1/2 lg:w-1/4 rounded shadow-sm flex flex-col gap-1.5 transform transition duration-150 ease-linear group hover:scale-105 hover:shadow-lg hover:bg-gray-50">
          <div class="block w-full text-shaddy-lxx_MidnightGreenEagleGreen text-5xl text-center"><i
            class="fa-solid fa-microchip"></i></div>
          <h3 class="text-shaddy-PalatinatePurple text-2xl font-semibold">Technology</h3>

          <div class="w-full lg:w-auto flex flex-wrap justify-center gap-3 my-4 mx-4">
            <div class="owl-sub-badge">Jetbrains</div><!--(Intellij, Pycharm, WebStorm, PHPStorm, DataGrip)-->
            <div class="owl-sub-badge">Figma</div>
            <div class="owl-sub-badge">Matlab</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- Owl Work and project -->
<section id="owl-work" class="z-0 w-full">
  <div class="container mt-64 flex flex-col justify-between items-center mx-auto px-8 md:px-14 lg:px-24 w-full">
    <h2 class="owl-ni-title">Project <span class="text-shaddy-lx_MidnightGreenEagleGreen">&amp;</span> Works</h2>
    <p class="pt-6 leading-relaxed">
      I have worked on number of projects, but some of them are list below.
    </p>
    <div class="flex flex-col gap-2">
      <div
        class="owl-project-preview flex flex-col md:flex-row items-center sm:my-5 sm:items-center sm:py-2 md:items-start md:py-3">
        <figure class="sm:w-3/5 ring-2 ring-light-darkCultured rounded-lg">
          <a href="#">
            <img alt="" src="../assets/images/Teacher-Dashboard.png">
          </a>
        </figure>
        <div class="px-4 py-5 md:px-6 sm:w-4/5 md:w-2/5 md:py-10">
          <div class="flex justify-between content-between items-center sm:my-2 md:mb-5 ">
            <div class="w-10 opacity-70 hover:opacity-90">
              <svg class=" text-bluesh-richBlack" fill="none" role="img" stroke="currentColor"
                   stroke-linecap="round"
                   stroke-linejoin="round" stroke-width="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <title>Folder</title>
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <div class="px-4 flex gap-1">
              <a aria-label="GitHub Link" href="" rel=""
                 target="_blank">
                <svg class="w-6 text-bluesh-richBlack" fill="none" role="img" stroke="currentColor"
                     stroke-linecap="round"
                     stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <title>GitHub</title>
                  <path
                    d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <a aria-label="External Link" class="external"
                 href="" target="_blank">
                <svg class="w-6 text-bluesh-richBlack" fill="none" role="img" stroke="currentColor"
                     stroke-linecap="round"
                     stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg"><title>External Link</title>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" x2="21" y1="14" y2="3"></line>
                </svg>
              </a>
            </div>
          </div>

          <h3 class="sm:text-2xl md:text-3xl font-semibold leading-relaxed tracking-wide">
            <a class="capitalize owl-animate-out text-bluesh-richBlack hover:text-shaddy-lxx_MidnightGreenEagleGreen"
               href="#">Catalyst -
              <span class="text-shaddy-PalatinatePurple">A Web Solution For OBE</span>
            </a>
          </h3>
          <!--position: absolute;  left: 50%; width: 30%;-->
          <div
            class="shadow-md w-full relative z-20 sm:bg-transparent md:bg-bluesh-richBlack text-gray-50 px-5 my-5 rounded sm:-left-0 md:left-1/3 lg:left-1/2 md:absolute md:w-1/2 lg:w-2/6">
            <p class="tracking-wide text-base py-3 md:pt-6 leading-relaxed">
              A web application made for foundation university to automate progressive course profile, manage respective
              users and track student performance.
            </p>
            <ul class="leading-8 italic tracking-tight">
              <li><i class="fa-solid fa-circle-notch"></i> Core-PHP</li>
              <li><i class="fa-solid fa-circle-notch"></i> PWA with Tailwind</li>
              <li><i class="fa-solid fa-circle-notch"></i> ApexChart</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>


<footer class="px-4 py-8 dark:bg-gray-800 dark:text-gray-400">
  <div class="container flex flex-wrap items-center justify-center mx-auto space-y-4 sm:justify-between sm:space-y-0">
    <div class="flex flex-row pr-3 space-x-4 sm:space-x-8">
      <div class="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full dark:bg-violet-400">
        <svg class="w-5 h-5 rounded-full dark:text-gray-900" fill="currentColor" viewBox="0 0 32 32"
             xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18.266 26.068l7.839-7.854 4.469 4.479c1.859 1.859 1.859 4.875 0 6.734l-1.104 1.104c-1.859 1.865-4.875 1.865-6.734 0zM30.563 2.531l-1.109-1.104c-1.859-1.859-4.875-1.859-6.734 0l-6.719 6.734-6.734-6.734c-1.859-1.859-4.875-1.859-6.734 0l-1.104 1.104c-1.859 1.859-1.859 4.875 0 6.734l6.734 6.734-6.734 6.734c-1.859 1.859-1.859 4.875 0 6.734l1.104 1.104c1.859 1.859 4.875 1.859 6.734 0l21.307-21.307c1.859-1.859 1.859-4.875 0-6.734z"></path>
        </svg>
      </div>
      <ul class="flex flex-wrap items-center space-x-4 sm:space-x-8">
        <li>
          <a href="#" rel="noopener noreferrer">Terms of Use</a>
        </li>
        <li>
          <a href="#" rel="noopener noreferrer">Privacy</a>
        </li>
      </ul>
    </div>
    <ul class="flex flex-wrap pl-3 space-x-4 sm:space-x-8">
      <li>
        <a href="#" rel="noopener noreferrer">Instagram</a>
      </li>
      <li>
        <a href="#" rel="noopener noreferrer">Facebook</a>
      </li>
      <li>
        <a href="#" rel="noopener noreferrer">Twitter</a>
      </li>
    </ul>
  </div>
</footer>
</body>
<script async src="https://www.google-analytics.com/analytics.js"></script>
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>

<script src="../assets/js/vendor/modernizr-3.11.2.min.js"></script>
<script src="../assets/js/plugins.js"></script>
<script src="../assets/js/main.js"></script>
</html>