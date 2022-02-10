import { Cards } from "../Cards/Cards";
import NavBar from "../NavBar/Navbar.jsx";
import Pagination from "../Pagination/Pagination";

// aca renderizamos TODO, las dogs cards, la navbar(que dentro lleva la searchbar) y el filtro
export const Home = () => {
  return (
    <div>
      <NavBar/>
      <Pagination/>
      <Cards/>
    </div>
  );
};