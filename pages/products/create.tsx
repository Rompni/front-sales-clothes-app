import styles from '../../styles/Home.module.scss';
import { withTranslation } from '../../i18n';
import Input from '../../components/ui/Input';
import Grid from '../../components/common/Grid';
import Text from '../../components/ui/Text';
import Radio from '../../components/ui/Radio';
import InputColor from '../../components/products/inputColor';
import InputFile from '../../components/products/InputFile';
import Button from '../../components/ui/Button';

const Login = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div>
        <form>
          <Grid layout="normal" variant="filled">
            <div>
              <Text variant="body">Numero de referencia</Text>
              <Input></Input>
              <Text variant="body">Nombre</Text>
              <Input></Input>
              <Text variant="body">Descripcion</Text>
              <Input></Input>
              <Text variant="body">Precio</Text>
              <Input></Input>
            </div>
            <div className="radioGroup">
              <Text variant="body">Escoja la talla disponible</Text>
              <Radio className="inputRadio" text="XS"></Radio>
              <Radio className="inputRadio" text="S"></Radio>
              <Radio className="inputRadio" text="M"></Radio>
              <Radio className="inputRadio" text="L"></Radio>
              <Radio className="inputRadio" text="XL"></Radio>
            </div>
            <div>
              <Text variant="body">Escoja el color disponible</Text>
              <InputColor></InputColor>
              <Text variant="body">Seleccione la foto del producto</Text>
              <InputFile></InputFile>
              <br></br>
            </div>
            <div><Button>Submit</Button></div>
          </Grid>
        </form>
      </div>
    </div>
  );
};

Login.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(Login);
