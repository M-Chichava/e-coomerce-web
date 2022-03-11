import { Component, OnInit } from '@angular/core';
import { IProduct } from './../../shared/model/product';
import { ShopService } from './../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: IProduct;

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute, 
    private breadCService: BreadcrumbService) { }

  ngOnInit(): void {
    this.loadProduct()
  }

  loadProduct(){
    this.shopService.getProduct(+this.activatedRoute.snapshot.paramMap.get('id'))
    .subscribe(product => {
      this.product = product
      this.breadCService.set('@productDetails',"Product Detail / "+ product.name)
    }, error => {
      console.log(error)
    });
  }

}
