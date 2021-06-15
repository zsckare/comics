
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { User } from './user';
import { Comentario } from './comment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})

export class DbService {
  private storage: SQLiteObject;
  userList = new BehaviorSubject([]);
  commentList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform, 
    private sqlite: SQLite, 
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'comictest--.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.storage = db;
          this.getFakeData();
      });
    });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }
 
  fecthUsers(): Observable<User[]> {
    return this.userList.asObservable();
  }
  fetchComments(): Observable<User[]> {
    return this.commentList.asObservable();
  }

    // Render fake data
    getFakeData() {
      this.httpClient.get(
        'assets/basededatos.sql', 
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            this.getUsers();
            this.getComentarios();
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }

  // Get list
  getUsers(){
    return this.storage.executeSql('SELECT * FROM usuarios', []).then(res => {
      let items: User[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            id: res.rows.item(i).id,
            email: res.rows.item(i).email,  
            password: res.rows.item(i).password
           });
        }
      }
      this.userList.next(items);
    });
  }

  // Add
  addUser(email, password) {
    let data = [email, password];
    return this.storage.executeSql('INSERT INTO usuarios (email, password) VALUES (?, ?)', data)
    .then(res => {
      this.getUsers();
    });
  }
 
  // Get single object
  getUser(id): Promise<User> {
    return this.storage.executeSql('SELECT * FROM songtable WHERE id = ?', [id]).then(res => { 
      return {
        id: res.rows.item(0).id,
        email: res.rows.item(0).email,  
        password: res.rows.item(0).password
      }
    });
  }

  // Update
  updateUser(id, user: User) {
    let data = [user.email];
    return this.storage.executeSql(`UPDATE songtable SET artist_name = ?, song_name = ? WHERE id = ${id}`, data)
    .then(data => {
      this.getUsers();
    })
  }

  // Delete
  deleteUser(id) {
    return this.storage.executeSql('DELETE FROM songtable WHERE id = ?', [id])
    .then(_ => {
      this.getUsers();
    });
  }

  getComentarios(){
    return this.storage.executeSql('SELECT * FROM comentarios', []).then(res => {
      let items: Comentario[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            id: res.rows.item(i).id,
            user_id: res.rows.item(i).user_id,  
            comic_id: res.rows.item(i).comic_id,
            contenido: res.rows.item(i).contenido
           });
        }
      }
      this.commentList.next(items);
    });
  }
  addComment(user_id,comic_id,content){
    let data = [user_id, comic_id,content];
    console.log(data)
    return this.storage.executeSql('INSERT INTO comentarios (user_id,comic_id,contenido) VALUES (?, ?,?)', data)
    .then(res => {
      this.getComentarios();
    });
    /* contenido TEXT, 
    user_id TEXT,
    comic_id INTEGER */
  }
  deleteComment(id){
    return this.storage.executeSql('DELETE FROM comentarios WHERE id = ?', [id])
    .then(_ => {
      this.getComentarios();
    });
  }
}