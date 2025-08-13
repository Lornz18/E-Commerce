// src/app/services/http.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl = 'http://localhost:3000/dev'; // Replace with your base API URL

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse): never {
    console.error('HTTP Error:', error);
    throw error;
  }

  async get<T>(endpoint: string, body?: any): Promise<T> {
    try {
      return await firstValueFrom(
        this.http.request<T>('GET', `${this.baseUrl}/${endpoint}`, { body })
      );
    } catch (error) {
      this.handleError(error as HttpErrorResponse);
    }
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    try {
      return await firstValueFrom(this.http.post<T>(`${this.baseUrl}/${endpoint}`, data));
    } catch (error) {
      throw error
      /* return this.handleError(error as HttpErrorResponse); */
    }
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    try {
      return await firstValueFrom(this.http.put<T>(`${this.baseUrl}/${endpoint}`, data));
    } catch (error) {
      this.handleError(error as HttpErrorResponse);
    }
  }

  async delete<T>(endpoint: string): Promise<T> {
    try {
      return await firstValueFrom(this.http.delete<T>(`${this.baseUrl}/${endpoint}`));
    } catch (error) {
      this.handleError(error as HttpErrorResponse);
    }
  }
}
