import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Geolocation} from '@ionic-native/geolocation';
import { SocialSharing } from '@ionic-native/social-sharing';
import { EmailComposer } from '@ionic-native/email-composer';
import { GoogleMaps, GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker} from '@ionic-native/google-maps';
import { SMS } from '@ionic-native/sms';
import { PwdrstPage} from '../pages/pwdrst/pwdrst';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile';
import { WelcomePage } from '../pages/welcome/welcome';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { SettingPage } from '../pages/setting/setting';
import { TemplatePage} from '../pages/template/template';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage';
// import { AngularFireModule } from 'angularfire2';
// import { AngularFireAuthModule } from 'angularfire2/auth';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
//import { Device } from '@ionic-native/device';
import { AuthService } from '../providers/auth-service';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule} from '@angular/http';
/*const config = {
  apiKey: "AIzaSyB-apWezhi0fmYKd1k4PNBThqY9H2ugLWg",
  authDomain: "my-app-afbab.firebaseapp.com",
  databaseURL: "https://my-app-afbab.firebaseio.com",
  projectId: "my-app-afbab",
  storageBucket: "my-app-afbab.appspot.com",
  messagingSenderId: "1098540711741"
};*/


@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage,
    ProfilePage,
    WelcomePage,
    SignupPage,
    LoginPage,
    SettingPage,
    TemplatePage,
    PwdrstPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule
    // AngularFireModule.initializeApp(config),
    // AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage,
    ProfilePage,
    WelcomePage,
    SignupPage,
    LoginPage,
    SettingPage,
    TemplatePage,
    PwdrstPage
  ],
  providers: [SocialSharing, EmailComposer,SMS,AuthService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    GoogleMaps,
    Push,
   
    
  ]
})
export class AppModule {}
