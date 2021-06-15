import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
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
  confirm_password:'';
  correct_password:boolean;
  constructor( private db: DbService,private router: Router,public toastController: ToastController) { }

  ngOnInit() {
    this.correct_password = false
  }

  checkPassword(){
    if(this.password == this.confirm_password){
      this.correct_password = false
      console.log("nocoincide")
    }else{
      this.correct_password = true
      console.log("Coincide")
    }
  }


  checkAddUser(){
    var pasaEmail =true
    var pasaPwd = true
    if(this.email.length ==0){
      this.presentToast("Email Vacio")
      pasaEmail = false
    }
    if(this.password.length ==0){
      this.presentToast("Contraeña Vacia")
      pasaPwd = false;
    }
    if(pasaPwd &&pasaEmail){
      this.addUser()
    }
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

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message:msg,
      duration: 2000
    });
    toast.present();
  }

}
