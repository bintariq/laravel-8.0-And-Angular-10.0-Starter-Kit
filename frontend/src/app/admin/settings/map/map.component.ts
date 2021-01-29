import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MapService } from '../../../service/map.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
declare function initialize(arg1 :any, arg2 :any):any;
declare function returnCoordss():any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  zone_id  : '';
  coords : any;
  zone_detail: any;

  constructor(private router: Router, private actRoute: ActivatedRoute, private mapService: MapService, private toastr: ToastrService) {
    this.zone_id = this.actRoute.snapshot.params.id;
  }

  async ngOnInit() {
    this.zone_id = this.actRoute.snapshot.params.id;
    this.mapService.getCords(this.zone_id).subscribe(
      (data) => {
        this.zone_detail = data;
        initialize(data.coordinates,data);
      }
    );   
  }

  updatedCoords(){
    this.coords = returnCoordss();
    console.log(this.coords);
    // if(this.coords == 'no-update'){
    //   this.toastr.success('Your Zone Coordinates Updated SuccessFully');
    //   // this.router.navigate(['/admin/zone']);
    // }
    // else{
      this.mapService.updateCords(this.coords,this.zone_id).subscribe(
        (data) => {
          this.toastr.success('Your Zone Coordinates Updated SuccessFully');
          this.router.navigate(['/admin/zone']);
        }
      ); 
    //}  
  }


}
