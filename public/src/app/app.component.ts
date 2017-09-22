import { Component } from '@angular/core';
import {NoteService} from './note.service'
import { Observable, BehaviorSubject } from 'rxjs/Rx';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  noteobserver;
  notes= []
  constructor(private _noteservice: NoteService) {
    this._noteservice.noteobserver.subscribe((notes) =>{
      this.notes = notes
    })
   }
  title = 'anon notes';
  
  note = {
    notetext:"",
    created_at: new Date()
  }
 ngOnInit(){
   console.log('initing');
   this._noteservice.getNotes()
 }
  
  onsubmit(){
    console.log('**********')
    this._noteservice.create(this.note).then((data) => {
      console.log('data: ', data);
    })
    
    console.log("submitted notes")
    console.log(this.note)
    this.notes.push(this.note)
    console.log(this.notes)
    this.note ={
      notetext:'',
      created_at: new Date()
    }
    console.log("in the on submit function")

  

  }
}
