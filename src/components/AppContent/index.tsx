import {
  Routes,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import Home from "../Home";
import Customers from "../Customer";
import AddCustomer from "../AddCustomer/inde";
import EditCustomer from "../EditCustomer";
import Products from "../Products";
import AddProduct from "../AddProduct";
import EditProduct from "../EditProduct";
import OrderDetails from "../OderDetails";
import NewOrder from "../NewOrder";
import Wellcome from "../Wellcome";
import Login from "../Login";
import Logout from "../Logout";
import Register from "../Register";
import PrivateRoute from "../PrivateRoute";
import Footer from "../Footer";

function AppContent() {
  const location = useLocation();
  const hideNav = ["/", "/login", "/register"].includes(location.pathname);

  const getLinkClass = (path: string) => {
    return location.pathname === path ? "app__nav-link active" : "app__nav-link";
  };

  return (
    <div className="app">
      {!hideNav && (
        <nav className="app__nav">
          <Link className={getLinkClass("/wellcome")} to="/wellcome">
            Inicio
          </Link>
          <Link className={getLinkClass("/customers")} to="/customers">
            Customers
          </Link>
          <Link className={getLinkClass("/products")} to="/products">
            Products
          </Link>
          <Link className={getLinkClass("/order-details")} to="/order-details">
            Order Details
          </Link>
          <Logout />
        </nav>
      )}

      <div className="app__content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/wellcome"
            element={
              <PrivateRoute>
                <Wellcome />
              </PrivateRoute>
            }
          />
          <Route
            path="/customers"
            element={
              <PrivateRoute>
                <Customers />
              </PrivateRoute>
            }
          />
          <Route
            path="/customers/add"
            element={
              <PrivateRoute>
                <AddCustomer />
              </PrivateRoute>
            }
          />
          <Route
            path="/customers/edit/:id"
            element={
              <PrivateRoute>
                <EditCustomer />
              </PrivateRoute>
            }
          />
          <Route
            path="/products"
            element={
              <PrivateRoute>
                <Products />
              </PrivateRoute>
            }
          />
          <Route
            path="/products/add"
            element={
              <PrivateRoute>
                <AddProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/products/edit/:id"
            element={
              <PrivateRoute>
                <EditProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/order-details"
            element={
              <PrivateRoute>
                <OrderDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/order/new"
            element={
              <PrivateRoute>
                <NewOrder />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
      {!hideNav && <Footer />}
    </div>
  );
}

export default AppContent;
