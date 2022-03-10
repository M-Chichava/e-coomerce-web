import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagination } from '../shared/model/pagination';
import { IBrand } from './../shared/model/brand';
import { IProductType } from '../shared/model/productType';
import { map} from 'rxjs/operators';
import { shopParams } from './../shared/model/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  API_URL = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {
   }
   getProducts(shopParams: shopParams){
     let params = new HttpParams

     if(shopParams.brandId !== 0){
       params = params.append('brandId', shopParams.brandId.toString());
     }

     if (shopParams.search){
        params = params.append('search', shopParams.search)
     }

     if (shopParams.typeId !== 0){
       params = params.append('typeId', shopParams.typeId.toString());
     }

       params = params.append('sort', shopParams.sort)
       params = params.append('pageIndex', shopParams.pageNumber)
       params = params.append('pageSize', shopParams.pageSize)

     return this.http.get<IPagination>(this.API_URL + 'products', {observe: 'response', params})
     .pipe(
       map(
         response => {
           return response.body;
         }
       )
     )
   }
   getBrands(){
     return this.http.get<IBrand[]>(this.API_URL + 'products/brands');
   }
   getProductTypes(){
     return this.http.get<IProductType[]>(this.API_URL + 'products/types');
   }
}
