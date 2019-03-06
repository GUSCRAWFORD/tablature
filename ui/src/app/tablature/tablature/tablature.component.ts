import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TablatureService } from 'src/app/ui/tablature/tablature.service';
import { TablatureView, Bend, Hammer, TablatureCursor } from 'src/app/ui/tablature/tablature.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tablature',
  templateUrl: './tablature.component.html',
  styleUrls: ['./tablature.component.scss']
})
export class TablatureComponent implements OnInit {

  constructor(
    public title:Title,
    public tablature:TablatureService
  ) { }

  @Input() view:TablatureView

  keyBuffer = [];
  docWidth;
  @ViewChild('tablatureContainer')tablatureContainer:any;
  ngOnInit() {
    this.view.blankMeasure();
    this.docWidth = this.view.page.notesPerLine;
    this.tablature.grow.subscribe(grownView=>{
      this.docWidth = grownView.page.notesPerLine;
    });
  }
  setName(title:string) {
    this.title.setTitle(this.view.name = title);
  }
  keyboardMap = {
    "[0-9]":(digit)=>digit
  }
  mapKeyboard($event) {
    var mappings = Object.keys(this.keyboardMap), m = 0;
    while (m < mappings.length) {
      if (new RegExp(mappings[m]).test($event.key))
        return this.keyboardMap[mappings[m]]($event.key);
      m ++;
    }
  }
  addHammerOn(cursor:TablatureCursor, c:TablatureComponent, $e) {
    var fingering = c.view.tablature.notes[(cursor||c.view.cursor).note].strings[(cursor||c.view.cursor).string];
    if (!c.view.tablature.notes[(cursor||c.view.cursor).note].technique)
      c.view.tablature.notes[(cursor||c.view.cursor).note].technique = {};
    if (!c.view.tablature.notes[(cursor||c.view.cursor).note].technique[(cursor||c.view.cursor).string])
      c.view.tablature.notes[(cursor||c.view.cursor).note].technique[(cursor||c.view.cursor).string] = {};
    if (!c.view.tablature.notes[(cursor||c.view.cursor).note].technique[(cursor||c.view.cursor).string][fingering])
      c.view.tablature.notes[(cursor||c.view.cursor).note].technique[(cursor||c.view.cursor).string][fingering] = [];
    if (!c.view.tablature.notes[(cursor||c.view.cursor).note].technique[(cursor||c.view.cursor).string][fingering][0])
      c.view.tablature.notes[(cursor||c.view.cursor).note].technique[(cursor||c.view.cursor).string][fingering].push(
        new Hammer()
      );
    (c.view.tablature.notes[(cursor||c.view.cursor).note].technique[(cursor||c.view.cursor).string][fingering][0] as Hammer).hammer = true;

    if (!c.view.tablature.notes[(cursor||c.view.cursor).note-1].strings[(cursor||c.view.cursor).string])
        this.addHammerOn({note:(cursor||c.view.cursor).note-1, string:(cursor||c.view.cursor).string} as any, c, $e);

  }
  keyboardActions = {
    "[0-9]":(ctrl:TablatureComponent, $event)=>{

      if (ctrl.view.tablature.notes.length-1 > ctrl.view.cursor.note) {
        var max1 = parseInt(ctrl.view.frets.toString()[0]), max2 = parseInt(ctrl.view.frets.toString()[1]);
        var asInt = parseInt($event.key);
        if (this.keyBuffer.length) {
          ctrl.view.notate(`${ctrl.keyBuffer[0].key}${$event.key}`);
          ctrl.keyBuffer = [];
        }
        else if (asInt && asInt <= max1) {
          this.keyBuffer.push($event);
          ctrl.view.notate(ctrl.mapKeyboard($event));
          ctrl.view.cursor.note --;
        }
        else {
          ctrl.view.notate(ctrl.mapKeyboard($event));
          ctrl.keyBuffer = [];
        }
      }
      else {
        ctrl.view.cursor.note++;
        ctrl.view.blankMeasure();
        ctrl.view.cursor.note--;
        ctrl.view.notate(ctrl.mapKeyboard($event));
        ctrl.tablature.grow.emit(this.view);
        ctrl.keyBuffer = [];
      }
    },
    "h":(c:TablatureComponent, $e)=>{
      c.addHammerOn(null, c, $e);
      this.keyBuffer = [];
    },
    "b":(c:TablatureComponent, $e)=>{
      this.keyBuffer.push("b");
    },
    "ArrowUp":(c:TablatureComponent, $e)=>{
      var fingering = c.view.tablature.notes[c.view.cursor.note].strings[c.view.cursor.string];
      if (this.keyBuffer[0] && this.keyBuffer[0] === "b" && fingering) {
        if (!c.view.tablature.notes[c.view.cursor.note].technique)
          c.view.tablature.notes[c.view.cursor.note].technique = {};
        if (!c.view.tablature.notes[c.view.cursor.note].technique[c.view.cursor.string])
          c.view.tablature.notes[c.view.cursor.note].technique[c.view.cursor.string] = {};
        if (!c.view.tablature.notes[c.view.cursor.note].technique[c.view.cursor.string][fingering])
          c.view.tablature.notes[c.view.cursor.note].technique[c.view.cursor.string][fingering] = [];
        if (!c.view.tablature.notes[c.view.cursor.note].technique[c.view.cursor.string][fingering][0])
          c.view.tablature.notes[c.view.cursor.note].technique[c.view.cursor.string][fingering].push(
            new Bend()
          );
        (c.view.tablature.notes[c.view.cursor.note].technique[c.view.cursor.string][fingering][0] as Bend).strength += 0.25; 
        console.log(c.view.tablature.notes[c.view.cursor.note].technique)
      } else c.view.cursor.string?c.view.cursor.string--:c.view.cursor.string;
      this.keyBuffer = [];
    },
    "ArrowDown":(c:TablatureComponent, $e)=>{
      c.view.cursor.string<c.view.tuning.length-1?c.view.cursor.string++:c.view.cursor.string;
      this.keyBuffer = [];
    },
    "ArrowLeft":(c:TablatureComponent, $e)=>{
      c.view.cursor.note?c.view.cursor.note --:c.view.cursor.note;
      this.keyBuffer = [];
    },
    "ArrowRight|Enter":(c:TablatureComponent, $e)=>{
      // if (c.view.tablature.notes.length - 1 > c.view.cursor.note) {
      //   this.view.blankMeasure();
      // }
      if (c.view.tablature.notes.length-1 > c.view.cursor.note)
        c.view.cursor.note++;
      else {
        c.view.cursor.note++;
        c.view.blankMeasure();
        c.tablature.grow.emit(this.view);
      }
      this.keyBuffer = [];
    },
    "Backspace":(c:TablatureComponent, $e)=>{
      // if (c.view.tablature.notes.length - 1 > c.view.cursor.note) {
      //   this.view.blankMeasure();
      // }
      //console.log('y')
      c.view.clear();
      this.keyBuffer = [];
    }
  }
  mapActions($event) {
    var actions = Object.keys(this.keyboardActions), m = 0;
    while (m < actions.length) {
      if (new RegExp(actions[m]).test($event.key))
        return this.keyboardActions[actions[m]](this, $event);
      m ++;
    }
  }
  handleKeyboard($event) {
    if (this.view.focused.name) return;
    //console.info($event);
    //this.keyBuffer.push($event);
    this.mapActions($event);
    //this.view.addNote(this.mapKeyboard($event));
  }
}
