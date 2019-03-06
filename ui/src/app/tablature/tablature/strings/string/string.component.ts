import { Component, OnInit, Input, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { TablatureView, NOTE, Chord, Hammer, TablatureCursor } from 'src/app/ui/tablature/tablature.model';

@Component({
  selector: 'app-string',
  templateUrl: './string.component.html',
  styleUrls: ['./string.component.scss']
  ,changeDetection: ChangeDetectionStrategy.OnPush
})
export class StringComponent implements OnInit {

  constructor(
    private element:ElementRef,
    private cd:ChangeDetectorRef
  ) { }

  @Input() view: TablatureView;
  @Input() name: string;
  @Input() number: number;
  @Input() from:number;
  @Input() to:number;
  @Input() lineLabel:string = 'tab';
  options = TablatureView.options;
  get activeBubbleStyle() {
    var bounds = (this.view.note.width>=this.view.note.height?this.view.note.width:this.view.note.height),
    bubble = bounds * 0.75, offset = (bounds * 0.25) - 2;
    return {
        width: (bubble)+this.view.page.units,
        height: (bubble)+this.view.page.units,
        top:0+this.view.page.units,
        left:2+this.view.page.units,
        'border-radius':(bubble)+this.view.page.units
    }
  }
  NOTE = NOTE;
  ngOnInit() {
    //console.log(this.element)
    this.element.nativeElement.style.height = this.view.note.height+this.view.page.units;
  }
  heat(n, s) {
    this.view.hot?this.view.hot.note = n+this.from:null;
    this.view.hot?this.view.hot.string=s:null;
  }
  cool(n, s) {
    console.log('x');
    //this.view.hot = new TablatureCursor();
    // this.view.hot = {
    //   note:0,
    //   string:0
    // } as any;
    this.cd.detectChanges();
  }
  hammerFrom(noteIndex:number, stringNo:number) {
    if (this.view.tablature.notes[noteIndex+1] && this.view.tablature.notes[noteIndex+1].technique) {
    //console.log(this.view.tablature.notes[noteIndex+1].technique[stringNo][fingering][0] )
      var fingering = this.view.tablature.notes[noteIndex+1].strings[stringNo];
      if (this.view.tablature.notes[noteIndex+1].technique && this.view.tablature.notes[noteIndex+1].technique[stringNo] &&
        (this.view.tablature.notes[noteIndex+1].technique[stringNo][fingering][0] as Hammer).hammer)
          return true;
    }
    return false
  }
}
