import { Component, OnInit } from '@angular/core';
import { DatastoreService} from '../services/datastore.service';

@Component({
  selector: 'app-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.css']
})
export class RealtimeComponent implements OnInit {
  data = [{name: 'star', orders: 400}, {name: 'rain', orders: 500}, {name: 'naix', orders: 500}, {name: 'droop', orders: 270}];
  tabledata: any;
  constructor(private datastore: DatastoreService) { }

  ngOnInit() {
  }

  getAnual() {
    this.datastore.getAnual().subscribe(data => {
      console.log(data);
      this.tabledata = data;});
  }
  onClick(value: string) {
    if (value === 'daily') {

    } else {
      this.getAnual();
    }
  }

}
