import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Dataservice {
  dataUrl: string =
    'https://music-database-d7799-default-rtdb.europe-west1.firebasedatabase.app/';

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
