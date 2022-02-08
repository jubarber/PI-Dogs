import { Cards } from "../Cards/Cards";
import NavBar from "../NavBar/Navbar.jsx";

// aca renderizamos TODO, las dogs cards, la navbar(que dentro lleva la searchbar) y el filtro
export const Home = () => {
  return (
    <div>
      <NavBar/>
      <Cards/>
    </div>
  );
};