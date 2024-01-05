import Button from "@components/Button";
import { PATHS } from "@constants/path";
import React from "react";

const Page404 = () => {
  return (
    <main className="mainwrapper notfoundpage">
      <section>
        <div className="container">
          <h2 className="title --t1">404</h2>
          <p>Không tìm thấy trang</p>
          <Button link={PATHS.HOME}>Trang chủ</Button>
        </div>
      </section>
    </main>
  );
};

export default Page404;
