import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { LoginPage} from '../login/login';
//import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the PwdrstPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pwdrst',
  templateUrl: 'pwdrst.html',
})
export class PwdrstPage {
  email:string;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
  public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PwdrstPage');
  }
  /*reset(){
    let alert = this.alertCtrl.create({
      buttons:['Ok']
    })
    this.fire.auth.resetPassword(this.email).then((res:any)=>{
      if(res.success){
        alert.setTitle('EmailSent');
        alert.setSubTitle('Follow instruction sent in mail');
      }
      else{
        alert.setTitle('Failed');
      }
      alert.present();
    })
  }
  goback(){
    this.navCtrl.setRoot(LoginPage);
  }
  */
}
