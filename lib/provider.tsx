"use client";
import AuthProvider from "react-auth-kit/AuthProvider";
import createStore from "react-auth-kit/createStore";
import ReactQueryProvider from "./queryclientprovider";

const store = createStore({
  authName: "__auth",
  authType: "cookie",
  cookieDomain: process.env.NEXT_PUBLIC_DOMAIN,
  cookieSecure: false,
});

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactQueryProvider>
      <AuthProvider store={store}>{children}</AuthProvider>
    </ReactQueryProvider>
  );
};

export default Providers;
