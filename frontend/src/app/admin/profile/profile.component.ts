import { Component, Injector, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileService } from '../../service/profile.service';
import { environment } from '../../../environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ProfileService]
})
export class ProfileComponent extends AppComponentBase {
  currentUser = JSON.parse(localStorage.getItem('user'));

  apiUrl = environment.apiUrl;
  submittedCreateProfile = false;
  already_profile_pic = '';
  profile_pic : any;
  user_id = this.currentUser.user_id;
  CreateProfile: FormGroup;

  constructor(injector: Injector,private configService: ConfigService, private profileService: ProfileService) {
    super(injector);
   }

  async ngOnInit() {
    this.CreateProfile = this.formBuilder.group({
      id: ['', Validators.required],
      email:  ['', Validators.required],
      password: ['',Validators.minLength(6)],
      first_name:  ['', Validators.required],
      last_name:  ['', Validators.required],
      address: ['', Validators.required],
      postal_code: ['', Validators.required],
      about_me: ['', Validators.required],
      profile_pic:[null]
    });
    this.already_profile_pic = this.currentUser.profile.profile_pic;
    this.CreateProfile.get('id').setValue(this.currentUser.profile.user_id);
    this.CreateProfile.get('email').setValue(this.currentUser.email);
    this.CreateProfile.get('first_name').setValue(this.currentUser.profile.first_name);
    this.CreateProfile.get('last_name').setValue(this.currentUser.profile.last_name);
    this.CreateProfile.get('address').setValue(this.currentUser.profile.address);
    this.CreateProfile.get('postal_code').setValue(this.currentUser.profile.postal_code);
    this.CreateProfile.get('about_me').setValue(this.currentUser.profile.about_me);
    this.CreateProfile.get('profile_pic').setValue(this.currentUser.profile.profile_pic);

  }

  upload(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.CreateProfile.patchValue({
      profile_pic: file
    });
    this.CreateProfile.get('profile_pic').updateValueAndValidity()
 }
  
 get cu() { return this.CreateProfile.controls; }

  updateProfile() {
    // this.spinnerService.show();
    this.submittedCreateProfile = true;
    console.log(this.CreateProfile.controls);
    // stop here if form is invalid
    if (this.CreateProfile.invalid) {
      return;
    }
    var formData: any = new FormData();
    formData.append('id', this.CreateProfile.get('id').value);
    formData.append('user_id', this.currentUser.profile.user_id);
    formData.append('email', this.CreateProfile.get('email').value);
    formData.append('first_name', this.CreateProfile.get('first_name').value);
    formData.append('last_name', this.CreateProfile.get('last_name').value);
    formData.append('address', this.CreateProfile.get('address').value);
    formData.append('postal_code', this.CreateProfile.get('postal_code').value);
    formData.append('about_me', this.CreateProfile.get('about_me').value);
    formData.append('password', this.CreateProfile.get('password').value);
    if(this.CreateProfile.get('profile_pic').value){
      formData.append('profile_pic', this.CreateProfile.get('profile_pic').value);
    }
    else{
      formData.append('profile_pic', this.currentUser.profile.profile_pic);
    }
    
    this.configService.post('updateProfile' , formData)
    .subscribe(res => {
      this.spinnerService.hide();
      this.toastr.success('Your Profile Has Been Updated Successfullly!');
    }, error => {
      for (const [key, value] of Object.entries(error.error)) {
        this.toastr.warning(`Ops! ${value}`);
      }
      this.toastr.warning(`Ops! ${error.message}`);
      this.spinnerService.hide();
    });
  }

}
