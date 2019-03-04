const DEFAULT_NEW_TAB_NAME = 'New Tab';
const GUITAR_STANDARD_E = ['e','B','G','D','A','E'];
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TablatureView, Chord } from './tablature.model';
import { EventEmitter } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TablatureService {

  constructor() {
    var drafts;
    try {
      drafts = JSON.parse(window.localStorage.getItem('drafts'))||{};
    } catch(e) {}
    this.view = drafts;
    Object.keys(this.view).forEach(view=>{
      this.view[view] = Object.assign(new TablatureView(), this.view[view]);
      this.view[view].tablature.notes = this.view[view].tablature.notes.map(n=>Object.assign(new Chord(),n));
    });
    this.grow.pipe(debounceTime(500))
    .subscribe(measureAddedToView=>{
      //drafts[measureAddedToView.name]
      window.localStorage.setItem('drafts', JSON.stringify(this.view));
    });
  }

  debug = !!environment.debug.tab;
  view: {
    [key:string]:TablatureView
  } = {};
  generateName() {
    return `${DEFAULT_NEW_TAB_NAME} ${Object.keys(this.view).length + 1}`
  }
  grow = new EventEmitter<TablatureView>();
}
