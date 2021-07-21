
import { withTranslation } from '../i18n';
import GoogleLogo from "../src/img/google.svg";
import FaceLogo from "../src/img/Facebook.svg";
import LoginImg from "../src/img/login.svg";

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
                    <p>¿Olvidaste tu contraseña? <span className="span">Click aqui</span></p>
                    <button className="btn">Ingresar</button>
                    <p>¿No tienes una cuenta? <span className="span">Crear una</span></p>
                </form>
            </div>
            <img className="image-container" src={LoginImg} alt=""></img>
        </div>
    );
};

IndexPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(IndexPage);
/*
<div className="login-info-container">
                <h1 className="title">Log in with</h1>
                <div className="social-login">
                    <div className="social-login-element">
                        <img src="images/google.svg" alt="google-image">
                        <span>Google</span>
                    </div>
                    <div className="social-login-element">
                        <img src="images/facebook.svg" alt="facebook-image">
                        <span>Facebook</span>
                    </div>
                </div>
                <p>or</p>
                <form className="inputs-container">
                    <input className="input" type="text" placeholder="Username">
                    <input className="input" type="text" placeholder="Password">
                    <p>Forgot password? <span className="span">Click here</span></p>
                    <button className="btn">login</button>
                    <p>Don't have an account? <span className="span">Sign Up</span></p>
                </form>
            </div>
                <img className="image-container" src="images/login.svg" alt=""></img>
*/