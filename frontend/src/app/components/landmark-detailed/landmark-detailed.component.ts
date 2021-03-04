import { Component, OnInit } from '@angular/core';

import { LandmarkService } from '../../services/landmark.service';
import { Landmark } from '../../models/landmark.model';
import { ActivatedRoute } from '@angular/router';
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-landmark-detailed',
  templateUrl: './landmark-detailed.component.html',
  styleUrls: ['./landmark-detailed.component.css']
})
export class LandmarkDetailedComponent implements OnInit {

  public landmark: Landmark;

  constructor( private landmarkService: LandmarkService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.getLandmarkById();
  }

  getLandmarkById(){
    const id = this.route.snapshot.params.id;
    this.landmarkService.getLandmarkById(id).subscribe(landmark => {
      this.landmark = landmark;
    });
  }

}
