import {WebsocketManager} from "./ws/WebsocketManager";
import {Jeu} from "./game/Jeu";

WebsocketManager.ws = new WebsocketManager();
Jeu.entity = new Jeu();