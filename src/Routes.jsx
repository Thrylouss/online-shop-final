import {
  Account,
  Basket,
  Home,
  NotFoundPage,
  Products,
  SingleProduct,
} from "./pages";
import ProtectedRoute from "./context/ProtectedRoute"
import Auth from "./auth/Auth"
const routes = [
  { path: "/", element: <Home />, name: "Home" },
  { path: "/products", element: <Products />, name: "Products" },
  { path: "/product/:id", element: <SingleProduct />, name: "ProductId" },
  {
    path: "/cart",
    element: (
      <ProtectedRoute>
        <Basket />
      </ProtectedRoute>
    ),
    name: "Basket",
  },
  {
    path: "/account",
    element: (
      <ProtectedRoute>
        <Account />
      </ProtectedRoute>
    ),
    name: "Account",
    children: [
    //   { path: "profile", element: <Profile />, name: "Profile" },
    //   { path: "orders", element: <Orders />, name: "Orders" },
    ],
  },

  { path: "/auth", element: <Auth />, name: "auth" },
  { path: "*", element: <NotFoundPage />, name: "NotFound" },
];

export default routes;
