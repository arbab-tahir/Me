import React from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { createClient } from "next-sanity";
import PortableText from "react-portable-text";
import Script from "next/script";
import { useEffect } from "react";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import NavBar from "../components/NavBar";

const Blogs = ({ blogs, profile }) => {
  const client = createClient({
    projectId: "wtvm182x",
    dataset: "production",
    useCdn: false,
  });
  const builder = imageUrlBuilder(client);

  useEffect(() => {
    console.log("thanks");
  }, []);
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

          <meta property="og:title" content="Blogs | Portfolio" />

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
      </>
      <div>
        <div className="bg-grey-50 my-12" id="blog">
          <div className="container mx-auto py-16 md:py-20">
            <h2 className="text-center whoami font-header text-4xl font-semibold uppercase sm:text-5xl lg:text-6xl">
              I like to write ❤
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
                        className="group relative h-72 bg-cover bg-center bg-no-repeat sm:h-84 lg:h-64 xl:h-72 cursor-pointer"
                      >
                        <span className="absolute inset-0 block bg-gradient-to-b from-blog-gradient-from to-blog-gradient-to bg-cover bg-center bg-no-repeat opacity-10 transition-opacity group-hover:opacity-50"></span>
                      </div>
                      <div className="bg-white py-6 px-5 xl:py-8 cursor-pointer">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;

export async function getServerSideProps(context) {
  const client = createClient({
    projectId: "wtvm182x",
    dataset: "production",
    useCdn: false,
  });
  const query = `*[_type == "blog"]`;
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
