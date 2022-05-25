import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  title:string="";
  constructor() { }

  ngOnInit() {
    
  }

  send(){
      localStorage.setItem("title",this.title);
  }
}
