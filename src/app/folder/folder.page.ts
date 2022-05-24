import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public api_key:string="https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
  public allcoininfo:any=[];
  public fivecoininfo:any=[];
  public up:any=[];
  public down:any=[];
  x:number=0;
  y:number=0;
  f:boolean=true;
  b:boolean=true;

  constructor(private activatedRoute: ActivatedRoute,private http: HttpClient, public toastController: ToastController) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');

    this.http.get(this.api_key).subscribe(data=>{
      this.allcoininfo=data;
      console.log(this.allcoininfo);
    })


    this.http.get(this.api_key).subscribe(data=>{
      this.up=data;
      this.up.sort((a,b) => a.price_change_percentage_24h > b.price_change_percentage_24h ? -1:1 )
    })

    this.http.get(this.api_key).subscribe(data=>{
      this.down=data;
      this.down.sort((a,b) => a.price_change_percentage_24h > b.price_change_percentage_24h ? 1:-1 )
    })
  }

  forward(){
    this.f=!this.f
  }
  back(){
    this.b=!this.b
  }



  
  gonext(){
    this.x=this.x+1;
    if(this.x<5){
      this.x=this.x+1;
    }
    else{
      this.x=0;
    }
  }
  gonexttwo(){
    this.y=this.y+1;
    if(this.y<5){
      this.y=this.y+1;
    }
    else{
      this.y=0;
    }
  }
  

  doRefresh(event) {
    window.location.href="/folder";

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
