import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HttpClient } from '@angular/common/http';
import {param } from '../../param/param';
//import {AppService} from '../../services/appService';
import { MenuPage} from '../menu/menu';

import { AlertController } from 'ionic-angular';

/**
 * Generated class for the AccueilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html',
})
export class AccueilPage {

  private repas;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpClient: HttpClient,
    public alertCtrl: AlertController
  ) {

    httpClient.get('http://localhost/prjtS4/back-end/listeRepas.php')
      .subscribe(data => {
        this.repas = data;
        console.log("données", this.repas);

      })
  }

  goMenu(file){
    if(file == "0"){
      console.log("file de droite");
      this.navCtrl.push(MenuPage, file);
    }

    if(file == "1"){
      console.log("file de gauche");
      this.navCtrl.push(MenuPage, file);
    }
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad AccueilPage');
  }

}
