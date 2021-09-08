import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Photo } from '../models/Photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  API = 'http://localhost:5500/api/photos';

  constructor(private http: HttpClient) { }

  getPhotos(){
    return this.http.get<Photo[]>(`${this.API}`)
  }

  getPhoto(id: string) {
    return this.http.get(`${this.API}/${id}`)
  }

  createPhoto(photo: Photo) {
    return this.http.post(`${this.API}`, photo)
  }

  deletePhoto(id: string) {
    return this.http.delete(`${this.API}/${id}`)
  }

  updatePhoto(id: string, photo: Photo) {
    return this.http.put(`${this.API}/${id}`, photo)
  }

  
}
