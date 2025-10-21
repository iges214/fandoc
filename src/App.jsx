import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HOMEPAGE/HomePage';
import SingleProduct from './components/SingleProducts/SingleProduct';
function App() {

  return (
    <BrowserRouter>
    <div>
      <Routes>
       <Route path='/' element={<HomePage/>}/>
        <Route path="/product/:productId" element={<SingleProduct/>}/>
        {/* <Route path="/category/:categoryName" element={<CategoryProducts />} /> */}
      </Routes>
    </div>
    </BrowserRouter>
  )
}
 
export default App
