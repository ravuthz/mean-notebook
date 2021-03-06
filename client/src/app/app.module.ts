import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NotesComponent } from './notes/notes.component';

import { NoteService } from './services/note.service';
import { FocusDirective } from './focus.directive';

@NgModule({
    declarations: [
        AppComponent,
        NotesComponent,
        FocusDirective
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [NoteService],
    bootstrap: [AppComponent]
})
export class AppModule { }
