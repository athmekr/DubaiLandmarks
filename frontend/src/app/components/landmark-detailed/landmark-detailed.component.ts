import { Component, OnInit } from '@angular/core';
import { LandmarkService } from '../../services/landmark.service';
import { Landmark } from '../../models/landmark.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-landmark-detailed',
  templateUrl: './landmark-detailed.component.html',
  styleUrls: ['./landmark-detailed.component.css']
})

export class LandmarkDetailedComponent implements OnInit {

  public landmark: Landmark;
  public editTable: boolean;
  public isLoading: boolean;
  userIsLogged: Observable<boolean>;

  constructor( private landmarkService: LandmarkService, private authService: AuthService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.getLandmarkById();
    this.editTable = false;
    this.userIsLogged = this.authService.userLogged;
    this.isLoading = false;
  }

  getLandmarkById(){
    const id = this.route.snapshot.params.id;
    this.landmarkService.getLandmarkById(id).subscribe((landmark: Landmark) => {
      this.landmark = landmark;
    });
  }

  onSave(): void {
    const formData = new FormData();
    this.landmarkService.updateLandmark(this.landmark).subscribe((landmark: Landmark) => {
      this.landmark = landmark;
      this.editTable = false;
      console.log('Landmark Updated!')
    });
  }

  onCancel(): void {
    this.getLandmarkById();
    this.editTable = false;
  }

  onEdit(): void {
    this.editTable = true;
  }

  onUpload(event) {
    this.landmark.image_file = event.target.files[0];
    this.isLoading = true;
    this.landmarkService.updateLandmark(this.landmark).subscribe((landmark: Landmark) => {
        this.landmark = landmark;
        this.isLoading = false;
    },(error) => {
      this.isLoading = false;
      alert("Image Upload Error \n\ Max file size 5mb")
      console.log("image upload error");
    });
  }
}
