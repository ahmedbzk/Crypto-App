import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  langtr:string='TR';
  langeng:string='EN';
  language:any=localStorage.getItem('language');
  public name:string;
  public localname=localStorage.getItem("title");
  checked:boolean=true;
  constructor(public toastController: ToastController, private router:Router) { }

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
      this.uyari("Success","success")

    }

  }
  confirmtr(){
    console.log(this.name)
    if(this.name==undefined){
      this.uyari("İsim girmelisiniz...","danger")
    }
    else{
      localStorage.setItem('title', JSON.stringify(this.name)); 
      this.uyari("Başarılı...","success")

    }

  }


  turntr(){
    this.language=this.langtr;
    this.language=localStorage.setItem('language',this.language)
    console.log(this.language)
    window.location.reload();
    this.uyari("Başarıyla dil değiştirdiniz","success")
    
  }

  turneng(){
    this.language=this.langeng;
    this.language=localStorage.setItem('language',this.language)
    console.log(this.language)
    window.location.reload();
    this.uyari("You have successfully changed language","success")
    
  }

  walleta(){
    this.router.navigate(['wallet'])
      .then(() => {
    });
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
