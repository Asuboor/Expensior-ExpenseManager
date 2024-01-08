import React from "react";

const Footer = () => {
  const date=new Date();
  const year=date.getFullYear()
  return (
    <footer className="bg-dark text-center text-white">
      <div className="text-center p-3 bg-dark">
        © {year} Copyright:{" "}
        <a className="text-white" href="https://expensior.com">
          Expensior.com
        </a>
      </div>
    </footer>
  );
};

export default Footer;
