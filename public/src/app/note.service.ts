import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import "rxjs";
import { AppComponent } from './app.component'
import { Observable, BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class NoteService {
  notes = [];
  noteobserver = new BehaviorSubject(this.notes)

  constructor(private _http: Http) { }
    create(note){
      console.log("in create method: ", note);
      return this._http.post(`/notes`, note)
      .map( data => data.json() )
      .toPromise();
    }
    getNotes(){
      return this._http.get(`/notes`)
        .subscribe((response)=>{
          this.notes = response.json();
          console.log('got some notes: ', this.notes);
          this.noteobserver.next(this.notes)
        },
        (err)=>{
          console.log(err)
        }
      )
    }
  }

