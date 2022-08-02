import { Component, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  language=localStorage.getItem('language');
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
  name:any="";
  handlerMessage:string = '';
  public exit="CONTINUE";
  i:number=0;
  constructor(private loadingCtrl: LoadingController,private navCtrl: NavController,private activatedRoute: ActivatedRoute,private http: HttpClient, public toastController: ToastController,private alertController: AlertController) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');

    this.http.get(this.api_key).subscribe(data=>{
      this.allcoininfo=data;
    })


    this.http.get(this.api_key).subscribe(data=>{
      this.up=data;
      this.up.sort((a,b) => a.price_change_percentage_24h > b.price_change_percentage_24h ? -1:1 )
    })

    this.http.get(this.api_key).subscribe(data=>{
      this.down=data;
      this.down.sort((a,b) => a.price_change_percentage_24h > b.price_change_percentage_24h ? 1:-1 )
    })
    this.name=localStorage.getItem("title")
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
    else {
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

  async presentAlert() {
    if(this.i==0){
    const alert = await this.alertController.create({
      header: 'BE CAREFUL',
      message: 'If you log out, your account will be deleted. Do you approve? If you approve, click the exit button once more.',
      buttons: ['I Confirm.']
    });
    await alert.present();
    this.i=this.i+1;
    }
    else if(this.i==1){
    localStorage.clear();
    this.showLoading();
  }
    
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Checking out in 3 seconds...',
      duration: 3000
      
    });
    
    loading.present();
    setTimeout(() => {
     
      this.navCtrl.navigateRoot('/start');
      this.uyari("Exit Successful","success")
    }, 3000);

  }

  async presentAlerttr() {
    if(this.i==0){
    const alert = await this.alertController.create({
      header: 'Dikkatli ol',
      message: 'Eğer çıkış yaparsan, hesabın silinecek. Kabul ediyor musun? Kabul ediyorsan, çıkış butonuna bir daha bas.',
      buttons: ['Kabul ediyorum.']
    });
    await alert.present();
    this.i=this.i+1;
    }
    else if(this.i==1){
    localStorage.clear();
    this.showLoadingtr();
  }
    
  }

  async showLoadingtr() {
    const loading = await this.loadingCtrl.create({
      message: '3 saniye içinde çıkılıyor...',
      duration: 3000
      
    });
    
    loading.present();
    setTimeout(() => {
     
      this.navCtrl.navigateRoot('/start');
      this.uyari("Çıkış Başarılı","success")
    }, 3000);

  }
}
