import { Component, OnInit } from '@angular/core';
import { Produtos } from '../model/produto.model';
import { DatabaseService } from '../servico/database.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { FirebaseService } from '../servico/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  /* Atributos para cima */
  titulo = 'Dona Zilda Bolos';
  imagem = 'https://cdn.pixabay.com/photo/2018/10/04/11/37/woman-3723444_640.jpg';
  
  /* Array do ngFor */
  /* Produtos é o meu molde */
  minhaLista:any[] = [];

  /* Métodos para baixo */
  constructor(
    /* Nosso serviço de banco de dados */
    //private bancoDados: DatabaseService,
    
    /* Serviço do firebase */
    private firebaseService: FirebaseService,

    /* Vou fazer um carregando */
    private loadinControl: LoadingController,

    /* Vou fazer um toast - Ou seja uma mensagem  */
    private toast: ToastController
    
    ) {}

  ngOnInit(): void {
    /* Inicia o carregando */
    this.carregando();

   /* Consulta os dados na WebAPI  HTTPCLIENT */
   //this.bancoDados.consulta().subscribe(caixa => this.minhaLista = caixa);

   /* Consulta os dados no firebase */
   this.firebaseService.consulta().subscribe(results => this.minhaLista = results);
  }

  /* Método do carregando(Loading) */
  async carregando(){
    const load = this.loadinControl.create({
      mode: 'ios',
      message: 'Aguarde...',
      duration: 2000
    });
    (await load).present();
  }

  /* Metodo do toastcontroller(ToastController) */
  async mensagem(){
    const msg = this.toast.create({
      mode: 'ios',
      message: 'Item excluido com sucesso!',
      color: 'danger',
      position: 'top',
      duration: 2000
    }); 
    (await msg).present();
  }

  /* Método do botão excluir */
  apaguei(id: any){
    this.firebaseService.excluir(id);

    /* Mensagem */
    this.mensagem();

    /* Aguarda 2 segunds e atualiza a pagina */
    /* setTimeout(this.refresh,2000); */
  }

  /* Metodo que executa um reload */
  /* refresh(){
    location.reload();
  } */


}
