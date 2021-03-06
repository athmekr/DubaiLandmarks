import { Component, OnInit } from '@angular/core';
import { LandmarkService } from '../../services/landmark.service';
import { Landmark } from '../../models/landmark.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
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
  //public loc: number[];
  //public lng: number;

  constructor( private landmarkService: LandmarkService, private authService: AuthService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.getLandmarkById();
    this.contenteditable = false;
    this.userIsLogged = this.authService.userLogged;
    //this.loc = this.landmark.location;

  }

  getLandmarkById(){
    const id = this.route.snapshot.params.id;
    this.landmarkService.getLandmarkById(id).subscribe((landmark: Landmark) => {
      this.landmark = landmark;
/*       console.log(this.landmark.title);
      console.log(this.landmark.location);
      console.log(this.loc); */

 /*      console.log(this.landmark.location.latitude);
      console.log(this.landmark.location[0]);
      console.log(this.landmark.location[1]); */
      //const geo = req.object.get(this.landmark.location);

    });
  }

  onSave(): void {
    const formData = new FormData();
    this.landmarkService.updateLandmark(this.landmark).subscribe((landmark: Landmark) => {
    this.landmark = landmark;
    this.contenteditable = false;
    console.log('Landmark Updated!')
  });
  }

  onCancel(): void {
    this.getLandmarkById();
    this.contenteditable = false;
  }

 /*  toggleContenteditable(): void {
    this.contenteditable = !this.contenteditable;
  } */

  onEdit(): void {
    this.contenteditable = true;
  }

  onImageUpload(event) {
    this.landmark.image_file = event.target.files[0];
    this.landmarkService.updateLandmark(this.landmark).subscribe((landmark: Landmark) => {
        this.landmark = landmark;
    },(error) => {
      console.log("image upload error");
    });
  }
/*     const file = event.target.files[0];
    const formData  = new FormData();
    formData.append('photo', file);
    this.landmarkService.updateLandmark(this.landmark, formData).subscribe((landmark: Landmark) => {
      this.landmark = landmark;
  },(error) => {
    console.log("image upload error");
  }); */

}
