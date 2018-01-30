import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,
  AlertController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';
import {AuthService} from '../../providers/auth-service';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public type = 'password';
 public showPass = false;
  // resposeData : any;
  userData = {"username":"", "password":""};
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public authService: AuthService, 
     private toastCtrl:ToastController,
    private alertCtrl:AlertController) {
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  login1() {
    // if(this.userData.username && this.userData.password){
    //   this.authService.postData(this.userData, "login").then((result) =>{
    //   this.resposeData = result;
    //   console.log(this.resposeData);
    //   if(this.resposeData.userData){
    //    this.alert('Success! You\'re logged in');
      this.navCtrl.push(TabsPage);
    }
  //   else{
  //     this.presentToast("Please give valid username/email and password");
  //   }
      
  
  
  //     }, (err) => {
  //       //Connection failed message
  //     });
  //    }
  //    else{
  //     this.presentToast("Give username and password");
  //    }
    
  // }
  login2(){
    this.navCtrl.push(SignupPage);
  }


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
  showPassword() {
    this.showPass = !this.showPass;
 
    if(this.showPass){
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }
}
