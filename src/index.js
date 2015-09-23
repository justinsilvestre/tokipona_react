import analysis from './analysis';
import Tokipona from './runApp.js'
require('!style!css!sass!./styles.scss');

export var translation = new Tokipona.Translation(analysis);
translation.mount(document.getElementById('root'));