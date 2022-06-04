import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './sell.page.html',
  styleUrls: ['./sell.page.scss'],
})
export class SellPage implements OnInit {
  id:string;
  api_key:string="https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
  coinallinfo:any;
  justcoininfo:any;
  index:number;
  balance:number=JSON.parse(localStorage.getItem('balance'))||0;
  count:number;
  carp:number;
  live:any;
  money:number=0;
  public wallet:any=JSON.parse(localStorage.getItem("wallet")) || [];
  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, public toastController: ToastController) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getData();
    localStorage.setItem('balance',JSON.stringify(this.balance));
    console.log(this.wallet)
     
  }

  

  butonOne(){
    var checkWallet = this.wallet.find((a) => a.id === this.justcoininfo.id);
    if(checkWallet){
      this.money=checkWallet.amount;
      this.count=checkWallet.amount/4;
      this.carp=this.count*this.justcoininfo.current_price;
      this.carp=parseInt(this.carp.toString().slice(0,7));

    }else{
      this.uyari("You don't have this coin.","danger")
    }
   
  }

  butonTwo(){
    var checkWallet = this.wallet.find((a) => a.id === this.justcoininfo.id);
    if(checkWallet){
      this.money=checkWallet.amount;
      this.count=checkWallet.amount/2;
      this.carp=this.count*this.justcoininfo.current_price;
      this.carp=parseInt(this.carp.toString().slice(0,7));

    }else{
      this.uyari("You don't have this coin.","danger")
    }
  }

  butonThree(){
    var checkWallet = this.wallet.find((a) => a.id === this.justcoininfo.id);
    if(checkWallet){    
      this.money=checkWallet.amount;
      this.count=checkWallet.amount/4*3;
      this.carp=this.count*this.justcoininfo.current_price;
      this.carp=parseInt(this.carp.toString().slice(0,7));

    }else{
      this.uyari("You don't have this coin.","danger")
    }
  }

  butonFour(){
    var checkWallet = this.wallet.find((a) => a.id === this.justcoininfo.id);
    if(checkWallet){
      this.money=checkWallet.amount;
      this.count=checkWallet.amount;
      this.carp=this.count*this.justcoininfo.current_price;
      this.carp=parseInt(this.carp.toString().slice(0,7));

    }else{
      this.uyari("You don't have this coin.","danger")
    }
  }



  sell(){
    if(!this.count){
      this.uyari("You must enter the count",'danger')

    }else{
    var checkWallet = this.wallet.find((a) => a.id === this.justcoininfo.id);
    this.wallet.find((a,i) => {if(a.id === this.justcoininfo.id){this.index = i}})
    if(!checkWallet){
        this.uyari("You can not sell. Because you are not have this coin.",'danger')
    }else{
      
    
    if(checkWallet.amount<this.count){
        this.uyari("You can not sell. Because you are not have count this coin.",'danger')
    }else{
        this.balance=this.balance+(this.justcoininfo.current_price*this.count);
        localStorage.setItem('balance',JSON.stringify(this.balance));
        checkWallet.amount -= this.count;
        this.uyari("You sold.",'success')
    if(checkWallet.amount==0){
        this.wallet.splice(this.index,1)
    }
    localStorage.setItem("wallet",JSON.stringify(this.wallet))
    }
   
    console.log(this.balance)
    console.log(this.wallet);

    }
    }
  }


  getData(){
    this.http.get(this.api_key).subscribe(data=>{
      this.coinallinfo=data;
      this.justcoininfo =this.coinallinfo.filter(x => x.id == this.id)
      this.justcoininfo=this.justcoininfo[0];
    })
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
