import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { IProduct } from '../shared/model/product';
import { ShopService } from '../services/api.service';
import { IBrand } from './../shared/model/brand';
import { IProductType } from './../shared/model/productType';
import { shopParams } from './../shared/model/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm: ElementRef
  products: IProduct[];
  brands: IBrand[];
  types: IProductType[];
  shopParams = new shopParams();

  initialCounter = 0;
  endCounter = 0;
  totalCount = 0;

  sortOptions = [
    { name: 'Alphabetical', value: 'name'},
    { name: 'Price: Low to High', value: 'priceAsc'},
    { name: 'Price: High to Low', value: 'priceDesc'},
  ]


  constructor(private shopSrvices: ShopService) { }

  ngOnInit(): void {
    this.getBrands();
    this.getProducts();
    this.getProductTypes();
  }
  getProducts() {

    this.shopSrvices.getProducts(this.shopParams).subscribe(response => {
      this.products = response.data;
      this.shopParams.pageNumber = response.pageIndex;
      this.shopParams.pageSize = response.pageSize;
      this.totalCount = response.count;
      this.elementCounterDisplay(response.count);
    }, error => {
      console.log(error)}
    );
  }

  getBrands(){
    this.shopSrvices.getBrands().subscribe(response => {
      this.brands = [{
        id: 0,
        name: 'All'
      },
        ...response
      ] ;
    }, error => {
      console.log(error)});
  }


  getProductTypes(){
    this.shopSrvices.getProductTypes().subscribe(response => {
      this.types = [{
        id: 0,
        name: 'All'
      },
        ...response
      ] ;
    }, error => {
      console.log(error)});
  }

  onBrandSelected(brandId: number){
    this.shopParams.brandId = brandId;
    this.getProducts()
  }

  onTypeSelected(typeId: number){
    this.shopParams.typeId = typeId;
    this.getProducts();
  }

  onSortSelected(sort: string){
    this.shopParams.sort=sort;
    this.getProducts();
  }

  onPageChanged(event: any){
    this.shopParams.pageNumber = event;
    this.getProducts();
  }
  onSearch(){
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.getProducts();
  }
  onReset(){
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new shopParams();
    this.getProducts();
  }

  elementCounterDisplay(counter: number){
    this.initialCounter = (this.shopParams.pageNumber-1) * this.shopParams.pageSize+1

    if(counter < (this.shopParams.pageNumber * this.shopParams.pageSize)){
      this.endCounter = counter
    }
    else{
      this.endCounter = this.shopParams.pageNumber * this.shopParams.pageSize;
    }

  }
}
