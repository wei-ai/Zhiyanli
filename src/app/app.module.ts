import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstComponent } from './first/first.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContactModule } from './contact/contact.module';
import { ProductsModule } from './products/products.module';
import { WishModule } from './wish/wish.module';
import { BalloonGameComponent } from './balloon-game/balloon-game.component';

@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
    NotFoundComponent,
    BalloonGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ContactModule,
    ProductsModule,
    WishModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
