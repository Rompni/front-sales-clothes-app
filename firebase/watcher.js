import {auth, db} from './setup';

//cuando se llama pide callback y se invoca cada vez que existe un cambio en ciertos recursos

//ver cambios de usuario
export function watchUserChanges(callback){
    //si llamo la funcion se qutan el registro de elementos
    const unSub = auth.onAuthStateChanged((user)=>{
        //si el usuario es verdadero y no es anonimo
        if(user && !user.isAnonymous){
            //console.log("yeah");//esta logeado y se devuleven los datos
            callback({
                id: user.uid,
                email: user.email,
                displayName: user.displayName,
            })
        }else{
            console.log("Naranjas");//no logeado
            callback(null);
        }
    });

    return unSub;
}

//cambios en la coleccion
export function watchCollection(callback){
    watchUserChanges((user)=>{
        if(user){
            const unSub = db
            .collection('tareas').where("usuario","==",user.id)//nombre de la coleccion un snapshot es un punto de guardado
            .onSnapshot((snapshot) => {
                const docs = [];//aqui se guardan los documentos
                //se iteran los documentos
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    docs.push({
                        ...data,
                        id: doc.id,
                    });
                });

                callback(docs);//se regresa el vector de documentos
            });

        return unSub;
        }
    });
    
}