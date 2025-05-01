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
          <Route path="privacy" element={<Privacy/>} />
          <Route path="terms" element={<Terms />} />
          <Route path="about" element={<About />} />
          <Route path="product" element={<Product/>}/>
          <Route path="product/:id" element={<ProductDetails/>}/>
          <Route path="cart" element={<Cart />} />

          <Route path="*" element={<Error/>} />
        </Route>
      </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
