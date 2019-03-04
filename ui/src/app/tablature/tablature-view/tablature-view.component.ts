import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TablatureService} from 'src/app/ui/tablature/tablature.service';
import { TablatureView } from 'src/app/ui/tablature/tablature.model';

@Component({
  selector: 'app-tablature-view',
  templateUrl: './tablature-view.component.html',
  styleUrls: ['./tablature-view.component.scss']
})
export class TablatureViewComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private tablature:TablatureService
  ) { }
  view:TablatureView;
  ngOnInit() {
    this.route.params.subscribe(
      newRouteParams=>{
        if (newRouteParams.name) {
          this.view = this.tablature.view[newRouteParams.name] || (this.tablature.view[newRouteParams.name] = new TablatureView()); // || couldn't find the tab...
        }
        else this.view = new TablatureView();
      }
    )
  }

}
