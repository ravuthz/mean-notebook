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
    private url: String;
    private headers: Headers;

    constructor(private http: Http) {
        console.log('NoteService was initialize...');
        this.url = 'http://localhost:3000/api/';

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Access-Control-Allow-Origin', '*');
    }

    get(): Observable<Note[]> {
        return this.http.get(this.url + 'notes') // headers (optinal)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));;
    }

    getNotes(): Promise<Note[]> {
        return this.http.get(this.url + 'notes', this.headers)
            .toPromise()
            .then(response => response.json().data as Note[])
            .catch(this.handleError);
    }

    getHero(id: number): Promise<Note> {
        const url = `${this.url}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Note)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
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
