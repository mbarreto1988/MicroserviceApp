import {
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import Home from "./Home";
import Customers from "./Customer";
import AddCustomer from "./AddCustomer/inde";
import EditCustomer from "./EditCustomer";
import Products from "./Products";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import OrderDetails from "./OderDetails";
import NewOrder from "./NewOrder";
import Wellcome from "./Wellcome";
import Login from "./Login";
import Register from "./Register";
import PrivateRoute from "../components/PrivateRoute";
import Footer from "../components/Footer";
import Headers from "../components/Headers";

function PagesComponents() {
  const location = useLocation();
  const hideNav = ["/", "/login", "/register"].includes(location.pathname);

  return (
    <div className="app">
      <Headers />
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

export default PagesComponents;
