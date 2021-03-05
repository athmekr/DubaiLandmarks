import { Component, OnInit } from '@angular/core';
import { LandmarkService } from '../../services/landmark.service';
import { Landmark } from '../../models/landmark.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
//import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-landmark-detailed',
  templateUrl: './landmark-detailed.component.html',
  styleUrls: ['./landmark-detailed.component.css']
})
export class LandmarkDetailedComponent implements OnInit {

  public landmark: Landmark;
  public contenteditable: boolean;
  userIsLogged: Observable<boolean>;

  constructor( private landmarkService: LandmarkService, private authService: AuthService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.getLandmarkById();
    this.contenteditable = false;
    this.userIsLogged = this.authService.userLogged;
  }

  getLandmarkById(){
    const id = this.route.snapshot.params.id;
    this.landmarkService.getLandmarkById(id).subscribe((landmark: Landmark) => {
      this.landmark = landmark;
      console.log(this.landmark.title);
    });
  }

  onSaveLandmark(): void {
/*     console.log(this.landmark);
    console.log('1'); */
    this.landmarkService.updateLandmark(this.landmark).subscribe((landmark: Landmark) => {
/*     console.log(this.landmarkService.updateLandmark(this.landmark));
    console.log('2'); */
    this.landmark = landmark;
/*     console.log(this.landmark);
    console.log('3'); */
    this.contenteditable = false;
/*     console.log(this.landmark.title);
    console.log('4'); */
    console.log('Landmark Updated!')
    //this.getLandmarkById();
  });
  }

  onCancel(): void {
    this.getLandmarkById();
    this.contenteditable = false;
  }

  toggleContenteditable(): void {
    this.contenteditable = !this.contenteditable;
  }

  onEdit(): void {
    this.contenteditable = true;
  }

}
