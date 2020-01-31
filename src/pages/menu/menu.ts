import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HttpClient } from '@angular/common/http';
import {param } from '../../param/param';
//import {AppService} from '../../services/appService';
import { AccueilPage} from '../accueil/accueil';

import { AlertController } from 'ionic-angular';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  private file;
  private repas;
  private date;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpClient: HttpClient,
    public alertCtrl: AlertController
  ) {

    this.file = this.navParams.data;
    httpClient.get(param.listeRepas)
    .subscribe(data=>{
      this.repas = data;
      console.log("data", data);
    })

    this.date = new Date();
    console.log(JSON.stringify(this.date));
  }

  doPrompt(idBac) {
    let prompt = this.alertCtrl.create({
      title: 'Modifier un repas',
      message: "Entrez le nom du menu que vous souhaitez ajouter",
      inputs: [
        {
          name: 'nom',
          placeholder: 'Repas'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Valider',
          handler: data => {
            this.creerRepas(data, idBac);
          }
        }
      ]
    });
    prompt.present();
  }

  creerRepas(data, idBac){
    console.log("data:",data);
    console.log("idBac:",idBac)
    let repas = data;
    let postData = new FormData();
    postData.append('nom', repas.nom);

    this.httpClient.get(param.getRepas, idBac)
    .subscribe(data=>{
      console.log("le repas :",data);
    })

    this.httpClient.post(param.creerRepas, postData)
    .subscribe();
    this.navCtrl.push(AccueilPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

}
