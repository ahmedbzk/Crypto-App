import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  langtr:string='TR';
  langeng:string='ENG';
  language:any=localStorage.getItem('language');
  public name:string;
  public localname=localStorage.getItem("title");
  checked:boolean=true;
  constructor(public toastController: ToastController) { }

  ngOnInit() {
    console.log(this.language)
  }

  confirm(){
    console.log(this.name)
    if(this.name==undefined){
      this.uyari("You must enter the name","danger")
    }
    else{
      localStorage.setItem('title', JSON.stringify(this.name)); 
      window.location.reload();
      this.uyari("Success","success")

    }

  }


  turntr(){
    this.language=this.langtr;
    this.language=localStorage.setItem('language',this.language)
    console.log(this.language)
    this.uyari("Başarıyla dil değiştirdiniz","success")
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  turneng(){
    this.language=this.langeng;
    this.language=localStorage.setItem('language',this.language)
    console.log(this.language)
    this.uyari("You have successfully changed language","success")
    setTimeout(() => {
      window.location.reload();
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
