/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAv8GL06O13gq6-_88oBjxLbvmfnHTxtog",
  authDomain: "test-firebase-24d3d.firebaseapp.com",
  projectId: "test-firebase-24d3d",
  storageBucket: "test-firebase-24d3d.appspot.com",
  messagingSenderId: "540051686308",
  appId: "1:540051686308:web:13b9856de784114899f731"
};
const app = initializeApp(firebaseConfig);

AppRegistry.registerComponent(appName, () => App);
