import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './sell.page.html',
  styleUrls: ['./sell.page.scss'],
})
export class SellPage implements OnInit {
  language=localStorage.getItem('language');
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
  public wlist=JSON.parse(localStorage.getItem("wlist")) || [];
  color:string="dark";
  icon:boolean=true;
  public i:number;
  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, public toastController: ToastController,private router:Router) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getData();
    localStorage.setItem('balance',JSON.stringify(this.balance));

    
  }

  buy(){
    this.router.navigate(['details',this.justcoininfo&&this.justcoininfo.id])
      .then(() => {
    });
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
    localStorage.setItem("historysell",JSON.stringify(this.wallet))
    }
   
    console.log(this.balance)
    console.log(this.wallet);

    }
    }
  }
  selltr(){
    if(!this.count){
      this.uyari("Miktar girmelisiniz...",'danger')

    }else{
    var checkWallet = this.wallet.find((a) => a.id === this.justcoininfo.id);
    this.wallet.find((a,i) => {if(a.id === this.justcoininfo.id){this.index = i}})
    if(!checkWallet){
        this.uyari("Satamazsınız. Çünkü bu kripto paraya sahip değilsiniz...",'danger')
    }else{
      
    
    if(checkWallet.amount<this.count){
        this.uyari("Satamazsınız. Çünkü bu kripto paraya sahip değilsiniz...",'danger')
    }else{
        this.balance=this.balance+(this.justcoininfo.current_price*this.count);
        localStorage.setItem('balance',JSON.stringify(this.balance));
        checkWallet.amount -= this.count;
        this.uyari("Başarıyla sattınız...",'success')
    if(checkWallet.amount==0){
        this.wallet.splice(this.index,1)
    }
    localStorage.setItem("wallet",JSON.stringify(this.wallet))
    localStorage.setItem("historysell",JSON.stringify(this.wallet))
    }
   
    console.log(this.balance)
    console.log(this.wallet);

    }
    }
  }

  walleta(){
    this.router.navigate(['wallet'])
      .then(() => {
    });
  }

  getData(){
    this.http.get(this.api_key).subscribe(data=>{
      this.coinallinfo=data;
      this.justcoininfo =this.coinallinfo.filter(x => x.id == this.id)
      this.justcoininfo=this.justcoininfo[0];

      var checkWallet = this.wallet.find((a) => a.id === this.justcoininfo.id);
      if(checkWallet){
        this.money=checkWallet.amount;
      }
      //KIRMIZI YILDIZ
      
      let a=0;
      this.wlist.forEach(element => {
        if(element.id==this.justcoininfo.id){
          a++;
          if(a==0){
            this.color="dark";
          }
          else{
            this.color="danger";
            this.icon=false;
          }
        }
        
      })
    })
  }

  butonclick(id){
    let x =JSON.parse(localStorage.getItem("wlist")) || [];
    console.log(x)
    let a =0;
    x.forEach(function(element) {
      if(element.id==id.id){
        a++
      }
    });
    
    if(a==1){
      this.uyari('Coin watchlistinizde var.','danger');
      
      
    }else{
      this.color="danger";
      this.icon=false;
      x.push(id);
      console.log("wlist: ",x)
      localStorage.setItem("wlist",JSON.stringify(x));
      
      this.uyari('Coin watchlistinize başarıyla eklendi.','success');
  
  
    }
  
  }
  remove(id){
    this.wlist.forEach((i,index)=>{
      console.log(i.id+"i");
      if(i.id==id.id) {
        this.wlist.splice(index,1);
        console.log(index+"index");
        this.color="dark"
        this.icon=true;
        localStorage.setItem("wlist",JSON.stringify(this.wlist));
      }});

    this.uyari('Coin Watchlistinizden silindi.','danger');

  }

  butonclicktr(id){
    let x =JSON.parse(localStorage.getItem("wlist")) || [];
    console.log(x)
    let a =0;
    x.forEach(function(element) {
      if(element.id==id.id){
        a++
      }
    });
    
    if(a==1){
      this.uyari('Coin watchlistinizde var.','danger');
      
      
    }else{
      this.color="danger";
      this.icon=false;
      x.push(id);
      console.log("wlist: ",x)
      localStorage.setItem("wlist",JSON.stringify(x));
      
      this.uyari('Coin watchlistinize başarıyla eklendi.','success');
  
  
    }
  
  }
  removetr(id){
    this.wlist.forEach((i,index)=>{
      console.log(i.id+"i");
      if(i.id==id.id) {
        this.wlist.splice(index,1);
        console.log(index+"index");
        this.color="dark"
        this.icon=true;
        localStorage.setItem("wlist",JSON.stringify(this.wlist));
      }});

    this.uyari('Coin Watchlistinizden silindi.','danger');

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
