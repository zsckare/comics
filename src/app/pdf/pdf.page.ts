import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.page.html',
  styleUrls: ['./pdf.page.scss'],
})
export class PdfPage implements OnInit {

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

}
