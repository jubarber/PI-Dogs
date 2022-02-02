import { Link } from 'react-router-dom';


export default function Nav(){
  return(
    <nav>
      <div>
      <Link to='/home'>
        <span>Home</span>
      </Link>
      <Link to='/form'>
        <span>Crea tu raza</span>
      </Link>
      </div>
    </nav>
  )
}