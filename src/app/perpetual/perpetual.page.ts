import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-perpetual',
  templateUrl: './perpetual.page.html',
  styleUrls: ['./perpetual.page.scss'],
})
export class PerpetualPage implements OnInit {

  balance:number=JSON.parse(localStorage.getItem('balance'));
  api_key:string="https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
  itemallinfo:any=[];
  word:string="";
  info:any=[];
  count:number;
  bol:number;
  openlist:number=0;
  call:boolean=false;

  constructor(private http: HttpClient, public toastController: ToastController,public navCtrl: NavController) { }

  ngOnInit() {

  }

 

  found(){
    if(this.word.length>0){
      this.http.get(this.api_key).subscribe(data=>{
      this.itemallinfo=data;
      this.itemallinfo = this.itemallinfo.filter((item) =>
      item.name.toLowerCase().includes(this.word.toLowerCase())
    );
    })
    
    }else{
      this.itemallinfo=[];
    }
  }

  getData(info){
    this.info=info;
    this.openlist=1;
    this.itemallinfo=[];
    this.word="";
    console.log(this.info)
  }

  getSearch(){
    this.call=true;
    (<HTMLInputElement>document.getElementById("getSearch")).focus();
    console.log("a")
 
  }

  customFormatter(value: number) {
    return `${value}x`
  }

  butonOne(){
    this.bol=this.balance/4;
    this.count=parseInt(this.bol.toString().slice(0,7));
  }

  butonTwo(){
    this.bol=this.balance/2;
    this.count=parseInt(this.bol.toString().slice(0,7));
  }

  butonThree(){
    this.bol=this.balance/4*3;
    this.count=parseInt(this.bol.toString().slice(0,7));
  }

  butonFour(){
    this.bol=this.balance;
    this.count=parseInt(this.bol.toString().slice(0,7));
  }
}
