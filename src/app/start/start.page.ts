import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})

export class StartPage implements OnInit {
  title:string="";
  balance:number;
  

  constructor(public toastController: ToastController,private navCtrl: NavController) { 
    
  }

  ngOnInit() {
    
  }

  send(){
    
    if(this.title.length<1){
      this.uyari("You must enter the name","danger")
    }
    else if(!(this.balance) || this.balance<10000){
      this.uyari("You must enter the money and you must start minimum 10000 dolars.","danger")
    }
    
    else{
      localStorage.setItem('balance',JSON.stringify(this.balance));
      localStorage.setItem("title",this.title);
      this.uyari("You are redirected...","warning")
      setTimeout(() => {
        this.navCtrl.navigateRoot('/folder');
        this.uyari("Welcome The Crypto World","success")
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

