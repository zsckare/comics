import { Component, OnInit } from '@angular/core';

import {DbService} from '../services/db.service';
import { Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  email:'';
  password:'';
  constructor( private db: DbService,private router: Router) { }

  ngOnInit() {
  }


  addUser(){
    this.db.addUser(this.email,this.password).then((res)=>{
      this.db.getUsers().then((res)=>{
        this.db.fecthUsers().subscribe(item => {
           var Data = item
            localStorage.setItem("user",JSON.stringify(Data[0]))
            this.router.navigate(['home']);
        })
      })
      
    })
  }


}
