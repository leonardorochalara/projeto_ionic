import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { IonicModule } from '@ionic/angular';


/* Todo componente deve fazer parte de um modulo */


@NgModule({
  /* O declarations permite usar o componente de forma interna */
  /* Declara o componente */
  declarations: [HeaderComponent],  /* 
    O export permite usar o componente de forma externa 
    Ou seja em outros componentes
  */
  exports: [ HeaderComponent ],

  imports: [
    CommonModule,
    IonicModule
  ]
})
export class HeaderModule { }
