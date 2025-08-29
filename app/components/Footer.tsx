import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="h-28 bg-white">
      <div className="wrapper footer-container">
        <Link to="/">
          <img
            src="/assets/icons/logo.svg"
            alt="logo"
            className="size-[30px]"
          />
          <h1>Tourall</h1>
        </Link>

        <div>
          {["Terms & Conditions", "Privacy Policy"].map((item) => (
            <Link to="/" key={item}>
              {item}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
