import { Component,ViewChild } from '@angular/core';
import { Platform,Nav,AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { WelcomePage } from '../pages/welcome/welcome';
import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile';
import { SettingPage } from '../pages/setting/setting';
import { TemplatePage} from '../pages/template/template';
// import * as firebase from 'firebase';


@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = TemplatePage;
  @ViewChild(Nav) nav:Nav;
  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public push: Push, public alertCtrl: AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.pushsetup();
    });
   
  }
  
  go_to_home(Page){
    this.nav.setRoot(TabsPage);
  }
  go_to_profile(Page){
    this.nav.push(ProfilePage);
    
  }
  go_to_setting(Page){
    this.nav.push(SettingPage);
  }
  go_to_logout(Page){
    this.nav.setRoot(WelcomePage);
  }

  pushsetup() {
    const options: PushOptions = {
     android: {
         senderID: '960429019224'
     },
     ios: {
         alert: 'true',
         badge: true,
         sound: 'false'
     },
     windows: {}
  };
 
  const pushObject: PushObject = this.push.init(options);
 
  pushObject.on('notification').subscribe((notification: any) => {
    if (notification.additionalData.foreground) {
      let youralert = this.alertCtrl.create({
        title: 'New Push notification',
        message: notification.message
      });
      youralert.present();
    }
  });
 
  pushObject.on('registration').subscribe((registration: any) => {
     //do whatever you want with the registration ID
  });
 
  pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
  }
 

}
