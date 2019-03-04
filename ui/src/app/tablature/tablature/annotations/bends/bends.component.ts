import { Component, OnInit, Input } from '@angular/core';
import { TablatureView } from 'src/app/ui/tablature/tablature.model';

@Component({
  selector: 'app-bends',
  templateUrl: './bends.component.html',
  styleUrls: ['./bends.component.scss']
})
export class BendsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() view:TablatureView;
  @Input() from:number;
  @Input() to:number;
}
