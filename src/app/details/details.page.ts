import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  id:string;
  api_key:string="https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
  coinallinfo:any;
  justcoininfo:any;
  index:number;
  balance:number=JSON.parse(localStorage.getItem('balance'))||100000;
  count:number;
  public wallet:any=JSON.parse(localStorage.getItem("wallet")) || [];
  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, public toastController: ToastController) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getData();
    localStorage.setItem('balance',JSON.stringify(this.balance));

   
  }

  buy(){
    if(!this.count){
      this.uyari("You must enter the count",'danger')
    }
    else{
      if(this.balance<this.justcoininfo.current_price*this.count){
        this.uyari("You can not buy. Because your balance not enough.",'danger')
      }else{
      this.balance=this.balance-(this.justcoininfo.current_price*this.count);
      localStorage.setItem('balance',JSON.stringify(this.balance));
      var checkWallet = this.wallet.find((a) => a.id === this.justcoininfo.id);
      if(checkWallet){
        checkWallet.amount += this.count;
      }else{
      this.wallet=[
        ...this.wallet,
        {
          id: this.justcoininfo.id,
          amount: this.count,
          price: this.justcoininfo.current_price
        },
      ]}
      localStorage.setItem("wallet",JSON.stringify(this.wallet))
      console.log(this.wallet);
      this.uyari(`You bought ${this.count} count ${this.justcoininfo.name}`,'success')

      }
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
      console.log(this.justcoininfo)
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
