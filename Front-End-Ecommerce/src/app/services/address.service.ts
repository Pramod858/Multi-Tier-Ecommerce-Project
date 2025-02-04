import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../models/address.model';
import { ApiResponse } from '../models/api.response';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private baseUrl = "http://localhost:8080/api/addresses";

  constructor(private http: HttpClient) { }

  private getAuthHeaders(token: string) {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  addAddress(address: Address, token: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.baseUrl}/add-address`, address, this.getAuthHeaders(token));
  }

  updateAddress(addressId: number, address: Address, token: string): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.baseUrl}/update-address/${addressId}`, address, this.getAuthHeaders(token));
  }

  deleteAddress(addressId: number, token: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.baseUrl}/delete-address/${addressId}`, this.getAuthHeaders(token));
  }

  getAllAddressesForUser(token: string): Observable<ApiResponse<Address[]>> {
    return this.http.get<ApiResponse<Address[]>>(`${this.baseUrl}/my-addresses`, this.getAuthHeaders(token));
  }

  getAddressById(addressId: number): Observable<ApiResponse<Address>> {
    return this.http.get<ApiResponse<Address>>(`${this.baseUrl}/${addressId}`);
  }
}
