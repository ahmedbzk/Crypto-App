import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  language=localStorage.getItem('language');
  public allcoininfo:any=[];
  public api_key:string="https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
  public btn:any;
  public divcolor:any;
  i:number=0;
  balance:number=JSON.parse(localStorage.getItem('balance'));
  oldbalance:number=JSON.parse(localStorage.getItem('newbalance'));
  wallet=JSON.parse(localStorage.getItem('wallet'));
  xarray = [];
  totalValue:any = 0;
  newbalance:number=0;
  constructor(private activatedRoute: ActivatedRoute,private http: HttpClient, public toastController: ToastController) { }

  ngOnInit() {
  
    if(this.oldbalance>(this.totalValue+this.balance)){
      this.newbalance=this.oldbalance-(this.totalValue+this.balance);
    }
    else if(this.oldbalance==(this.totalValue+this.balance)){
      this.newbalance=0;
    }
    else if(this.oldbalance<(this.totalValue+this.balance)){
      this.newbalance=(this.totalValue+this.balance)-this.oldbalance;
    }
    
    this.http.get(this.api_key).subscribe(data=>{
      this.allcoininfo=data;
      this.update()
      this.xarray.forEach((element) => {
        this.totalValue+= element.amount*element.current_price;
        if(this.oldbalance>(this.totalValue+this.balance)){
          this.newbalance=this.oldbalance-(this.totalValue+this.balance);
        }
        else if(this.oldbalance==(this.totalValue+this.balance)){
          this.newbalance=0;
        }
        else if(this.oldbalance<(this.totalValue+this.balance)){
          this.newbalance=(this.totalValue+this.balance)-this.oldbalance;
        }
        });
    });
    this.changeColor('darkblue');
  }


  update(){
    this.wallet.forEach((element) => {
      let live = this.allcoininfo.find((x) => x.id == element.id);
      live.amount = element.amount
      this.xarray.push(live);
      });
  }


  changeColor(color) {
    document.body.style.background = color;
  }

  btncolor(){
    this.i=this.i+1;
    if(this.i==1){
      this.changeColor('darkred');
      this.i=this.i+1;
    }
    else if(this.i==2){
      this.changeColor('darkslategray');
      this.i=this.i+1;
    }
    else if(this.i==3){
      this.changeColor('darkgreen');
      this.i=this.i+1;
    }
    else{
      this.i=this.i-4;
    }
  }

 


  doRefresh(event) {
    window.location.href="/folder";

    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

 

  refresh(){
    location.reload();
  }

}
