import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  public historybuy:any=JSON.parse(localStorage.getItem("historybuy")) || [];
  public historysell:any=JSON.parse(localStorage.getItem("historysell")) || [];
  language=localStorage.getItem('language');

  constructor() { }

  ngOnInit() {
  }

}
