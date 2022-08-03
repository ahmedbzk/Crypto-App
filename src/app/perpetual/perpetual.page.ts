import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
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
  count:number=0;
  bol:number;
  openlist:number=0;
  call:boolean=false;
  value:any;
  newbalance:number;
  newcount:number;
  n:any;
  perpetualwallet:any=[];
  liqprice:number=0;

  constructor(private http: HttpClient, public toastController: ToastController,public navCtrl: NavController) { }

  ngOnInit() {
    this.perpetualwallet=JSON.parse(localStorage.getItem("perpetualwallet")) || [];
    if(!(localStorage.getItem("perpetualwallet") === null)){
      this.openlist=1;
      this.call=true;
    }
    
  }

  long(){
    const input = document.getElementById('value') as HTMLInputElement | null;
    this.value = input?.value;
    if(this.value==0){
      this.value=2;
    }

    if(this.count==0){
      this.uyari("You have to choose 'X' and enter the 'Balance'",'danger');
    }else{
      console.log(this.info.current_price-(this.info.current_price/this.value))
      this.liqprice=this.info.current_price-(this.info.current_price/this.value)
      this.newbalance=this.count*this.value;
      this.newcount=this.newbalance/this.info.current_price
      this.n=this.newcount.toFixed(2);
      this.perpetualwallet=[
        ...this.perpetualwallet,
        {
          id: this.info.id,
          symbol:this.info.symbol,
          img: this.info.image,
          x: this.value,
          newbalance: this.newbalance,
          amount: this.n,
          price: this.info.current_price,
          liq:this.liqprice
        },
      ];
      localStorage.setItem("perpetualwallet",JSON.stringify(this.perpetualwallet))
    }





   
    
    
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
    this.openlist=2;
    this.itemallinfo=[];
    this.word="";
    
  }

  getSearch(){
    this.call=true;
 
  }

  customFormatter(value) {
    
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
  async uyari(mesaj,renk) {
    const toast = await this.toastController.create({
      message: mesaj,
      color:renk,
      duration: 1000,
    });
    toast.present();
  }
}
