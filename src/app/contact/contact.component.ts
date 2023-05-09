import {Component, OnInit} from '@angular/core';
import {faEnvelopeOpen, faMapLocation, faPhone} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{

  faPhone = faPhone;
  faEnvelope = faEnvelopeOpen;
  faMapLocation = faMapLocation;
  constructor() {
  }


  ngOnInit(): void {
  }

}
