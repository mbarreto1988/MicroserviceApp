import { useNavigate } from "react-router-dom";


function Home() {

  const navigate = useNavigate();

  return (
    <div className="home">
    <div className="home__buttons">
      <button className="home__button home__button--login" onClick={() => navigate('/login')}>Login</button>
      <button className="home__button home__button--register" onClick={() => navigate('/register')}>Register</button>
    </div>
  </div>
  );
}


export default Home;