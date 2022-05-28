import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';

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
  balance:number=JSON.parse(localStorage.getItem('balance'))||0;
  count:number;
  bol:number;
  public wallet:any=JSON.parse(localStorage.getItem("wallet")) || [];
  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, public toastController: ToastController,private navCtrl: NavController) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getData();
    localStorage.setItem('balance',JSON.stringify(this.balance));
   
    
   
  }

  butonOne(){
    this.bol=this.balance/4;
    this.count=this.bol/this.justcoininfo.current_price;
  }

  butonTwo(){
    this.bol=this.balance/2;
    this.count=this.bol/this.justcoininfo.current_price;
  }

  butonThree(){
    this.bol=this.balance/4*3;
    this.count=this.bol/this.justcoininfo.current_price;
  }

  butonFour(){
    this.bol=this.balance;
    this.count=this.bol/this.justcoininfo.current_price;
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
    this.navCtrl.navigateRoot(['sell',this.justcoininfo&&this.justcoininfo.id]).then(() => {
    window.location.reload();
  });
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
