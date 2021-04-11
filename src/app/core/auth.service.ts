import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Injectable()
export class AuthService {
  authState: any = null;

  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(data => this.authState = data);
  }

  get autheticated(): boolean {
    return this.authState !== null;
  }

  get currentUserId(): string {
    return this.autheticated ? this.authState.uid : null;
  }

  login() {
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut();
  }
}
