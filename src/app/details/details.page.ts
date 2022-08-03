import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  language=localStorage.getItem('language');
  id:string;
  api_key:string="https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
  coinallinfo:any;
  justcoininfo:any;
  index:number;
  balance:number=JSON.parse(localStorage.getItem('balance'))||0;
  public newbalance:number=0;
  count:number;
  bol:number;
  public wallet:any=JSON.parse(localStorage.getItem("wallet")) || [];
  public wlist=JSON.parse(localStorage.getItem("wlist")) || [];
  color:string="dark";
  icon:boolean=true;
  public i:number;
  public xarray=[];
  historybuy=JSON.parse(localStorage.getItem("historybuy")) || [];
  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, public toastController: ToastController,private navCtrl: NavController,private router: Router) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getData();
    localStorage.setItem('balance',JSON.stringify(this.balance));
    
    
   
  }

  

  butonOne(){
    this.bol=this.balance/4;
    this.bol=parseInt(this.bol.toString().slice(0,9));
    this.count=this.bol/this.justcoininfo.current_price;
    this.count=parseInt(this.count.toString().slice(0,7));

  }

  butonTwo(){
    this.bol=this.balance/2;
    this.bol=parseInt(this.bol.toString().slice(0,9));
    this.count=this.bol/this.justcoininfo.current_price;
    this.count=parseInt(this.count.toString().slice(0,7));

  }

  butonThree(){
    this.bol=this.balance/4*3;
    this.bol=parseInt(this.bol.toString().slice(0,9));
    this.count=this.bol/this.justcoininfo.current_price;
    this.count=parseInt(this.count.toString().slice(0,7));

  }

  butonFour(){
    this.bol=this.balance;
    this.bol=parseInt(this.bol.toString().slice(0,9));
    this.count=this.bol/this.justcoininfo.current_price;
    this.count=parseInt(this.count.toString().slice(0,8));

  }

  buy(){
    if(!this.count){
      this.uyari("You must enter the count",'danger')
    }
    else if(this.count<0){
      this.uyari("Wrong amount.",'danger')
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
          price: this.justcoininfo.current_price,
          img: this.justcoininfo.image
        },
      ]}
      localStorage.setItem("historybuy",JSON.stringify(this.wallet))
      localStorage.setItem("wallet",JSON.stringify(this.wallet))
      console.log(this.wallet);
      this.uyari(`You bought ${this.count} count ${this.justcoininfo.name}`,'success')

      }
    }
  }
  buytr(){
    if(!this.count){
      this.uyari("Miktar girmelisiniz...",'danger')
    }
    else if(this.count<0){
      this.uyari("Yanlış Miktar...",'danger')
    }
    
    else{
      if(this.balance<this.justcoininfo.current_price*this.count){
        this.uyari("Satın alamazsınız. Çünkü bakiyeniz yeterli değil...",'danger')
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
          price: this.justcoininfo.current_price,
          img: this.justcoininfo.image
        },
      ]}
      localStorage.setItem("historybuy",JSON.stringify(this.wallet))
      localStorage.setItem("wallet",JSON.stringify(this.wallet))
      console.log(this.wallet);
      this.uyari(`${this.count} adet ${this.justcoininfo.name} satın aldınız...`,'success')

      }
    }
  }

  sell(){
    this.router.navigate(['sell',this.justcoininfo&&this.justcoininfo.id])
      .then(() => {
    });
  }

  getData(){
    this.http.get(this.api_key).subscribe(data=>{
      this.coinallinfo=data;
      this.justcoininfo =this.coinallinfo.filter(x => x.id == this.id)
      this.justcoininfo=this.justcoininfo[0];

      var balancarefresh=this.balance;
      if(balancarefresh){
        this.newbalance=balancarefresh;
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

  walleta(){
    this.router.navigate(['wallet'])
      .then(() => {
    });
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
      this.uyari('The coin is on your watch list.','danger');
      
      
    }else{
      this.color="danger";
      this.icon=false;
      x.push(id);
      console.log("wlist: ",x)
      localStorage.setItem("wlist",JSON.stringify(x));
      
      this.uyari('Coin has been successfully added to your watchlist.','success');
  
  
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

    this.uyari('Coin has been deleted from your Watchlist.','danger');

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
