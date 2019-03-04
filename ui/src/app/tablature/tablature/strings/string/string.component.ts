import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { TablatureView, NOTE } from 'src/app/ui/tablature/tablature.model';

@Component({
  selector: 'app-string',
  templateUrl: './string.component.html',
  styleUrls: ['./string.component.scss']
})
export class StringComponent implements OnInit {

  constructor(
    private element:ElementRef
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
      left:0+this.view.page.units,
      'border-radius':(bubble)+this.view.page.units
  }
  }
  NOTE = NOTE;
  ngOnInit() {
    //console.log(this.element)
    this.element.nativeElement.style.height = this.view.note.height+this.view.page.units;
  }

}
