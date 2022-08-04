import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})

export class StartPage implements OnInit {
  selectoption:string;
  title:string="";
  balance:number;
  langone:string="EN";
  langtwo:string="TR";
  check:boolean=true;
  newbalance:number;

  constructor(public toastController: ToastController,private navCtrl: NavController) { 
    
  }

  ngOnInit() {
    console.log(this.selectoption)
  }

  send(){
    
    if(this.title.length<1){
      this.uyari("You must enter the name","danger")
    }
    else if(!(this.balance) || this.balance<10000){
      this.uyari("You must enter the money and you must start minimum 10000 dolars.","danger")
    }
    else if(this.selectoption==undefined){
      this.uyari("You must choose the language","danger")
    }
    
    else{
      if(this.selectoption=="TR"){
        localStorage.setItem('language',this.selectoption);
      }
      else if(this.selectoption=="EN"){
        localStorage.setItem('language',this.selectoption);
      }
      localStorage.setItem('balance',JSON.stringify(this.balance));
      localStorage.setItem("title",this.title);
      localStorage.setItem('newbalance',JSON.stringify(this.balance));
      console.log(this.balance)

      this.uyari("You are redirected...","warning")
      setTimeout(() => {
        this.navCtrl.navigateRoot('/folder');
        this.uyari("Welcome The Crypto World","success")
      }, 2000);
      

    }
    
  }

  sendtr(){
    
    if(this.title.length<1){
      this.uyari("İsim girmelisiniz...","danger")
    }
    else if(!(this.balance) || this.balance<10000){
      this.uyari("Minimum 10000 dolar para miktarı belirlemelisiniz...","danger")
    }
    else if(this.selectoption==undefined){
      this.uyari("Dil seçmelisiniz...","danger")
    }
    
    else{
      if(this.selectoption=="TR"){
        localStorage.setItem('language',this.selectoption);
      }
      else if(this.selectoption=="EN"){
        localStorage.setItem('language',this.selectoption);
      }
      localStorage.setItem('balance',JSON.stringify(this.balance));
      localStorage.setItem("title",this.title);
      localStorage.setItem('newbalance',JSON.stringify(this.balance));
      this.uyari("Yönlendiriliyorsunuz...","warning")
      setTimeout(() => {
        this.navCtrl.navigateRoot('/folder');
        this.uyari("Kripto Dünyasına Hoşgeldiniz...","success")
      }, 2000);
      

    }
    
  }

 


  async uyari(mesaj,renk) {
    const toast = await this.toastController.create({
      message: mesaj,
      color:renk,
      duration: 2000,
    });
    toast.present();
  }
  
}

