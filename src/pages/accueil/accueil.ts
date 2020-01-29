import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HttpClient } from '@angular/common/http';

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

  doPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Modifier un repas',
      message: "Entrez le nom du menu que vous souhaitez ajouter",
      inputs: [
        {
          name: 'title',
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
            console.log('Saved clicked');
            console.log(data);
          }
        }
      ]
    });
    prompt.present();
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad AccueilPage');
  }

}
