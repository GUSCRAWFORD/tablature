import { Component, OnInit, Input } from '@angular/core';
import { TablatureView, Chord } from 'src/app/ui/tablature/tablature.model';

@Component({
  selector: 'app-bends',
  templateUrl: './bends.component.html',
  styleUrls: ['./bends.component.scss']
})
export class BendsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  keys (x) { return !x?[]:Object.keys(x) }
  annotationHeight(string:string, bendSeries:number) {
    var asInt = parseInt(string);
    if (isNaN(asInt)) return 0;
    return ((asInt+.4+bendSeries) * this.view.note.height)+this.view.page.units;
  }
  @Input() view:TablatureView;
  @Input() from:number;
  @Input() to:number;
}
