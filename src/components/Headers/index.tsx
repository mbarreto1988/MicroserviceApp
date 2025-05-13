import { Link } from "react-router-dom";
import Logout from "../Logout";

const Headers = () => {
  const hideNav = ["/", "/login", "/register"].includes(location.pathname);
  const getLinkClass = (path: string) => {
    return location.pathname === path
      ? "app__nav-link active"
      : "app__nav-link";
  };
  return (
    <>
      {!hideNav && (
        <nav className="app__nav">
          <Link className={getLinkClass("/wellcome")} to="/wellcome">
            <i className="fa-solid fa-house"></i>
          </Link>
          <Link className={getLinkClass("/customers")} to="/customers">
            <i className="fa-regular fa-address-book"></i> Customers
          </Link>
          <Link className={getLinkClass("/products")} to="/products">
            <i className="fa-solid fa-gift"></i> Products
          </Link>
          <Link className={getLinkClass("/order-details")} to="/order-details">
            <i className="fa-solid fa-file"></i> Order Details
          </Link>
          <Logout />
        </nav>
      )}
    </>
  );
};

export default Headers;
