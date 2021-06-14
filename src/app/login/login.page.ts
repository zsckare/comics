import { Component, OnInit } from '@angular/core';
import {DbService} from '../services/db.service';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  Data:any;
  email:'';
  password:'';
  constructor( private db: DbService,private router: Router,public toastController: ToastController) { }

  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fecthUsers().subscribe(item => {
          this.Data = item
          console.log(this.Data)
        })
      }
    });
  }
  login(){
    this.Data.forEach(element => {
      if(element.email == this.email){
        if(element.password == this.password){
          this.router.navigate(['home']);      
        }else{
          this.presentToast()
        }
      }else{
        this.presentToast()
      }
    });
    
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Usuario y/o contraseña incorrecta.',
      duration: 2000
    });
    toast.present();
  }

}
