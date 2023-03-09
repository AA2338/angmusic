import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import apiUrl from '../assets/apiUrl.json';

@Injectable({
  providedIn: 'root',
})
export class Dataservice {
  dataUrl: string = apiUrl.url;

  constructor(private http: HttpClient) {}

  getAllData() {
    return this.http.get(`${this.dataUrl}/.json`);
  }

  getArtistData(id: number) {
    return this.http.get(`${this.dataUrl}/music/${id}/.json`);
  }

  getGenreData() {
    return this.http.get(`${this.dataUrl}/genres/.json`);
  }
}
