import { Component, OnInit } from '@angular/core';
import { LandmarkService } from '../../services/landmark.service';
import { Landmark } from '../../models/landmark.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public landmarks: Landmark[];
  //private dialog: MatDialog;

  constructor( private landmarkService: LandmarkService, public dialog: MatDialog ) { }

  ngOnInit(): void {
    this.getLandmarks();
  }

  getLandmarks(){
    this.landmarkService.getLandmarks().subscribe(landmarks => {
      this.landmarks = landmarks;
  });
  }

  public onDialog (photo: string): void {
    const dialogConfig = new MatDialogConfig();

    //dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { photo };
    //dialogConfig.height = "1000px";
    //dialogConfig.width = "1000px";

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {});

  }
}
