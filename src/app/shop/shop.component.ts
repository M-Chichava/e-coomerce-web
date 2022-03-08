import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/model/product';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products: IProduct[];

  constructor(private shopSrvices: ShopService) { }

  ngOnInit(): void {
    this.shopSrvices.getProducts().subscribe(response => {
      this.products = response.data;
    }, error => {
      console.log(error)}
    );
  }

}
