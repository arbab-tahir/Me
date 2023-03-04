import "../styles/globals.css";
// import { GlobalContent } from "@components/GlobalContent/GlobalContent";
import dynamic from "next/dynamic";
import { ReactNode } from "react";

// Fixes: Hydration failed because the initial UI does not match what was rendered on the server.
// const DynamicContextProvider = dynamic(
//   () =>
//     import("@components/ContextProvider/ContextProvider").then(
//       (mod) => mod.ContextProvider
//     ),
//   {
//     ssr: false,
//   }
// );

function MyApp({ Component, pageProps }) {
  return (
    // <DynamicContextProvider>
    //   <GlobalContent>
    <Component {...pageProps} />
    //   </GlobalContent>
    // </DynamicContextProvider>
  );
}

export default MyApp;
