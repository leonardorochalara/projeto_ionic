import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

/* Importar a ferramenta map do js */
import { map } from 'rxjs/operators';
import { Produtos } from '../model/produto.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  /* Preparar a variavel para receber as coleções do firebase  */
  dadosCollection:AngularFirestoreCollection

   /* Ferramenta que conecta nossa aplicação na coleção do firebase */
  constructor(private angularFirestore: AngularFirestore ){ 

    /* Passndo as coelçoes do firebase para nossa variável */    
    this.dadosCollection = angularFirestore.collection('listaProdutos');
  }

  /* Método de cadastro */
  cadastro(dados:any){
    return this.dadosCollection.add(dados);
  }

  /* Metodo consulta um */
  consultaUm(id:any){
    return this.dadosCollection.doc(id).valueChanges();
  }

  /* Metodo de consulta */
  consulta(){
    return this.dadosCollection.snapshotChanges().pipe(
      /* Vela do filtro. Separa os dados */
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data} /* ..., sintaxe spread do java script */
        })
      })
    );
  }

  /* Metodo de edição */
  editar(dados: any, id:any){
    return this.dadosCollection.doc(id).update(dados);
  }

  /* Metodo de exclusao */
  excluir(id:any){
    return this.dadosCollection.doc(id).delete();
  }
}
