import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { ContactComponent } from './contact/contact.component';


@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent,
    ContactComponent
  ],
  imports: [
    CommonModule  ,
    PaginationModule.forRoot() 
  ],
  exports: [
    PaginationModule,
    PagingHeaderComponent,
    PagerComponent,
    ContactComponent
  ]
})
export class SharedModule { }
