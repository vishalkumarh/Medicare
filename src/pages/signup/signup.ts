import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { LoginPage } from '../login/login';
import { AuthService } from '../../providers/auth-service';
//import { SMS } from '@ionic-native/sms';


/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage implements OnInit {
  isEdited: any;

  resposeData: any;
  userData = { "email": "", "password": "", "username": "", "gender": "", "DOB": "", "mobileno": "" };

  /**
    * @name form
    * @type {FormGroup}
    * @public
    * @description     Define FormGroup property for managing form validation / data retrieval
    */
  public user: FormGroup;

  public username: any;
  public email: any;
  public password: any;
  public recordID: any = null;
  private baseURI: string = "http://localhost/manage-data/";
  public gender: any;
  public DOB: any;
  public mobileno: any;



  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public authService: AuthService,
    private toastCtrl: ToastController) {
  }
  equalto(field_name): ValidatorFn {
    return (control: AbstractControl): {
      [
      key: string]: any
    } => {

      let input = control.value;

      let isValid = control.root.value[field_name] == input
      if (!isValid)
        return { 'equalTo': { isValid } }
      else
        return null;
    };
  }
  ngOnInit() {

    this.user = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      re_password: new FormControl('', [Validators.required, this.equalto('password')]),
      mobileno: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      gender: new FormControl('', [Validators.required]),
    });

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  ionViewWillEnter(): void {
    this.resetFields();

    if (this.navParams.get("record")) {

      this.selectEntry(this.navParams.get("record"));

    }
    else {

    }
  }
  /**
* Assign the navigation retrieved data to properties
* used as models on the page's HTML form
*
* @public
* @method selectEntry
* @param item 		{any} 			Navigation data
* @return {None}
*/
  selectEntry(item: any): void {
    this.username = item.username;
    this.email = item.email;
    this.password = item.password;
    this.recordID = item.id;
    this.gender = item.gender;
    this.DOB = item.DOB;
    this.mobileno = item.mobileno;
  }

  createEntry(username: string, email: string, password: string, gender: string, DOB: string, mobileno: any): void {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "create", "username": username, "email": email, "password": password, "gender": gender, "DOB": DOB, "mobileno": mobileno },
      url: any = this.baseURI + "manage-data.php";

    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data: any) => {
        // If the request was successful notify the user

        this.sendNotification(`Congratulations the technology: ${name} was successfully added`);
      },
      (error: any) => {
        this.sendNotification('Something went wrong!');
      });
  }
  updateEntry(username: string, email: string, password: string, gender: string, DOB: string, mobileno: any): void {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "update", "username": username, "recordID": this.recordID, "email": email, "password": password, "gender": gender, "DOB": DOB, "mobileno": mobileno },
      url: any = this.baseURI + "manage-data.php";

    this.http
      .post(url, JSON.stringify(options), headers)
      .subscribe(data => {
        // If the request was successful notify the user

        this.sendNotification(`Congratulations the technology: ${name} was successfully updated`);
      },
      (error: any) => {
        this.sendNotification('Something went wrong!');
      });
  }
  signup1() {
    
  }
  resetFields(): void {
    this.username = "";
    this.email = "";
    this.password = "";
  }
  sendNotification(message: string): void {
    let notification = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    notification.present();
  }

  signup() {


    /* var options={
       replaceLineBreaks: false, // true to replace \n by a new line, false by default
       android: {
            intent: 'INTENT'  // Opens Default sms app
           //intent: '' // Sends sms without opening default sms app
         }
 }
 this.smsVar.send('+919900410718', 'Hello world!',options)
   .then(()=>{
     alert("success");
   },()=>{
   alert("failed");
   });
 */

    if (this.userData.username && this.userData.email && this.userData.password && this.userData.gender && this.userData.DOB && this.userData.mobileno) {
      //Api connections
      this.authService.postData(this.userData, "signup").then((result) => {
        this.resposeData = result;
        if (this.resposeData.userData) {
          console.log(this.resposeData);
          localStorage.setItem('userData', JSON.stringify(this.resposeData))
          this.navCtrl.push(LoginPage);
        }
        else {
          this.presentToast("Please give valid email and password");
        }

      }, (err) => {
        //Connection failed message
      });
    }
    else {
      console.log("Give valid information.");
    }





    let username: any = this.user.controls["username"].value,
      email: any = this.user.controls["email"].value;
    let password: any = this.user.controls["password"].value;
    let gender: any = this.user.controls["gender"].value;
    let DOB: any = this.user.controls["DOB"].value;
    let mobileno: any = this.user.controls["mobileno"].value;

    if (this.isEdited) {
      this.updateEntry(username, email, password, gender, DOB, mobileno);
    }
    else {
      this.createEntry(username, email, password, gender, DOB, mobileno);
    }
  }
  clearField() {
    this.user.reset();
  }
  login() {
    this.navCtrl.push(LoginPage);
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
