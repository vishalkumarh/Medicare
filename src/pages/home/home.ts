import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, Slides, Content,Platform} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  LatLng,
  Marker
 } from '@ionic-native/google-maps';
declare var google: any;
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides ;
  @ViewChild('MultiItemsScrollingTabs') ItemsTitles : Content;
  @ViewChild(Slides) slides: Slides;
  @ViewChild('map') mapRef: ElementRef;
  map: any;
  public posicao : LatLng;
    goToSlide() {
      this.slides.slideTo(2, 500);
    }
  SwipedTabsIndicator :any= null;
  tabTitleWidthArray :any= [];
  tabElementWidth_px :number= 50;
  screenWidth_px :number= 0;
  isRight :boolean= true;
  isLeft:boolean= true;
  tabs:any=[];
  
  constructor(public navCtrl: NavController,	private _maps : GoogleMaps,platform: Platform,public geolocation: Geolocation) {
    this.tabs=["Page1","Page2","Page3","Page4","Page5"];
    console.log('Width: ' + platform.width());
    this.screenWidth_px=platform.width();

  }
  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);

}
  ionViewDidEnter() {
    this.SwipedTabsIndicator = document.getElementById("indicator");
    for (let i in this.tabs)
      this.tabTitleWidthArray.push(document.getElementById("tabTitle"+i).offsetWidth);
      this.showMap();
    this.selectTab(0);
  }
  scrollIndicatiorTab()
  {
    this.ItemsTitles.scrollTo(this.calculateDistanceToSpnd(this.SwipedTabsSlider.getActiveIndex())-this.screenWidth_px/2,0);
  }
  selectTab(index)
  {
    this.SwipedTabsIndicator.style.width = this.tabTitleWidthArray[index]+"px";
    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d('+(this.calculateDistanceToSpnd(index))+'px,0,0)';
    this.SwipedTabsSlider.slideTo(index);
  }
  calculateDistanceToSpnd(index)
  {
    var result=0;
    for (var _i = 0; _i < index; _i++) {
      result=result+this.tabTitleWidthArray[_i];
    }
    return result;
  }
  updateIndicatorPosition() {
    var index=this.SwipedTabsSlider.getActiveIndex();
    if( this.SwipedTabsSlider.length()==index)
      index=index-1;

    this.SwipedTabsIndicator.style.width = this.tabTitleWidthArray[index]+"px";
    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d('+(this.calculateDistanceToSpnd(index))+'px,0,0)';

  }
  updateIndicatorPositionOnTouchEnd()
  {
    setTimeout( () => { this.updateIndicatorPosition(); }, 200);
  }
  animateIndicator($event)
  {

    this.isLeft=false;
    this.isRight=false;
    var currentSliderCenterProgress =(1/(this.SwipedTabsSlider.length()-1) )*this.SwipedTabsSlider.getActiveIndex();
    if($event.progress < currentSliderCenterProgress)
    {
      this.isLeft=true;
      this.isRight=false;

    } if($event.progress > currentSliderCenterProgress)
    {
      this.isLeft=false;
      this.isRight=true;
    }

    if(this.SwipedTabsSlider.isEnd())
      this.isRight=false;

    if( this.SwipedTabsSlider.isBeginning())
      this.isLeft=false;

    if(this.isRight)
      this.SwipedTabsIndicator.style.webkitTransform =
      'translate3d('+( this.calculateDistanceToSpnd(this.SwipedTabsSlider.getActiveIndex())
        +($event.progress - currentSliderCenterProgress) *(this.SwipedTabsSlider.length()-1)*this.tabTitleWidthArray[this.SwipedTabsSlider.getActiveIndex()+1])
      +'px,0,0)';

    if(this.isLeft)
      this.SwipedTabsIndicator.style.webkitTransform =
      'translate3d('+( this.calculateDistanceToSpnd(this.SwipedTabsSlider.getActiveIndex())
        +($event.progress - currentSliderCenterProgress) *(this.SwipedTabsSlider.length()-1)*this.tabTitleWidthArray[this.SwipedTabsSlider.getActiveIndex()-1])
      +'px,0,0)';

    if(!this.isRight && !this.isLeft)
      this.SwipedTabsIndicator.style.width = this.tabTitleWidthArray[this.SwipedTabsSlider.getActiveIndex()]+"px";

  }
  slideData = [{ image: "../../assets/imgs/img1.jpg" },
  { image: "../../assets/imgs/img2.jpg" },
  { image: "../../assets/imgs/img3.jpg" }]

  showMap() {
    
        let location = new google.maps.LatLng(51.507351, -0.127758);
    
        const options = {
          center: location,
          zoom: 20,
        }
    
        this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    
        this.geolocation.getCurrentPosition().then((resp) => {
          location = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);  
          this.map.setCenter(location);    
          var marker = new google.maps.Marker({
            position: location,
            map: this.map,
            title: ''
          });
         }).catch((error) => {
           console.log('Error getting location', error);
         });
    
      }
      addMarker(latLng : LatLng, content : string) : void {
        
            let markerOptions : MarkerOptions = {
              position : latLng,
              title : content
            };
        
            this.map.addMarker(markerOptions)
              .then((marker : Marker) => {
                marker.showInfoWindow();
              })
              .catch(err => {
                console.log(err);
              });
          }
}
