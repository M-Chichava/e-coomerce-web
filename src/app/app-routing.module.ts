import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './shared/contact/contact.component';
import { ProductDetailComponent } from './shop/product-detail/product-detail.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'test-error', component: TestErrorComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'shop', loadChildren: () => import('./shop/shop.module').then  (mod => mod.ShopModule) },
  { path: 'shop/:id', component: ProductDetailComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
