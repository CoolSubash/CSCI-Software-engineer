import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import SignIn from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Privacy from './pages/Privacy/Privacy';
import Terms from './pages/Term/Term';
import Product from './pages/Product/Product';
import Error from './pages/Error/Error';
import ProductDetails from './pages/Productdetails/ProductDetails';
import { CartProvider } from './pages/context/CartContext';
import Cart from './pages/Cart/Cart';
import ProductCreate from './pages/CreateProduct/ProductCreate';
import MyProducts from './pages/MyProduct/MyProduct';
import UpdateProduct from './pages/UpdateProduct/UpdateProduct';
import CheckOut from './pages/CheckOut/CheckOut';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Order from './pages/Order/Order';

// Load your Stripe public key
const stripePromise = loadStripe('pk_test_51QFHrdRwaftnqctQTMVntTGVH207mAeGA5sQwuiTQQQCPa02O2fXWIJkj5JQD8UBOxbT3KR2QOP0LWUW1CA7Yo4t00TLVJ1TUg');

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="about" element={<About />} />
            <Route path="product" element={<Product />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="cart" element={<Cart />} />
            <Route path="/product/create" element={<ProductCreate />} />
            <Route path="/product/update/:id" element={<UpdateProduct />} />
            <Route path="/myproduct" element={<MyProducts />} />
            <Route path="/order" element={<Order />} />

            {/* Wrap CheckOut with Elements to provide Stripe context */}
            <Route
              path="/checkout"
              element={
                <Elements stripe={stripePromise}>
                  <CheckOut />
                </Elements>
              }
            />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
