import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {DataService} from "../data.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  carousels = [
    {
      name: 'Ethan Davis',
      image: 'https://images.unsplash.com/photo-1549055244-3ba3f5a6e252?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      active: true,
    },
    {
      name: 'Michael Johnson',
      image: 'https://images.unsplash.com/photo-1575707751065-42256084fbb7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      active: false,
    },
    {
      name: 'Alexander Lee',
      image: 'https://images.unsplash.com/photo-1583812140784-2cc89fff7097?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      active: false,
    }
  ];

  form = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    name: new FormControl(null, [Validators.minLength(3), Validators.required]),
    phone_number: new FormControl(null, [Validators.maxLength(14), Validators.required]),
    event: new FormControl(null, [Validators.required]),
  });

  get nameControl() {
    return this.form.controls['name'];
  }

  get phoneNumberControls() {
    return this.form.controls['phone_number'];
  }


  getPhoneNumberValue() {
    return this.phoneNumberControls.value || '';
  }

  selected = false;

  validate(): boolean {
    return this.getPhoneNumberValue().startsWith('08');
  }

  constructor(
    private dataService: DataService,
    private toastrService: ToastrService,
    private ref: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    setInterval(() => {
      this.onClickNext();
    }, 5000);
  }

  onSubmitForm(): void {
    this.dataService.register(this.form.value)
      .subscribe(res => {
        this.form.reset();
        this.toastrService.success('Successful Registration', 'Thank You!', {
          timeOut: 3000,
        });
        this.ref.detectChanges();
        console.log(res);
      });
  }

  onClickPrevious(): void {
    const active = this.carousels.findIndex(i => i.active);
    const previousIndex = this.carousels[active - 1];
    this.carousels[active].active = false;
    if (!previousIndex) {
      this.carousels[this.carousels.length - 1].active = true;
      this.ref.detectChanges();
      return;
    }

    this.carousels[active - 1].active = true;
    this.ref.detectChanges();
  }

  getSpeakerName() {
    return this.carousels.find(i => i.active)?.name;
  }

  onClickNext(): void {
    const active = this.carousels.findIndex(i => i.active);
    const nextIndex = this.carousels[active + 1];
    this.carousels[active].active = false;
    if (!nextIndex) {
      this.carousels[0].active = true;
      this.ref.detectChanges();
      return;
    }

    this.carousels[active + 1].active = true;
    this.ref.detectChanges();
  }


}
