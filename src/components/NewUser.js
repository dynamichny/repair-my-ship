export default class User {
  constructor(email, displayName, photoURL, uid) {
    this.email = email;
    this.displayName = displayName ? displayName : email.match(/[a-zA-Z0-9_.+-]+/g)[0];
    this.photoURL = photoURL ? photoURL : 'https://firebasestorage.googleapis.com/v0/b/repair-my-ship-af8c0.appspot.com/o/user_icon.png?alt=media';
    this.uid = uid;
  }
}