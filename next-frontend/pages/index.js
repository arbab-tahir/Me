import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { createClient } from "next-sanity";
import Alert from "../components/Alert";
import Script from "next/script";
import React, { useState, useEffect } from "react";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import NavBar from "../components/NavBar";
import { FaAngleUp } from "react-icons/fa";

export default function Home({ blogs, profile }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  //   Form validation state
  const [errors, setErrors] = useState({});

  //   Setting button text on form submission
  const [buttonText, setButtonText] = useState("Send");

  // Setting success or failure messages states
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);

  // Reset Inputs
  const handleSend = (e) => {
    e.preventDefault();
    setName("");
    setEmail("");
    setMessage("");
  };

  // Validation check method
  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    if (name.length <= 0) {
      tempErrors["name"] = true;
      isValid = false;
    }
    if (email.length <= 0) {
      tempErrors["email"] = true;
      isValid = false;
    }
    if (message.length <= 0) {
      tempErrors["message"] = true;
      isValid = false;
    }

    setErrors({ ...tempErrors });
    console.log("errors", errors);
    return isValid;
  };

  //   Handling form submit

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValidForm = handleValidation();

    if (isValidForm) {
      setButtonText("Sending");
      const res = await fetch("/api/sendgrid", {
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const { error } = await res.json();
      if (error) {
        console.log(error);
        setShowSuccessMessage(false);
        setShowFailureMessage(true);
        setButtonText("Send");
        return;
      }
      setShowSuccessMessage(true);
      setShowFailureMessage(false);
      setButtonText("Send");
    }
    console.log(name, email, message);
  };

  const client = createClient({
    projectId: "wtvm182x",
    dataset: "production",
    useCdn: false,
  });
  const builder = imageUrlBuilder(client);
  // const profile = {
  //   title: "WorkWithHarry",
  //   name: "Harry",
  //   image: "https://insanebiography.com/wp-content/uploads/codewithharry_108099807_133124151765153_6863548870509034899_n-min-edited.jpg",
  //   fbLink: "https://facebook.com/codewithharry",
  //   twitterLink: "https://twitter.com/codewithharry",
  //   instagramLink: "https://instagram.com/codewithharry",
  // }

  return (
    <>
      <>
        <Script src="/assets/js/main.js"></Script>
        <Head>
          <meta charset="utf-8" />

          <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible" />

          <meta
            content="width=device-width, initial-scale=1, shrink-href-fit=no"
            name="viewport"
          />

          <title>{profile.title} - Developer | Coder | Software Geek</title>

          <meta property="og:title" content="Homepage | Portfolio" />

          <meta property="og:locale" content="en_US" />

          <link rel="canonical" href="//" />

          <meta property="og:url" content="//" />

          <meta name="description" content="Arbab Tahir | Frontend Developer" />

          <link rel="icon" type="image/jpg" href="/assets/img/me.jpg" />

          <meta name="theme-color" content="#607A94" />

          <meta property="og:site_name" content="Portfolio" />

          <meta property="og:image" content="//assets/img/social.jpg" />

          <meta name="twitter:card" content="summary_large_image" />

          <meta name="twitter:site" content="@tailwindmade" />

          <link
            crossorigin="crossorigin"
            href="https://fonts.gstatic.com"
            rel="preconnect"
          />

          <link
            as="style"
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&family=Raleway:wght@400;500;600;700&display=swap"
            rel="preload"
          />

          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&family=Raleway:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />

          <link
            href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
            rel="stylesheet"
          />

          <link
            crossorigin="anonymous"
            href="/assets/styles/main.min.css"
            media="screen"
            rel="stylesheet"
          />

          <script
            defer
            src="https://unpkg.com/@alpine-collective/toolkit@1.0.0/dist/cdn.min.js"
          ></script>

          <script
            defer
            src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"
          ></script>
        </Head>
        <NavBar profile={profile} />

        {/* Checking Part start */}
        {/* <div className="pointer-events-none fixed inset-0 z-70 min-h-screen bg-black bg-opacity-70 opacity-0 transition-opacity lg:hidden" /> */}
        {/* <div className="hidden absolute right-0 min-h-screen w-2/3 bg-primary py-4 px-8 shadow md:w-1/3">
          <button className="absolute top-0 right-0 mt-4 mr-4">
            <img
              src="/assets/img/icon-close.svg"
              className="h-10 w-auto"
              alt=""
            />
          </button>

          <ul className="mt-8 flex flex-col">
            <li className="py-2">
              <span className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white">
                About
              </span>
            </li>

            <li className="py-2">
              <span className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white">
                Services
              </span>
            </li>

            <li className="py-2">
              <span className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white">
                Work
              </span>
            </li>

            <li className="py-2">
              <span className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white">
                Statistics
              </span>
            </li>

            <li className="py-2">
              <span className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white">
                Blog
              </span>
            </li>

            <li className="py-2">
              <span className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white">
                Contact
              </span>
            </li>
          </ul>
        </div> */}
        {/* Checking Part End */}
      </>
      <>
        <div>
          <div
            className="relative bg-gradient-to-r from-purple-500 to-blue-500 bg-cover bg-center bg-no-repeat py-8"
            // style={{ backgroundImage: "url(/assets/img/bg1.jpg)" }}
          >
            <div className="absolute inset-0 z-20 bg-gradient-href-r from-hero-gradient-from href-hero-gradient-href bg-cover bg-center bg-no-repeat"></div>

            <div className="container relative z-30 pt-20 pb-12 sm:pt-56 sm:pb-48 lg:pt-64 lg:pb-48">
              <div className=" flex flex-col items-center upperpart justify-center lg:flex-row">
                <div className="rounded-full picborder">
                  <img
                    src={builder.image(profile.image).width(200).url()}
                    className="h-48 rounded-full sm:h-56"
                    alt="author"
                  />
                </div>
                <div className="pt-8 sm:pt-10 lg:pl-8 lg:pt-0">
                  <h1 className="text-center font-header text-4xl text-white sm:text-left sm:text-5xl md:text-6xl">
                    Hey, I'm {profile.name}!
                  </h1>
                  <div className="flex flex-col justify-center pt-3 sm:flex-row sm:pt-5 lg:justify-start">
                    <div className="flex items-center justify-center pl-0 sm:justify-start md:pl-1">
                      <p className="font-body text-lg uppercase text-white">
                        Let's connect
                      </p>
                      <div className="hidden sm:block">
                        <i className="bx bx-chevron-right text-3xl text-yellow"></i>
                      </div>
                    </div>
                    <div className="flex items-center justify-center pt-5 pl-2 sm:justify-start sm:pt-0">
                      {/* <a href={profile.fbLink}>
                        <i className="bx bxl-facebook-square text-2xl text-white hover:text-yellow"></i>
                      </a> */}
                      <a
                        href="https://twitter.com/marbabtahir"
                        className="pl-4"
                      >
                        <i className="bx bxl-twitter text-2xl text-white hover:text-yellow"></i>
                      </a>
                      <a
                        href="https://www.linkedin.com/in/marbabtahir/"
                        className="pl-4"
                      >
                        <i className="bx bxl-linkedin text-2xl text-white hover:text-yellow"></i>
                      </a>
                      <a href="https://github.com/arbab-tahir" className="pl-4">
                        <i className="bx bxl-github text-2xl text-white hover:text-yellow"></i>
                      </a>
                      {/* <a href={profile.instagramLink} className="pl-4">
                        <i className="bx bxl-instagram text-2xl text-white hover:text-yellow"></i>
                      </a> */}
                    </div>
                  </div>
                  <a className="ablogs" href={"/blogs"}>
                    <div className="buttons text-center md:text-left">
                      <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-2 px-4 py-1 my-4 rounded-lg">
                        All Blogs
                      </button>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-grey-50" id="about">
            <div className="container flex flex-col items-center py-16 md:py-20 lg:flex-row">
              <div className="w-full text-center sm:w-3/4 lg:w-3/5 lg:text-left">
                <h2 className="font-header text-4xl font-semibold uppercase whoami sm:text-5xl lg:text-6xl">
                  Who am I?
                </h2>
                <h4 className="pt-6 font-header text-xl font-medium text-black sm:text-2xl lg:text-3xl">
                  I'm Arbab Tahir, A Web Developer & Coder
                </h4>
                <p className="pt-6 font-body leading-relaxed text-grey-20">
                  Hey, I'm Arbab Tahir. Experienced engineer with 3 years in IT.
                  I'm a Front-end web developer who loves writing code, building
                  things, and solving problems. I build software and write code.
                  I write bugs and call them features. I work with different
                  technologies like... (Html, CSS, Javascript, React.Js,
                  Next.Js, Vue.Js) {/* <ul className="descList"> */}
                  {/* <span className="block font-body font-bold text-grey-40"> */}
                  {/* <li>Html</li>
                  <li>CSS</li>
                  <li>Javascript</li>
                  <li>React.Js</li>
                  <li>Next.Js</li>
                  <li>Vue.js</li> */}
                  {/* </span> */}
                  {/* </ul> */}
                  and I use Frameworks for the front end and for develop the
                  creative designs (Bootstrap, React Bootstrap, Flexbox,
                  Tailwind Css) and some others. Javascript is my primary
                  programming language. I work with different technologies every
                  day. I like learning new things. I read books, and poetry, and
                  play games in my free time.
                </p>
                <div className="flex flex-col justify-center pt-6 sm:flex-row lg:justify-start">
                  <div className="flex items-center justify-center sm:justify-start">
                    <p className="font-body text-lg font-semibold uppercase text-grey-20">
                      Connect with me
                    </p>
                    <div className="hidden sm:block">
                      <i className="bx bx-chevron-right text-3xl text-purple-500"></i>
                    </div>
                  </div>
                  <div className="flex items-center justify-center pt-5 pl-2 sm:justify-start sm:pt-0">
                    {/* <a href="/">
                      <i className="bx bxl-facebook-square text-2xl text-primary hover:text-yellow"></i>
                    </a> */}
                    <a href="https://twitter.com/marbabtahir" className="pl-4">
                      <i className="bx bxl-twitter text-2xl whoami hover:text-yellow"></i>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/marbabtahir/"
                      className="pl-4"
                    >
                      <i className="bx bxl-linkedin text-2xl whoami hover:text-yellow"></i>
                    </a>
                    <a href="https://github.com/arbab-tahir" className="pl-4">
                      <i className="bx bxl-github text-2xl whoami hover:text-yellow"></i>
                    </a>
                    {/* <a href="/" className="pl-4">
                      <i className="bx bxl-instagram text-2xl text-primary hover:text-yellow"></i>
                    </a> */}
                  </div>
                </div>
              </div>
              <div className="w-full pl-0 pt-10 sm:w-3/4 lg:w-2/5 lg:pl-12 lg:pt-0">
                <div>
                  <div className="flex items-end justify-between">
                    <h4 className="font-body font-semibold uppercase text-black">
                      HTML & CSS
                    </h4>
                    <h3 className="font-body whoami text-3xl font-bold text-primary">
                      85%
                    </h3>
                  </div>
                  <div className="mt-2 h-3 w-full rounded-full bg-lila">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>
                <div className="pt-6">
                  <div className="flex items-end justify-between">
                    <h4 className="font-body font-semibold uppercase text-black">
                      Problem Solving
                    </h4>
                    <h3 className="font-body whoami text-3xl font-bold text-primary">
                      75%
                    </h3>
                  </div>
                  <div className="mt-2 h-3 w-full rounded-full bg-lila">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
                <div className="pt-6">
                  <div className="flex items-end justify-between">
                    <h4 className="font-body font-semibold uppercase text-black">
                      Javascript
                    </h4>
                    <h3 className="font-body whoami text-3xl font-bold text-primary">
                      98%
                    </h3>
                  </div>
                  <div className="mt-2 h-3 w-full rounded-full bg-lila">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                      style={{ width: "98%" }}
                    ></div>
                  </div>
                </div>
                <div className="pt-6">
                  <div className="flex items-end justify-between">
                    <h4 className="font-body font-semibold uppercase text-black">
                      Frameworks
                    </h4>
                    <h3 className="font-body text-3xl whoami font-bold text-primary">
                      91%
                    </h3>
                  </div>
                  <div className="mt-2 h-3 w-full  rounded-full bg-lila">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                      style={{ width: "91%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container py-16 md:py-20" id="services">
            <h2 className="text-center font-header whoami text-4xl font-semibold uppercase whoiam sm:text-5xl lg:text-6xl">
              Here's what I'm good at
            </h2>
            <h3 className="pt-6 text-center font-header text-xl font-medium text-black sm:text-2xl lg:text-3xl">
              These are the services Ioffer
            </h3>

            <div className="grid grid-cols-1 gap-6 pt-10 sm:grid-cols-2 md:gap-10 md:pt-12 lg:grid-cols-3">
              <div className="group rounded px-8 py-12 shadow-xl hover:bg-gradient-to-r from-purple-500 to-blue-500">
                <div className="mx-auto h-24 w-24 text-center xl:h-28 xl:w-28">
                  <div className="hidden group-hover:block">
                    <img
                      src="/assets/img/icon-development-white.svg"
                      alt="development icon"
                    />
                  </div>
                  <div className="block group-hover:hidden">
                    <img
                      src="/assets/img/icon-development-black.svg"
                      alt="development icon"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="pt-8 text-lg font-semibold uppercase text-purple-500 group-hover:text-yellow lg:text-xl">
                    WEB DEVELOPMENT
                  </h3>
                  <p className="text-grey pt-4 text-sm group-hover:text-white md:text-base">
                    I'm more Front-end focused and love to work with different
                    javascript frameworks and pure HTML and CSS.
                  </p>
                </div>
              </div>
              <div className="group rounded px-8 py-12 shadow-xl hover:bg-gradient-to-r from-purple-500 to-blue-500">
                <div className="mx-auto h-24 w-24 text-center xl:h-28 xl:w-28">
                  <div className="hidden group-hover:block">
                    <img
                      src="/assets/img/icon-content-white.svg"
                      alt="content marketing icon"
                    />
                  </div>
                  <div className="block group-hover:hidden">
                    <img
                      src="/assets/img/icon-content-black.svg"
                      alt="content marketing icon"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="pt-8 text-lg font-semibold uppercase text-purple-500 group-hover:text-yellow lg:text-xl">
                    Technical Writing
                  </h3>
                  <p className="text-grey pt-4 text-sm group-hover:text-white md:text-base">
                    I love to write about myself, my career, and my technical
                    passionate field of information technology (IT).
                  </p>
                </div>
              </div>
              <div className="group rounded px-8 py-12 shadow-xl hover:bg-gradient-to-r from-purple-500 to-blue-500">
                <div className="mx-auto h-24 w-24 text-center xl:h-28 xl:w-28">
                  <div className="hidden group-hover:block">
                    <img
                      src="/assets/img/icon-mobile-white.svg"
                      alt="Mobile Application icon"
                    />
                  </div>
                  <div className="block group-hover:hidden">
                    <img
                      src="/assets/img/icon-mobile-black.svg"
                      alt="Mobile Application icon"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="pt-8 text-lg font-semibold uppercase text-purple-500 group-hover:text-yellow lg:text-xl">
                    Responsive Interface
                  </h3>
                  <p className="text-grey pt-4 text-sm group-hover:text-white md:text-base">
                    I provide services to my clients during the development of a
                    project like a (User-Friendly) website be it consists single
                    page or multi-pages.
                  </p>
                </div>
              </div>
              <div className="group rounded px-8 py-12 shadow-xl hover:bg-gradient-to-r from-purple-500 to-blue-500">
                <div className="mx-auto h-24 w-24 text-center xl:h-28 xl:w-28">
                  <div className="hidden group-hover:block">
                    <img
                      src="/assets/img/icon-email-white.svg"
                      alt="Email Marketing icon"
                    />
                  </div>
                  <div className="block group-hover:hidden">
                    <img
                      src="/assets/img/icon-email-black.svg"
                      alt="Email Marketing icon"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="pt-8 text-lg font-semibold uppercase text-purple-500 group-hover:text-yellow lg:text-xl">
                    Email Development
                  </h3>
                  <p className="text-grey pt-4 text-sm group-hover:text-white md:text-base">
                    I'm Providing the service of the process of constructing an
                    email, which includes body text, images, and design layout.
                  </p>
                </div>
              </div>
              <div className="group rounded px-8 py-12 shadow-xl hover:bg-gradient-to-r from-purple-500 to-blue-500">
                <div className="mx-auto h-24 w-24 text-center xl:h-28 xl:w-28">
                  <div className="hidden group-hover:block">
                    <img
                      src="/assets/img/icon-design-white.svg"
                      alt="Theme Design icon"
                    />
                  </div>
                  <div className="block group-hover:hidden">
                    <img
                      src="/assets/img/icon-design-black.svg"
                      alt="Theme Design icon"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="pt-8 text-lg font-semibold uppercase text-purple-500 group-hover:text-yellow lg:text-xl">
                    Graphic Design
                  </h3>
                  <p className="text-grey pt-4 text-sm group-hover:text-white md:text-base">
                    I also have a little experience in graphic design using some
                    online tools or software like (Wix, WordPress, Canvas), etc.
                  </p>
                </div>
              </div>
              <div className="group rounded px-8 py-12 shadow-xl hover:bg-gradient-to-r from-purple-500 to-blue-500">
                <div className="mx-auto h-24 w-24 text-center xl:h-28 xl:w-28">
                  <div className="hidden group-hover:block">
                    <img
                      src="/assets/img/icon-graphics-white.svg"
                      alt="Graphic Design icon"
                    />
                  </div>
                  <div className="block group-hover:hidden">
                    <img
                      src="/assets/img/icon-graphics-black.svg"
                      alt="Graphic Design icon"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="pt-8 text-lg font-semibold uppercase text-purple-500 group-hover:text-yellow lg:text-xl">
                    Creative Coding
                  </h3>
                  <p className="text-grey pt-4 text-sm group-hover:text-white md:text-base">
                    I love creative coding because I do both coding & designing.
                    making beautiful art with code is very satisfying to me.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Past-Projects Section */}
          {/* <div className="container py-16 md:py-20" id="portfolio">
            <h2 className="text-center font-header text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl">
              Check out my Portfolio
            </h2>
            <h3 className="pt-6 text-center font-header text-xl font-medium text-black sm:text-2xl lg:text-3xl">
              Here's what I have done with the past
            </h3>

            <div className="mx-auto grid w-full grid-cols-1 gap-8 pt-12 sm:w-3/4 md:gap-10 lg:w-full lg:grid-cols-2">
              <a
                href="/"
                className="mx-auto transform transition-all hover:scale-105 md:mx-0"
              >
                <img
                  src="/assets/img/portfolio-apple.jpeg"
                  className="w-full shadow"
                  alt="portfolio image"
                />
              </a>
              <a
                href="/"
                className="mx-auto transform transition-all hover:scale-105 md:mx-0"
              >
                <img
                  src="/assets/img/portfolio-stripe.jpeg"
                  className="w-full shadow"
                  alt="portfolio image"
                />
              </a>
              <a
                href="/"
                className="mx-auto transform transition-all hover:scale-105 md:mx-0"
              >
                <img
                  src="/assets/img/portfolio-fedex.jpeg"
                  className="w-full shadow"
                  alt="portfolio image"
                />
              </a>
              <a
                href="/"
                className="mx-auto transform transition-all hover:scale-105 md:mx-0"
              >
                <img
                  src="/assets/img/portfolio-microsoft.jpeg"
                  className="w-full shadow"
                  alt="portfolio image"
                />
              </a>
            </div>
          </div> */}

          {/* Latest-Client Section */}
          {/* <div className="bg-grey-50" id="clients">
            <div className="container py-16 md:py-20">
              <div className="mx-auto w-full sm:w-3/4 lg:w-full">
                <h2 className="text-center font-header text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl">
                  My latest clients
                </h2>
                <div className="flex flex-wrap items-center justify-center pt-4 sm:pt-4">
                  <span className="m-8 block">
                    <img
                      src="/assets/img/logo-coca-cola.svg"
                      alt="client logo"
                      className="mx-auto block h-12 w-auto"
                    />
                  </span>
                  <span className="m-8 block">
                    <img
                      src="/assets/img/logo-apple.svg"
                      alt="client logo"
                      className="mx-auto block h-12 w-auto"
                    />
                  </span>

                  <span className="m-8 block">
                    <img
                      src="/assets/img/logo-netflix.svg"
                      alt="client logo"
                      className="mx-auto block h-12 w-auto"
                    />
                  </span>

                  <span className="m-8 block">
                    <img
                      src="/assets/img/logo-amazon.svg"
                      alt="client logo"
                      className="mx-auto block h-12 w-auto"
                    />
                  </span>

                  <span className="m-8 block">
                    <img
                      src="/assets/img/logo-stripe.svg"
                      alt="client logo"
                      className="mx-auto block h-12 w-auto"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div> */}

          <div className="container py-16 md:py-20" id="work">
            <h2 className="text-center whoami font-header text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl">
              My work experience
            </h2>
            <h3 className="pt-6 text-center font-header text-xl font-medium text-black sm:text-2xl lg:text-3xl">
              Here's what I do
            </h3>

            <div className="relative mx-auto mt-12 flex w-full flex-col lg:w-2/3">
              <span className="left-2/5 absolute inset-y-0 ml-10 hidden w-0.5 bg-grey-40 md:block"></span>

              <div className="mt-8 flex flex-col text-center md:flex-row md:text-left">
                <div className="md:w-2/5">
                  <div className="flex justify-center md:justify-start">
                    <span className="shrink-0">
                      <img
                        src="/assets/img/logo-freelancers.svg"
                        className="h-auto w-32"
                        alt="company logo"
                      />
                    </span>
                    <div className="relative ml-3 hidden w-full md:block">
                      <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 transform bg-grey-70"></span>
                    </div>
                  </div>
                </div>
                <div className="md:w-3/5">
                  <div className="relative flex md:pl-18">
                    <span className="absolute left-8 top-1 hidden h-4 w-4 rounded-full border-2 border-grey-40 bg-white md:block"></span>

                    <div className="mt-1 flex">
                      <i className="bx bxs-right-arrow hidden text-purple-500 md:block"></i>
                      <div className="md:-mt-1 md:pl-8">
                        <span className="block font-body font-bold text-grey-40">
                          Mar 2021 - Feb 2023
                        </span>
                        <span className="block pt-2 font-header text-xl font-bold uppercase text-purple-500">
                          Freelancing
                        </span>
                        <div className="pt-2">
                          <span className="block font-body text-black">
                            I am freelancing as a front-end software engineer on
                            (freelancers.com) platform. Providing services to
                            the clients same as well as they want 🤩.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex flex-col text-center md:flex-row md:text-left">
                <div className="md:w-2/5">
                  <div className="flex justify-center md:justify-start">
                    <span className="shrink-0">
                      <img
                        src="/assets/img/logo-coding.svg"
                        className="h-auto w-32"
                        alt="company logo"
                      />
                    </span>
                    <div className="relative ml-3 hidden w-full md:block">
                      <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 transform bg-grey-70"></span>
                    </div>
                  </div>
                </div>
                <div className="md:w-3/5">
                  <div className="relative flex md:pl-18">
                    <span className="absolute left-8 top-1 hidden h-4 w-4 rounded-full border-2 border-grey-40 bg-white md:block"></span>

                    <div className="mt-1 flex">
                      <i className="bx bxs-right-arrow hidden text-purple-500 md:block"></i>
                      <div className="md:-mt-1 md:pl-8">
                        <span className="block font-body font-bold text-grey-40">
                          Mar 2022 - Jan 2023
                        </span>
                        <span className="block pt-2 font-header text-xl font-bold uppercase text-purple-500">
                          Associate Software Engineer
                        </span>
                        <div className="pt-2">
                          <span className="block font-body text-black">
                            I was working as an Associate Software Engineer at
                            olabooks. I have a great experience as an employer
                            life in my field, handled different modules as
                            required.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex flex-col text-center md:flex-row md:text-left">
                <div className="md:w-2/5">
                  <div className="flex justify-center md:justify-start">
                    <span className="shrink-0">
                      <img
                        src="/assets/img/logo-ola.svg"
                        className="h-auto w-32"
                        alt="company logo"
                      />
                    </span>
                    <div className="relative ml-3 hidden w-full md:block">
                      <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 transform bg-grey-70"></span>
                    </div>
                  </div>
                </div>
                <div className="md:w-3/5">
                  <div className="relative flex md:pl-18">
                    <span className="absolute left-8 top-1 hidden h-4 w-4 rounded-full border-2 border-grey-40 bg-white md:block"></span>

                    <div className="mt-1 flex">
                      <i className="bx bxs-right-arrow hidden text-purple-500 md:block"></i>
                      <div className="md:-mt-1 md:pl-8">
                        <span className="block font-body font-bold text-grey-40">
                          Mar 2022 - Dec 2022
                        </span>
                        <span className="block pt-2 font-header text-xl font-bold uppercase text-purple-500">
                          Front-end Developer
                        </span>
                        <div className="pt-2">
                          <span className="block font-body text-black">
                            I was working as a Front-End Developer for E-Khata
                            ERP at Arfa Software Technology Park (Lahore,
                            Pakistan).
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div
            className="bg-cover bg-top bg-no-repeat pb-16 md:py-16 lg:py-24"
            style={{
              backgroundImage: "url(/assets/img/experience-figure.png)",
            }}
            id="statistics"
          >
             <div className="container">
              <div className="mx-auto w-5/6 bg-white py-16 shadow md:w-11/12 lg:py-20 xl:py-24 2xl:w-full">
                <div className="grid grid-cols-2 gap-5 md:gap-8 xl:grid-cols-4 xl:gap-5">
                  <div className="flex flex-col items-center justify-center text-center md:flex-row md:text-left">
                    <div>
                      <img
                        src="/assets/img/icon-project.svg"
                        className="mx-auto h-12 w-auto md:h-20"
                        alt="icon project"
                      />
                    </div>
                    <div className="pt-5 md:pl-5 md:pt-0">
                      <h1 className="font-body text-2xl font-bold text-primary md:text-4xl">
                        12
                      </h1>
                      <h4 className="text-grey-dark font-header text-base font-medium leading-loose md:text-xl">
                        Finished Projects
                      </h4>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center text-center md:flex-row md:text-left">
                    <div>
                      <img
                        src="/assets/img/icon-award.svg"
                        className="mx-auto h-12 w-auto md:h-20"
                        alt="icon award"
                      />
                    </div>
                    <div className="pt-5 md:pl-5 md:pt-0">
                      <h1 className="font-body text-2xl font-bold text-primary md:text-4xl">
                        3
                      </h1>
                      <h4 className="text-grey-dark font-header text-base font-medium leading-loose md:text-xl">
                        Awards Won
                      </h4>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col items-center justify-center text-center md:mt-10 md:flex-row md:text-left lg:mt-0">
                    <div>
                      <img
                        src="/assets/img/icon-happy.svg"
                        className="mx-auto h-12 w-auto md:h-20"
                        alt="icon happy clients"
                      />
                    </div>
                    <div className="pt-5 md:pl-5 md:pt-0">
                      <h1 className="font-body text-2xl font-bold text-primary md:text-4xl">
                        8
                      </h1>
                      <h4 className="text-grey-dark font-header text-base font-medium leading-loose md:text-xl">
                        Happy Clients
                      </h4>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col items-center justify-center text-center md:mt-10 md:flex-row md:text-left lg:mt-0">
                    <div>
                      <img
                        src="/assets/img/icon-puzzle.svg"
                        className="mx-auto h-12 w-auto md:h-20"
                        alt="icon puzzle"
                      />
                    </div>
                    <div className="pt-5 md:pl-5 md:pt-0">
                      <h1 className="font-body text-2xl font-bold text-primary md:text-4xl">
                        99
                      </h1>
                      <h4 className="text-grey-dark font-header text-base font-medium leading-loose md:text-xl">
                        Bugs Fixed
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div> 
          </div> */}

          <div className="bg-grey-50" id="blog">
            <div className="container py-16 md:py-20">
              <h2 className="text-center whoami font-header text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl">
                I like to write
              </h2>
              <h4 className="pt-6 text-center font-header text-xl font-medium text-black sm:text-2xl lg:text-3xl">
                Check out my latest posts!
              </h4>
              <div className="mx-auto grid w-full grid-cols-1 gap-6 pt-12 sm:w-3/4 lg:w-full lg:grid-cols-3 xl:gap-10">
                {blogs.map((item) => {
                  return (
                    <Link
                      key={item.slug.current}
                      href={"/blog/" + item.slug.current}
                      className="shadow"
                    >
                      <div>
                        <div
                          style={{
                            backgroundImage: `url(${
                              builder.image(item.blogimage).width(200).url() ||
                              "/assets/img/post-01.png"
                            })`,
                          }}
                          className="group relative h-72 bg-cover bg-center bg-no-repeat sm:h-84 lg:h-64 xl:h-72"
                        >
                          <span className="absolute inset-0 block bg-gradient-href-b from-blog-gradient-from href-blog-gradient-href bg-cover bg-center bg-no-repeat opacity-10 transition-opacity group-hover:opacity-50"></span>
                          <span className="absolute right-0 bottom-0 mr-4 mb-4 block rounded-full border-2 bg-gradient-to-r from-purple-500 to-blue-500 border-white px-6 py-2 text-center font-body text-sm font-bold uppercase text-white md:text-base cursor-pointer ">
                            Read More
                          </span>
                        </div>
                        <div className="bg-white py-6 px-5 xl:py-8">
                          <span className="block font-body text-lg font-semibold text-black">
                            {" "}
                            {item.title}
                          </span>
                          <span className="block pt-2 font-body text-grey-20">
                            {item.metadesc}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
                {/* <a href="/post" className="shadow">
              <div style={{"backgroundImage": "url(/assets/img/post-02.png)"}}
                className="group relative h-72 bg-cover bg-center bg-no-repeat sm:h-84 lg:h-64 xl:h-72">
                <span
                  className="absolute inset-0 block bg-gradient-href-b from-blog-gradient-from href-blog-gradient-href bg-cover bg-center bg-no-repeat opacity-10 transition-opacity group-hover:opacity-50"></span>
                <span
                  className="absolute right-0 bottom-0 mr-4 mb-4 block rounded-full border-2 border-white px-6 py-2 text-center font-body text-sm font-bold uppercase text-white md:text-base">Read
                  More</span>
              </div>
              <div className="bg-white py-6 px-5 xl:py-8">
                <span className="block font-body text-lg font-semibold text-black">My personal productivity system</span>
                <span className="block pt-2 font-body text-grey-20">Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
              </div>
            </a>
            <a href="/post" className="shadow">
              <div style={{"backgroundImage": "url(/assets/img/post-03.png)"}}
                className="group relative h-72 bg-cover bg-center bg-no-repeat sm:h-84 lg:h-64 xl:h-72">
                <span
                  className="absolute inset-0 block bg-gradient-href-b from-blog-gradient-from href-blog-gradient-href bg-cover bg-center bg-no-repeat opacity-10 transition-opacity group-hover:opacity-50"></span>
                <span
                  className="absolute right-0 bottom-0 mr-4 mb-4 block rounded-full border-2 border-white px-6 py-2 text-center font-body text-sm font-bold uppercase text-white md:text-base">Read
                  More</span>
              </div>
              <div className="bg-white py-6 px-5 xl:py-8">
                <span className="block font-body text-lg font-semibold text-black">My year in review 2020</span>
                <span className="block pt-2 font-body text-grey-20">Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
              </div>
            </a> */}
              </div>
            </div>
          </div>
          <div className="container py-16 md:py-20" id="contact">
            <h2 className="text-center font-header text-4xl font-semibold uppercase whoami sm:text-5xl lg:text-6xl">
              Contact Me
            </h2>
            {/* <h4 className="pt-6 text-center font-header text-xl font-medium text-black sm:text-2xl lg:text-3xl">
              Have Any Questions?
            </h4> */}
            <div className="mx-auto w-full pt-5 text-center sm:w-2/3 lg:pt-6">
              <p className="font-body text-grey-10">
                If you want to discuss something or just say Hi, write here!
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="mx-auto w-full pt-10 sm:w-3/4"
            >
              <div className="flex flex-col md:flex-row">
                <input
                  className="mr-3 w-full rounded border-grey-50 px-4 py-3 font-body text-black md:w-1/2 lg:mr-5"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Name"
                  type="text"
                  id="name"
                />
                <input
                  className="mt-6 w-full rounded border-grey-50 px-4 py-3 font-body text-black md:mt-0 md:ml-3 md:w-1/2 lg:ml-5"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Email"
                  type="text"
                  id="email"
                />
              </div>
              <textarea
                className="mt-6 w-full rounded border-grey-50 px-4 py-3 font-body text-black md:mt-8"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                placeholder="Message"
                id="message"
                cols="30"
                rows="10"
              ></textarea>
              <button className="mt-6 flex items-center justify-center rounded bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-2 font-header text-lg font-bold uppercase text-white hover:bg-grey-20">
                Send
                <i className="bx bx-chevron-right relative -right-2 text-3xl"></i>
              </button>
            </form>
            <div className="flex flex-col pt-16 lg:flex-row">
              <div className="w-full border-l-2 border-t-2 border-r-2 border-b-2 border-grey-60 px-6 py-6 sm:py-8 lg:w-1/3">
                <div className="flex items-center">
                  <i className="bx bx-phone text-2xl text-grey-40"></i>
                  <p className="pl-2 font-body font-bold uppercase text-grey-40 lg:text-lg">
                    My Phone
                  </p>
                </div>
                <p className="pt-2 text-left font-body font-bold text-purple-500 lg:text-lg">
                  (+92) 315 4270 821
                </p>
              </div>
              <div className="w-full border-l-2 border-t-0 border-r-2 border-b-2 border-grey-60 px-6 py-6 sm:py-8 lg:w-1/3 lg:border-l-0 lg:border-t-2">
                <div className="flex items-center">
                  <i className="bx bx-envelope text-2xl text-grey-40"></i>
                  <p className="pl-2 font-body font-bold uppercase text-grey-40 lg:text-lg">
                    My Email
                  </p>
                </div>
                <p className="pt-2 text-left font-body font-bold text-purple-500 lg:text-lg">
                  arbabtahir2244@gmail.com
                </p>
              </div>
              <div className="w-full border-l-2 border-t-0 border-r-2 border-b-2 border-grey-60 px-6 py-6 sm:py-8 lg:w-1/3 lg:border-l-0 lg:border-t-2">
                <div className="flex items-center">
                  <i className="bx bx-map text-2xl text-grey-40"></i>
                  <p className="pl-2 font-body font-bold uppercase text-grey-40 lg:text-lg">
                    My Address
                  </p>
                </div>
                <p className="pt-2 text-left font-body font-bold text-purple-500 lg:text-lg">
                  Lahore, Punjab, Pakistan
                </p>
              </div>
            </div>
          </div>
          {/* <div
            className="h-72 bg-cover bg-center bg-no-repeat sm:h-64 md:h-72 lg:h-96"
            style={{ backgroundImage: "url(/assets/img/map.png)" }}
          ></div> */}
          {/* <div
            className="relative bg-primary bg-cover bg-center bg-no-repeat py-16 bg-blend-multiply lg:py-24"
            style={{ backgroundImage: "url(/assets/img/bg-cta.jpg)" }}
          >
            <div className="container relative z-30">
              <h3 className="text-center font-header text-3xl uppercase leading-tight tracking-wide text-white sm:text-4xl lg:text-5xl">
                Keep <span className="font-bold">up-href-date</span> <br />
                with what I'm up href
              </h3>
              <form className="mt-6 flex flex-col justify-center sm:flex-row">
                <input
                  className="w-full rounded px-4 py-3 font-body text-black sm:w-2/5 sm:py-4 lg:w-1/3"
                  type="text"
                  id="email"
                  placeholder="Give me your Email"
                />
                <button className="mt-2 rounded bg-yellow px-8 py-3 font-body text-base font-bold uppercase text-primary transition-colors hover:bg-primary hover:text-white focus:border-transparent focus:outline-none focus:ring focus:ring-yellow sm:ml-2 sm:mt-0 sm:py-4 md:text-lg">
                  Join the club
                </button>
              </form>
            </div>
          </div> */}

          <div className="top-to-btm">
            {" "}
            {showTopBtn && (
              <FaAngleUp
                className="icon-position icon-style"
                onClick={goToTop}
              />
            )}{" "}
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-blue-500">
          <div className="container flex flex-col justify-between py-6 sm:flex-row">
            <p className="text-center font-body text-white md:text-left">
              © Copyright 2023. Made with 💖, by Arbab Tahir.
            </p>
            <div className="flex items-center justify-center pt-5 sm:justify-start sm:pt-0">
              <a href="https://twitter.com/marbabtahir" className="pl-4">
                <i className="bx bxl-twitter text-2xl text-white hover:text-yellow"></i>
              </a>

              <a
                href="https://www.linkedin.com/in/marbabtahir/"
                className="pl-4"
              >
                <i className="bx bxl-linkedin text-2xl text-white hover:text-yellow"></i>
              </a>

              <a href="https://github.com/arbab-tahir" className="pl-4">
                <i className="bx bxl-github text-2xl text-white hover:text-yellow"></i>
              </a>
            </div>
          </div>
        </div>
      </>
    </>

    // <div className="home mx-8">
    //   <h1>{blogs[0].title}</h1>
    //   <div className="mx-8">

    //   <PortableText
    //   // Pass in block content straight from Sanity.io
    //   content={blogs[0].content}
    //   projectId = "wtvm182x"
    // dataset = "production"
    //   // Optionally override marks, decorators, blocks, etc. in a flat
    //   // structure without doing any gymnastics
    //   serializers={{
    //     h1: (props) => <h1 style={{ color: "red" }} {...props} />,
    //     li: ({ children }) => <li className="special-list-item">{children}</li>,
    //   }}
    // />
    //   </div>
    //   <span>I am homepage</span>
    // </div>
  );
}

export async function getServerSideProps(context) {
  const client = createClient({
    projectId: "wtvm182x",
    dataset: "production",
    useCdn: false,
  });
  const query = `*[_type == "blog"][0...3]`;
  const blogs = await client.fetch(query);

  const profileQuery = `*[_type == "profile"][0]`;
  const profile = await client.fetch(profileQuery);

  return {
    props: {
      blogs,
      profile,
    },
  };
}
