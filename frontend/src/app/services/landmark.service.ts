import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject  } from 'rxjs';
import { Router } from '@angular/router';
import { Landmark } from "../models/landmark.model";
import { AuthService } from "./auth.service";
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class LandmarkService {

  private landmark_url = environment.LANDMARKS_API_URL;

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  // GET landmarks
  getLandmarks(): Observable<Landmark[]> {
    return this.httpClient.get<Landmark[]>(this.landmark_url);
  }

  // GET landmark by id
  getLandmarkById(landmarkId: string): Observable<Landmark> {
    const url = `${this.landmark_url}/${landmarkId}`;
    return this.httpClient.get<Landmark>(url);
  }

  // Update landmark
  updateLandmark(landmark: Landmark): Observable<Landmark> {
    const formData = new FormData();
    formData.append('title', landmark.title);
    formData.append('description', landmark.description);
    formData.append('url', landmark.url);
    formData.append('photo', landmark.image_file);

    const url = `${this.landmark_url}/${landmark.objectId}`;
    return this.httpClient.put<Landmark>(url, formData, {headers: this.generateHeaderToken()});
  }

  generateHeaderToken(): HttpHeaders {
    return new HttpHeaders({
      'X-Parse-Session-Token': this.authService.getToken,
    });
  }
}
