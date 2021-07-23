import styles from '../../styles/Home.module.scss';
import {useState} from "react";
import { withTranslation } from '../../i18n';
import Input from '../../components/ui/Input';
import Grid from '../../components/common/Grid';
import Text from '../../components/ui/Text';
import Radio from '../../components/ui/Radio';
import InputColor from '../../components/products/InputColor';
import InputFile from '../../components/products/InputFile';
import Button from '../../components/ui/Button';
import {db,crearProd} from "../../firebase/index";
import React from 'react';
import firebase from 'firebase';


const Login = (): JSX.Element => {
  
  const [ref, setRef] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [talla, setTalla] = useState('');
  const [color, setColor] = useState("#FFFFFF");
  const [uploadValue, setUploadValue] = useState(0);
  const [picture, setPicture] = useState("");

  const imprimir =()=>{
    console.log(ref);
    console.log(nombre);
    console.log(descripcion);
    console.log(precio);
    console.log(talla);
    console.log(color);
    console.log(picture);
    const producto = {reference:ref,name:nombre,description:descripcion,price:precio,size:talla,color:color,image:picture};
    crearProd(producto);
    alert("Se creo correctamente");
    //window.location.href="/products/create";
  }

  const establecerHex = e =>{
    setColor(e.target.value);
  }

  var docRef = db.collection("product").doc("SOVz5iWDevvblcr3A4xx");

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref('/image/'+file.name);
    const task = storageRef.put(file);
    task.on("state_changed",snapshot=>{
      if(snapshot.bytesTransferred == snapshot.totalBytes){
        alert("La imagen se cargo correctamente");
        task.snapshot.ref.getDownloadURL().then(function(url){
          setPicture(url);
        })
      }
    });
    
  };


  return (
    <div className={styles.container}>
      <div>
        <form>
          <Grid layout="normal" variant="filled">
            <div>
              <Text variant="body">Numero de referencia</Text>
              <Input onChange={setRef}></Input>
              <Text variant="body">Nombre</Text>
              <Input onChange={setNombre}></Input>
              <Text variant="body">Descripcion</Text>
              <Input onChange={setDescripcion} ></Input>
              <Text variant="body">Precio</Text>
              <Input onChange={setPrecio} ></Input>
            </div>
            <div className="radioGroup">
              <Text variant="body">Escoja la talla disponible</Text>
              <Radio className="inputRadio" onChange={setTalla} value="XS" text="XS"></Radio>
              <Radio className="inputRadio" onChange={setTalla} value="S" text="S"></Radio>
              <Radio className="inputRadio" onChange={setTalla} value="M" text="M"></Radio>
              <Radio className="inputRadio" onChange={setTalla} value="L" text="L"></Radio>
              <Radio className="inputRadio" onChange={setTalla} value="XL" text="XL"></Radio>
            </div>
            <div>
              <Text variant="body">Escoja el color disponible</Text>
              <InputColor value={color} onChange={establecerHex}></InputColor>
              <Text variant="body">Seleccione la foto del producto</Text>
              <InputFile onChange={handleUpload}></InputFile>
              <br></br>
            </div>
            <div>
              <Button type="button" onClick={imprimir}>Submit</Button>
            </div>
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
