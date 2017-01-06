import { Component, OnInit } from '@angular/core';
import { NoteService } from '../services/note.service';
import { Note } from '../models/note';

@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.css']
})

export class NotesComponent implements OnInit {
    notes;
    book: string;
    author: string;
    title: string;
    content: string;

    error: string;
    isModify: boolean = false;

    constructor(private noteService: NoteService) {}

    ngOnInit() {
        this.blankNote();

        this.noteService.get().then(
            notes => {
                console.log('get data:', notes);
                this.notes = notes
            },
            error => console.log(error)
        );

        this.noteService.get("58626a02f36d2845d130d350").then(
            res => {
                console.log('get data:', res);
            },
            error => console.log(error)
        );

        this.noteService.one("58626a02f36d2845d130d350").then(
            res => {
                console.log('one data:', res);
            },
            error => console.log(error)
        );

        this.noteService.getNoReturnType("58626a02f36d2845d130d350").then(
            res => {
                console.log('one data:', JSON.parse(res['_body']));
            },
            error => console.log(error)
        );

        this.noteService.all().then(
            res => {
                console.log('all data:', res);
            },
            error => console.log(error)
        );

        // this.noteService.getNotes().subscribe(
        //     res => this.notes = res,
        //     err => console.log(err)
        // );
    }

    createNote() {
        event.preventDefault();

        var newNote = {
            title: this.title,
            content: this.content,
            book: this.book,
            author: this.author
        };

        this.noteService.create(newNote).then(
            res => this.insertLocalNote(newNote),
            err => this.error = <any>err
        );

        // this.noteService.createNote(newNote).subscribe(
        //     res => this.appendNotes(newNote),
        //     err => this.error = <any>err
        // );
    }

    deleteNote(note) {
        this.noteService.delete(note._id).then(
            res => this.deleteLocalNote(note),
            err => this.error = <any>err
        );

        // this.noteService.deleteNote(note._id).subscribe(
        //     res => this.refreshNotes(note),
        //     err => this.error = <any>err
        // );
    }

    updateNote(note) {
        this.noteService.update(note._id, note).then(
            res => this.updateLocalNote(note),
            err => this.showErrorMessage(err)
        );

        // this.noteService.updateNote(note._id, note).subscribe(
        //     res => this.updateNotes(note),
        //     err => this.error = <any>err
        // );
        this.isModify = false;
    }

    modifyNote(note) {
        this.title = note.title;
        this.content = note.content;
        this.book = note.book;
        this.author = note.author;
        this.isModify = true;
    }

    blankNote() {
        this.book = 'notebook';
        this.author = 'ravuthz';
        this.title = 'note';
        this.content = 'note';
        this.isModify = false;
    }

    showErrorMessage(err) {
        this.error = err;
        console.log(err);
    }

    /**
     * These action crud on view with client side
     * don't reload the data just crud on current notes
     */

    insertLocalNote(note) {
        this.notes.push(note);
        this.blankNote();
    }

    updateLocalNote(note) {
        for  (let i=0; i<this.notes.length; i++) {
            if (this.notes[i]._id == note._id) {
                this.notes[i] = note;
            }
        }
        this.blankNote();
    }

    deleteLocalNote(note) {
        for (let i=0; i<this.notes.length; i++) {
            if (this.notes[i]._id == note._id) {
                this.notes.splice(i, 1);
            }
        }
    }

}
