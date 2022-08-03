import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  public historybuy:any=JSON.parse(localStorage.getItem("historybuy")) || [];
  public historysell:any=JSON.parse(localStorage.getItem("historysell")) || [];
  language=localStorage.getItem('language');

  constructor(public toastController: ToastController,private router: Router) { }

  ngOnInit() {
  }

  deletetr(){
    localStorage.removeItem('historybuy')
    localStorage.removeItem('historysell')
    this.uyari("Cleanup successful","success")
  }
  deleteeng(){
    localStorage.removeItem('historybuy')
    localStorage.removeItem('historysell')
    this.uyari("Temizleme başarılı","success")
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
