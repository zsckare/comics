import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-comic',
  templateUrl: './comic.page.html',
  styleUrls: ['./comic.page.scss'],
})
export class ComicPage implements OnInit {
  data:any;
  constructor(private route: ActivatedRoute, private router: Router) {
    console.log("CARGANDO")
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = JSON.parse(this.router.getCurrentNavigation().extras.state.special);
        
        console.log(this.data)
        console.log("CARGADO")

      }
    });

   
  }
  ngOnInit() {
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
}
