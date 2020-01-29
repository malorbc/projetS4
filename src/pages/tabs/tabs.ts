import { Component } from '@angular/core';

import { AccueilPage } from '../accueil/accueil';
import { MenuPage } from '../menu/menu';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabAccueil = AccueilPage;
  tabMenu = MenuPage;

  constructor() {

  }
}
