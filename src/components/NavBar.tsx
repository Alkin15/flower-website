import Link from "next/link";

import FlowerLogo from "../images/flocker.svg";

const Navbar: React.FC = () => {
  return (
    <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-center h-12 px-5 bg-white">
      {/* Logo and title */}
      <div className="flex items-center">
        <Link href="/">
          <a>
            <FlowerLogo className="w-8 h-8 ml-2 mr-2" />
          </a>
        </Link>
        <span className="text-2xl font-semibold">
          <Link href="/">Flower Basket</Link>
        </span>
      </div>
      {/* Search Bar */}
      <div className="flex items-center mx-auto bg-gray-100 border rounded hover:border-blue-500 hover:bg-white">
        <i className="pl-4 pr-3 text-gray-500 fas fa-search"></i>
        <input
          type="text"
          className="py-1 pr-3 bg-transparent rounded w-160 focus:outline-none"
          placeholder="Search"
        />
      </div>
      {/* Auth buttons */}
      <div className="flex">
        <Link href="/login">
          <a className="w-32 py-2 mr-2 hollow blue button">Log In</a>
        </Link>
        <Link href="/login">
          <a className="w-32 py-2 mr-2 blue button">Sign Up</a>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
