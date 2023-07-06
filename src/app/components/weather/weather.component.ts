import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { faCloudSun } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  currentTime: number = new Date().getTime();
  ngOnInit(): void {
    setInterval(
    ()=>{ this.currentTime = new Date().getTime();},
    5000
    )
  }


}
