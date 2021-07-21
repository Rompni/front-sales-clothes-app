import { withTranslation } from '../i18n';
import GoogleLogo from "../src/img/google.svg";
import FaceLogo from "../src/img/Facebook.svg";


const IndexPage = (): JSX.Element => {
  return (
    <div className="login-container">
      <div className="login-info-container">
        <h1 className="title">Inicia sesion con</h1>
        <div className="social-login">
          <div className="social-login-element">
            <img src={GoogleLogo} alt="google-image"></img>
            <span>Google</span>
          </div>
          <div className="social-login-element">
            <img src={FaceLogo} alt="facebook-image"></img>
            <span>Facebook</span>
          </div>
        </div>
        <p>O</p>
        <form className="inputs-container">
          <input className="input" type="text" placeholder="Usuario"></input>
          <input className="input" type="text" placeholder="Contraseña"></input>
          <p>
            ¿Olvidaste tu contraseña? <span className="span">Click aqui</span>
          </p>
          <button className="btn">Ingresar</button>
          <p>
            ¿No tienes una cuenta? <span className="span">Crear una</span>
          </p>
        </form>
      </div>
      <div className="image-container">
        <img className="logoTel" src="/static/login.png"/>
      </div>
    </div>
  );
};

IndexPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(IndexPage);

