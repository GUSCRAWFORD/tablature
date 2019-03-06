import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { TablatureView, Chord } from 'src/app/ui/tablature/tablature.model';
import { TablatureService } from 'src/app/ui/tablature/tablature.service';

@Component({
  selector: 'app-strings',
  templateUrl: './strings.component.html',
  styleUrls: ['./strings.component.scss']
  //,changeDetection: ChangeDetectionStrategy.OnPush
})
export class StringsComponent implements OnInit {

  constructor(
    private tablature:TablatureService
  ) { }

  @Input() view:TablatureView
  lines = {
    pushing:0,
    hash:{},
    notesPer:0
  };
  get lineKeys () {
    return Object.keys(this.lines.hash);
  }
  lineKeyAsIndex(lineKey:string) { return parseInt(lineKey) }
  options = TablatureView.options;
  ngOnInit() {
    this.floatLines();
    this.tablature.grow.subscribe(view=>{
      this.floatLines();
    })
  }
  floatLines() {
    var notesPerLineLimit = parseInt((this.view.page.width / this.view.note.width).toString());
    var measuresPerLine = parseInt((notesPerLineLimit / this.view.signature.notes).toString()) ;
    var notesPerLine = this.lines.notesPer = measuresPerLine * this.view.signature.notes, notesToPush;
    this.view.page.notesPerLine = notesPerLine;
    //console.log(notesPerLine);
    while (this.lines.pushing < this.view.tablature.notes.length) {
      notesToPush = this.view.tablature.notes.slice(this.lines.pushing, this.lines.pushing+notesPerLine);
      this.lines.hash[this.lines.pushing] = notesToPush;
      this.lines.pushing = this.lines.pushing+notesPerLine;
    }
    if (this.lines.pushing > this.view.cursor.note) this.lines.pushing -= notesPerLine;
    //console.log(this.lines);
  }

}
