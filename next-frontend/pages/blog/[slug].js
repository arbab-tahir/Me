import { useRouter } from "next/router";
import Head from "next/head";
import { createClient } from "next-sanity";
import PortableText from "react-portable-text";
import NavBar from "../../components/navbar";
import Script from "next/script";
import { useEffect } from "react";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";

const Post = ({ blog, profile, author, blogs }) => {
  const router = useRouter();

  useEffect(() => {
    console.log(author, "Bloooooogsss!!");
  });

  const client = createClient({
    projectId: "wtvm182x",
    dataset: "production",
    useCdn: false,
  });
  const builder = imageUrlBuilder(client);

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

        <div>
          <div class="container py-6 md:py-10">
            <div class="mx-auto max-w-4xl">
              <div class="">
                <h1 class="pt-5 font-body text-3xl font-semibold whoami sm:text-4xl md:text-2xl xl:text-3xl">
                  {blog.title}
                </h1>
                <div class="flex items-center pt-5 md:pt-10">
                  {/* {author.map((item) => {
                    return(

                    )
                  })} */}
                  <div>
                    <img
                      src={builder.image(author.image).width(200).url()}
                      className="h-20 w-20 rounded-full border-2 border-grey-70 shadow"
                      alt="author"
                    />
                  </div>
                  <div class="pl-5">
                    <span class="block font-body text-xl font-bold text-grey-10">
                      By [{author.title}]
                    </span>
                    <span class="block pt-1 font-body text-sm font-bold text-grey-30">
                      {author.about}
                    </span>
                  </div>
                </div>
              </div>
              <div class="prose max-w-none pt-8">
                <PortableText
                  // Pass in block content straight from Sanity.io
                  content={blog.content}
                  projectId="wtvm182x"
                  dataset="production"
                  // Optionally override marks, decorators, blocks, etc. in a flat
                  // structure without doing any gymnastics
                  serializers={{
                    h1: (props) => <h1 style={{ color: "red" }} {...props} />,
                    li: ({ children }) => (
                      <li className="special-list-item">{children}</li>
                    ),
                  }}
                />
              </div>
              <div class="mt-10 flex justify-between border-t border-lila py-12">
                {/* <a href="#" class="flex items-center">
                  <i class="bx bx-left-arrow-alt text-2xl text-purple-500"></i>
                  <span class="block pl-2 font-body text-lg font-bold uppercase text-purple-500 md:pl-5">
                    Previous Post
                  </span>
                </a> */}

                {/* <a href="#" class="flex items-center">
                  <span class="block pr-2 font-body text-lg font-bold uppercase text-purple-500 md:pr-5">
                    Next Post
                  </span>
                  <i class="bx bx-right-arrow-alt text-2xl text-purple-500"></i>
                </a> */}
              </div>
              <div class="flex flex-col items-center border-t border-lila py-12 pt-12 md:flex-row md:items-start xl:pb-20">
                <div class="w-3/4 sm:w-2/5 lg:w-1/4 xl:w-1/5">
                  <img
                    src={builder.image(profile.image).width(200).url()}
                    className="rounded-full shadow"
                    alt="author"
                  />
                </div>
                <div class="ml-0 text-center md:ml-10 md:w-5/6 md:text-left">
                  <h3 class="pt-10 font-body text-2xl font-bold text-secondary md:pt-0">
                    {profile.title}
                  </h3>
                  <p class="pt-5 font-body text-lg leading-8 text-secondary sm:leading-9 md:text-xl md:leading-9 lg:leading-9 xl:leading-9">
                    I'm a <b>Software Developer</b> and I like development as
                    well as writing. This is my blogging page where I post
                    various blogs etc, regarding my field.{" "}
                    <i>
                      <span class=" pt-1 font-body text-sm font-bold text-grey-30">
                        Follow Me!
                      </span>
                    </i>
                  </p>
                  <div class="flex items-center justify-center pt-5 md:justify-start">
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
                  </div>
                </div>
              </div>
            </div>
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
      </>{" "}
    </>
  );
};

export default Post;

export const getServerSideProps = async (context) => {
  const { slug } = context.query;
  const client = createClient({
    projectId: "wtvm182x",
    dataset: "production",
    useCdn: false,
  });

  const query = `*[_type == "blog" && slug.current == '${slug}'][0]`;
  const blog = await client.fetch(query);
  const profileQuery = `*[_type == "profile"][0]`;
  const profile = await client.fetch(profileQuery);
  const authorQuery = `*[_type == "author"][0]`;
  const author = await client.fetch(authorQuery);
  return {
    props: {
      blog,
      profile,
      author,
    },
  };
};
