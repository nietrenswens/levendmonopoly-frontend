"use client";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit/AuthProvider";
import ReactQueryProvider from "./queryclientprovider";

const store = createStore({
  authName: "__auth",
  authType: "cookie",
  cookieDomain: "localhost",
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
