import { Route, Routes } from "react-router-dom";
import { SignIn } from "./pages/auth/SignIn";
import { SignUp } from "./pages/auth/SignUp";
import { Homepage } from "./pages/main/Homepage";
import { ProtectedRoute } from "./hooks/ProtectedRoute";
import { Cart } from "./pages/main/Cart";
import { AdminRoute } from "./hooks/AdminRoute";
import { NotAuthor } from "./pages/auth/NotAuthor";
import { Cancel } from "./pages/checkout/Cancel";
import { Success } from "./pages/checkout/Success";
import { Dashboard } from "./pages/admin/Dashboard";
import { Order } from "./pages/main/Order";
import { EditProfile } from "./pages/main/EditProfile";
import { Orders } from "./pages/admin/Orders";
import { Products } from "./pages/admin/Products";
import { Category } from "./pages/main/Category";

const App = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="not-authorized" element={<NotAuthor />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Homepage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order"
        element={
          <ProtectedRoute>
            <Order />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/edit"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout/cancel"
        element={
          <ProtectedRoute>
            <Cancel />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout/success"
        element={
          <ProtectedRoute>
            <Success />
          </ProtectedRoute>
        }
      />
      <Route
        path="/categories/:category"
        element={
          <ProtectedRoute>
            <Category />
          </ProtectedRoute>
        }
      />

      {/* Admin Route */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <Products />
            </AdminRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <Orders />
            </AdminRoute>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
