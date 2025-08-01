import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pagination } from '../../shared/pagination';
import { Product } from '../../shared/models/product';
import { ShopParams } from '../../shared/models/shopParams';


@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:44312/api/';
  private http = inject(HttpClient);
  types: string[] = [];
  brands: string[] = [];


  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();

    if (shopParams.brands && shopParams.brands.length > 0) {
      params = params.append('brands', shopParams.brands.join(','));
    }

    if (shopParams.types && shopParams.types.length > 0) {
      params = params.append('types', shopParams.types.join(','));
    }

    if (shopParams.sort) {
      params = params.append('sort', shopParams.sort);
    }

    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }

    params = params.append('pageSize', shopParams.pageSize);

    params = params.append('pageIndex', shopParams.pageNumber);


    return this.http.get<Pagination<Product>>(this.baseUrl + 'products', { params })
  }

  getProduct(id: number) {
    return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }

  getBrands() {
    if (this.brands.length > 0) return;

    this.http.get<string[]>(this.baseUrl + 'products/brands').subscribe({
      next: response => {
        this.brands = response;
        console.log('Brands loaded:', this.brands);
      },
      error: err => {
        console.error('Error loading brands:', err);
      }
    });
  }
  getTypes() {
    if (this.types.length > 0) return;
    return this.http.get<string[]>(this.baseUrl + 'products/types').subscribe({
      next: response => this.types = response,
      error: err => console.error('Failed to load brands', err)
    })
  }
}
