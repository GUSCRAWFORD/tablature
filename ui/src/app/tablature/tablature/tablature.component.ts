import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TablatureService } from 'src/app/ui/tablature/tablature.service';
import { TablatureView } from 'src/app/ui/tablature/tablature.model';
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
    "ArrowUp":(c:TablatureComponent, $e)=>{
      c.view.cursor.string?c.view.cursor.string--:c.view.cursor.string;
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
