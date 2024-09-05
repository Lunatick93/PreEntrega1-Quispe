import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ItemListContainer } from "./components/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer";
import { NavBar } from "./components/NavBar";
import { Provider } from "./contexts/ItemsContext";
import { Cart } from "./components/Cart";

function App() {
  return (
    <Provider>
    <BrowserRouter>
      <NavBar />
      <div class="container text-center py-5">
        <h1 class="display-4 mb-4">Bienvenido a NIKA Moto Indumentaria</h1>
        <p class="lead">Descubre nuestra amplia selección de ropa y accesorios para los amantes de las motos. Desde camperas y botas hasta guantes y cascos, en NIKA encontrarás todo lo que necesitas para mantenerte seguro y con estilo en la carretera.</p>
        <p class="lead">Con productos de alta calidad y diseños modernos, NIKA es tu destino para equiparte con lo mejor en indumentaria para motociclistas.</p>
    </div>
      
      <Routes>
        <Route path="/" element={<ItemListContainer />} /> 
        <Route path="/category/:id" element={<ItemListContainer/>} />
         <Route path="/item/:id" element={<ItemDetailContainer />} />
         <Route path="/cart" element={<Cart />} />
         <Route path="*" element={404} />
      </Routes>
      
    </BrowserRouter>
    </Provider>
  );
}

export default App;