import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DetailsPage } from '../details/details.page';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  id:string;
  public api_key:string="https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
  public tencoininfo:any=[];
  more:number=10;
  public word:string;
  public itemallinfo:any=[];
  public iteminfo:any=[];
  i:number=0;
  page:boolean=true;
  public wlist=JSON.parse(localStorage.getItem("wlist")) || [];
  public watchlistnew:any=[];

  constructor(private activatedRoute: ActivatedRoute,private http: HttpClient, public toastController: ToastController) { }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.http.get(this.api_key).subscribe(data=>{
      this.tencoininfo=data;
     
      var xarray = [];
      this.wlist.forEach((element) => {
        setTimeout(() => {
          let live = this.tencoininfo.find((x) => x.id == element.id) ;
          xarray.push(live);
          console.log(xarray);
          this.watchlistnew=xarray;
        });
        }, 1000);
    })

   
      

  }

  coinsup(){
    
    if(this.i==0){
      
        this.tencoininfo.sort((a,b) => a.price_change_percentage_24h > b.price_change_percentage_24h ? -1:1 )
        this.i=this.i+1;
      
    }
    else if(this.i==1){
      this.http.get(this.api_key).subscribe(data=>{
        this.tencoininfo=data;
        console.log(this.tencoininfo);
        this.i=this.i+1;
      })
    }
    else if(this.i==2){
      
        this.tencoininfo.sort((a,b) => a.price_change_percentage_24h > b.price_change_percentage_24h ? 1:-1 )
        this.i=this.i-2;
      
    }
    
  }

  coinsupwatchlist(){
      if(this.i==0){
        this.watchlistnew.sort((a,b) => a.price_change_percentage_24h > b.price_change_percentage_24h ? -1:1 )
        this.i=this.i+1;
      }
      else if(this.i==1){
        this.watchlistnew.sort((a,b) => a.price_change_percentage_24h > b.price_change_percentage_24h ? 1:-1 )
        this.i=this.i-1;
      }
  }

  changepage(){
    console.log(this.page)
    this.page=true;
  }
  changepageagain(){
    console.log(this.page)

    this.page=false;
  }


  morecrypto(){
    this.more=this.more+10;
    if(this.more==100){
      this.uyari("No more crypto for now","danger")
      document.getElementById("morecryptobutton").style.visibility="hidden";
    }
  }

  found(){
    if(this.word.length>0){
      this.http.get(this.api_key).subscribe(data=>{
      this.itemallinfo=data;
      this.iteminfo = this.itemallinfo.filter((item) =>
      item.name.toLowerCase().includes(this.word.toLowerCase())
    );
    })
    }else{
      this.iteminfo=[];
    }
  }

  doRefresh(event) {
    window.location.href="/search";

    setTimeout(() => {
      event.target.complete();
    }, 1000);
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
