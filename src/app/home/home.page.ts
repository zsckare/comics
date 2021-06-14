import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  comics = [
    {
      id:'1',
      comic:"/assets/Comics/batman.pdf",
      name:'Batman Arkham City  Breaking Ground',
      image:"../../assets/batman.jpg",
      descripcion:'La trama principal gira en torno al encarcelamiento de Bruce Wayne (Batman) en Arkham City; una extensa y nueva ciudad convertida en una súper-prisión cinco veces más grande que el mapa de la entrega anterior, incluyendo una amplia variedad de distritos industriales, lugares emblemáticos y monumentos de Gotham City.'
    },
    {
      id:'2',
      name:'Carnage: Black,White & Blood',
      image:"../../assets/carnage.jpg",
      comic:"/assets/Comics/carnage.pdf",
      descripcion:'¡Sé testigo del caos cerebral causado por CARNAGE, traído a la vida por algunos de los más grandes creadores de Marvel!Pero cuidado, Verdaderos Creyentes, fieles al homónimo de su personaje principal, estos cuentos escalofriantes no son para los débiles de corazón y se presentan en NEGRO, BLANCO Y SANGRE'
    },
    {
      id:'3',
      name:'Spiderman: Forum 31',
      image:"../../assets/comic.jpg",
      comic:"/assets/Comics/comic.pdf",
      descripcion:''
    },
    {
      id:'4',
      name:'Invincible: 1 y 2',
      image:"../../assets/invincible.jpg",
      comic:"/assets/Comics/invincible.pdf",
      descripcion:'A la edad de 16 años, Mark comienza a desarrollar superpoderes y comienza a trabajar como superhéroe bajo la tutela de su padre.'
    },
    {
      id:'5',
      name:'Spiderman: Timestorm',
      image:"../../assets/timestorm.jpg",
      comic:"/assets/Comics/timestorm.pdf",
      descripcion:'La historia que tenemos aquí fue una especie de homenaje / recordatorio del quizás mejor futuro posible que se ha imaginado para el mundo Marvel en general: El mundo 2099, donde vimos a personajes como Spiderman, Punisher, Motorista Fantasma, Hulk o el Doctor Muerte en un contexto futurista y con propósitos nuevos y adaptados a un mundo muy parecido al de Blade Runner'
    },
  ]
  constructor(private router: Router) {}

  goTo(index){
    let navigationExtras: NavigationExtras = {
      state: {
        special: JSON.stringify(this.comics[index])
      }
    };
    console.log(navigationExtras)
    this.router.navigate(['comic'], navigationExtras);
  }

}
