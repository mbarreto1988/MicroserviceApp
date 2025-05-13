import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="home__buttons">
        <Button
          ButtonClassName="home__button home__button--login"
          ButtonText="Login"
          ButonOnClick={() => navigate("/login")}
        />
        <Button
          ButtonClassName="home__button home__button--register"
          ButtonText="Register"
          ButonOnClick={() => navigate("/register")}
        />
      </div>
    </div>
  );
}

export default Home;
