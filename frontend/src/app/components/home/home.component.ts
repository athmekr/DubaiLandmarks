import { Component, OnInit } from '@angular/core';

import { LandmarkService } from '../../services/landmark.service';
import { Landmark } from '../../models/landmark.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public landmarks: Landmark[];

  constructor( private landmarkService: LandmarkService ) { }

  ngOnInit(): void {
    this.getLandmarks();
  }

  getLandmarks(){
    this.landmarkService.getLandmarks().subscribe(landmarks => {
      this.landmarks = landmarks;
  });
  }
}
