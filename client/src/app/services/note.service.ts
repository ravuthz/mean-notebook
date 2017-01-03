import { Injectable } from '@angular/core';
// import { Http, Headers } from '@angular/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Rx';

import { Note } from '../models/note';


@Injectable()
export class NoteService {
    private url: string;
    private headers: Headers;
    private options: RequestOptions;

    constructor(private http: Http) {
        console.log('NoteService was initialize...');
        this.url = 'http://localhost:3000/api/notes/';

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Access-Control-Allow-Origin', '*');

        this.options = new RequestOptions({headers: this.headers});
    }

    one(id: string): Promise<Note> {
        return this.http.get(this.url + id)
            .toPromise().then(res => res.json() as Note).catch(this.handleError);
    }

    all(): Promise<Note[]> {
        return this.http.get(this.url)
            .toPromise().then(res => res.json() as Note[]).catch(this.handleError);
    }

    get(id: string = null): Promise<Note[]> {
        if (id != null) {
            return this.http.get(this.url + id)
            .toPromise().then(res => res.json()).catch(this.handleError);
        }
        return this.http.get(this.url)
            .toPromise().then(res => res.json()).catch(this.handleError);
    }

    getNoReturnType(id) {
        return this.http.get(this.url + id)
            .toPromise();
            // .then(res => res.json() as Note).catch(this.handleError);
    }

    getNotes(): Observable<Note[]> {
        return this.http.get(this.url)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));;
    }

    createNote(newNote): Observable<Note> {
        return this.http.post(this.url, newNote, this.options)
            .map(this.extractData).catch(this.handleError);
    }

    deleteNote(id): Observable<Note> {
        return this.http.delete(this.url + id)
            .map(res => res.json())
            .catch(this.handleError);
    }

    updateNote(id, note): Observable<Note> {
        return this.http.put(this.url + id, note)
            .map(res => res.json())
            .catch(this.handleError);
    }


    create(note): Promise<Note> {
        return this.http.post(this.url, note)
            .toPromise().then(this.extractData).catch(this.handleError);
    }

    delete(id): Promise<Note> {
        return this.http.delete(this.url + id)
            .toPromise().then(this.extractData).catch(this.handleError);
    }

    update(id, note): Promise<Note> {
        return this.http.put(this.url + id, note)
            .toPromise().then(this.extractData).catch(this.handleError);
    }

    private handleError(error: Response | any): Promise<any> {
        // let errMsg: string;
        // if (error instanceof Response) {
        //     const body = error.json() || '';
        //     const err = body.error || JSON.stringify(body);
        //     errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        // } else {
        //     errMsg = error.message ? error.message : error.toString();
        // }

        // console.log('Error: ', errMsg);
        // return Observable.throw(errMsg);


        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }
}


// this.http.get('/restservice/userstatus', {headers: headers})
// .map((data: any) => data.json())
// .subscribe(
//         (data: any) => {
//             this.userStatus = data;
//         },
//         err => console.log(err), // error
//         () => console.log('getUserStatus Complete') // complete
//     );

// getHeroes(): Promise<Hero[]> {
//     return this.http.get(this.heroesUrl)
//                .toPromise()
//                .then(response => response.json().data as Hero[])
//                .catch(this.handleError);
//   }
