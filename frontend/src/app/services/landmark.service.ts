import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject  } from 'rxjs';
import { Router } from '@angular/router';
import { Landmark } from "../models/landmark.model";
import { AuthService } from "./auth.service";
import { environment } from "../../environments/environment";
import Parse from 'parse';


@Injectable({
  providedIn: 'root'
})
export class LandmarkService {

  private landmark_url = environment.LANDMARKS_API_URL;
  public isToggled: BehaviorSubject<boolean>;

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.isToggled = new BehaviorSubject<boolean>(false);
  }

  // GET landmarks
  getLandmarks(): Observable<Landmark[]> {
    return this.httpClient.get<Landmark[]>(this.landmark_url/* , {headers: this.generateHeaderToken()} */);
  }

  // GET landmark by id
  getLandmarkById(landmarkId: string): Observable<Landmark> {
    const url = `${this.landmark_url}/${landmarkId}`;
    return this.httpClient.get<Landmark>(url/* , {headers: this.generateHeaderToken()} */);
  }

  // Update landmark
  updateLandmark(landmark: Landmark): Observable<Landmark> {
    const formData = new FormData();

    formData.append('title', landmark.title);
    formData.append('shortInfo', landmark.shortInfo);
    formData.append('description', landmark.description);
    formData.append('url', landmark.url);
    //formData.append('photo', landmark.image_file);

    const url = `${this.landmark_url}/${landmark.objectId}`;
    return this.httpClient.put<Landmark>(url, formData, {headers: this.generateHeaderToken()});
  }

  generateHeaderToken(): HttpHeaders {
    return new HttpHeaders({
      'X-Parse-Session-Token': this.authService.getToken,
    });
  }

}
