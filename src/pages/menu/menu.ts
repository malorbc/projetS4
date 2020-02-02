import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { param } from '../../param/param';
//import {AppService} from '../../services/appService';
import { AccueilPage } from '../accueil/accueil';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpClient: HttpClient,
    public alertCtrl: AlertController
  ) {

    this.file = this.navParams.data;
    httpClient.get(param.listeRepas)
      .subscribe(data => {
        this.repas = data;
        console.log("data", data);
      })
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

  creerRepas(data, idBac) {
    console.log("data:", data);
    console.log("idBac:", idBac)
    let repas = data;
    let postData = new FormData();
    let file2 = this.file

    //traitement de la date
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let dd2;
    let mm2
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd2 = '0' + dd;
    } else {
      dd2 = dd;
    }
    if (mm < 10) {
      mm2 = '0' + mm;
    } else {
      mm2 = mm;
    }
    let today2 = yyyy + '-' + mm2 + '-' + dd2 + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    console.log(today2);

    console.log("file de", file2);
    postData.append('nom', repas.nom);
    postData.append('numero_bac', idBac);
    postData.append('gauche', file2);
    postData.append('date', today2);
    console.log(JSON.stringify(postData));



    this.httpClient.post(param.creerRepas, postData)
      .subscribe();
    this.navCtrl.push(AccueilPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');

    let truc = new FormData();
    truc.append('gauche','1')

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
  
    this.httpClient.post(param.getRepas, "gauche=1")
    .subscribe(data=>{
      console.log(data);
      console.log("test");
    });
  }
}
