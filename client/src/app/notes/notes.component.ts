import { Component, OnInit } from '@angular/core';
import { NoteService } from '../services/note.service';
import { Note } from '../models/note';

@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.css']
})

export class NotesComponent implements OnInit {
    notes: Note[];
    book: String;
    author: String;
    title: String;
    content: String;

    constructor(private noteService: NoteService) {
        this.blankNote();
        noteService.get().subscribe(
            notes => this.notes = notes,
            error => console.log(error)
        );
    }

    ngOnInit() {

    }

    addNote() {
        // event.preventDefault();
        // console.log(this.title);
    }

    blankNote() {
        this.book = 'notebook';
        this.author = '1';
        this.title = '';
        this.content = '';
    }

}
