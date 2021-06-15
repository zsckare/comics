import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import {DbService} from '../services/db.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-comic',
  templateUrl: './comic.page.html',
  styleUrls: ['./comic.page.scss'],
})
export class ComicPage implements OnInit {
  data:any;
  comments:any;
  user:any;
  content:"";
  constructor(private route: ActivatedRoute, private router: Router,private db:DbService,public toastController: ToastController) { 
    console.log("CARGANDO")
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = JSON.parse(this.router.getCurrentNavigation().extras.state.special);
        
        console.log(this.data)
        console.log("CARGADO")
        this.getComentrios(this.data.id)

      }
    });

   
  }

  deleteComment(id){
    this.db.deleteComment(id).then((res)=>{
      this.db.dbState().subscribe((res) => {
        if(res){
          this.db.fetchComments().subscribe(item => {
            this.filterComments(item)
            
            console.log(this.comments)
          })
        }
      });
    })
  }

  getComentrios(comic_id){
    console.log(comic_id)
    
  }
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"))
    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchComments().subscribe(item => {
          this.filterComments(item)
          
          console.log(this.comments)
        })
      }
    });
  }
  filterComments(comments){
    var comentarios_filtrados = []
    comments.forEach(element => {
      if(element.comic_id == this.data.id){
        comentarios_filtrados.push(element)
      }
    });

    this.comments = comentarios_filtrados
  }

  gotoPDF(){
    let navigationExtras: NavigationExtras = {
      state: {
        special: JSON.stringify(this.data)
      }
    };
    console.log(navigationExtras)
    this.router.navigate(['pdf'], navigationExtras);
  }
  addComment(){
    console.log("addComment")
    var com = ""+this.content
    console.log(com.length)
    if(com.length == 0){
      this.presentToast()
    }
    else{
      this.db.addComment(this.user.id,this.data.id,this.content).then((res)=>{
        this.db.fetchComments().subscribe(item=>{
          console.log("added")
          this.comments.push(item)
          this.content = ""
        })
      })
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Error, el comentario no puede estar vacio.',
      duration: 2000
    });
    toast.present();
  }
}
