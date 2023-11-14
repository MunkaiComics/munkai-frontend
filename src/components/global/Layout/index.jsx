import React, { useState, useEffect } from "react";
import BackButton from "../BackButton";
import BlockingLoader from "../BlockingLoader";
import Nav from "../nav";
import "./layout.scss";

function Layout({ children, promise }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (promise) {
        await promise;
        setLoading(false);
      } else {
        setTimeout(() => setLoading(false), 1000);
      }
    })();
  }, [promise]);

  return (
    <>
      {loading ? <BlockingLoader /> : null}

      <div className='layout restricted-width'>
        <Nav />
        <BackButton />

        <div className='main-content'>{children}</div>
      </div>
    </>
  );
}

export default Layout;
