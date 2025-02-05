import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstComponent } from './first/first.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContactComponent } from './contact/contact.component';
import { ProductslistComponent } from './products/productslist/productslist.component';
import { ProductdetailsComponent } from './products/productdetails/productdetails.component';
import { WishComponent } from './wish/wish.component';
import { BalloonGameComponent } from './balloon-game/balloon-game.component';

const routes: Routes = [
  { path: '', component: FirstComponent},
  { path: 'wish', component: WishComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'products', component: ProductslistComponent},
  { path: 'products/:id', component: ProductdetailsComponent},
  { path: 'BallonGame', component: BalloonGameComponent},
  { path: '**', component: NotFoundComponent}
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
