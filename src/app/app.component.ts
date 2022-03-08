import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from './model/product';
import { IPagination } from './model/pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Xibazaranine';
  products: IProduct[];
  constructor(private http: HttpClient){

  }
  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/products?pageSize=50').subscribe((response: IPagination) => {
      this.products= response.data;
    }, error => {
      console.log(error);
    })
  }

}
