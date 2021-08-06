import React, { Component } from 'react'

import { Link } from 'react-router-dom';

export class NotJustBricks extends Component {

  render() {
    return (

      <div id="abraham">
        <div id="button_cust">
        <Link to="/timelinepage" className="btn btn-primary">Back</Link>
        </div>
        <p>François de la Salle (dit Sanschagrin) est arrivé tardivement en Nouvelle-France en tant que soldat, plus précisément à titre de  caporal dans le Régiment de Berry, soit en 1755 ou 1756.
Il fait partie alors des troupes, sous la direction du marquis de Montcalm, envoyées par la France, afin de défendre la colonie contre une invasion imminente de l'armée britannique.
Selon une coutume bien établie dans l'armée française de l'époque, il hérite du' nom deguerre'- Sanschagrin-, qui deviendra un 2e patronyme pour le reste de ses jours et               que ses descendants porteront également, parfois avec une certaine confusion quant au choix de porter l'un, ou l'autre, ou les deux  patronymes transmis.
Au moment de son mariage en février 1759, il est en quartier d'hiver chez un 'habitant', dont il marie la fille, Marguerite Gagnon. En effet, quelques mois avant la bataille des plaines d'Abraham(septembre 1759), Montcalm avait déployé ses troupes autour de Québec dans l'expectative d'une attaque.
Réintégré à la vie civile, il a exercé le métier de cordonnier jusqu' à sa mort, survenue le  16-01-1798 à Ste Anne-de-Beaupré.
</p>
        <img src={ require('./img/plainsabraham.jpg') } />
      </div>
    )
  }
}

export default NotJustBricks
