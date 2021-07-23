import {db} from './setup';

export async function crearProd(data){
    return await db
        .collection('products')
        .doc()
        .set(data);
}

/*
export async function crearDoc(data){
    return await db
        .collection('tareas')
        .doc()
        .set(data);
}

export async function borrarDoc(id){
    return await db
        .collection('tareas')
        .doc(id)
        .delete();
}

export async function actualizarDoc(data, id){
    return await db
        .collection('tareas')
        .doc(id)
        .update(data);
}*/