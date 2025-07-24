import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BackendService } from 'src/app/services/backend/backend.service';
import { UserService } from 'src/app/services/user/user.service';
import { TOOLTIP_MESSAGE } from 'src/app/tooltip-message';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnChanges{

 
  @Input() buttonName: string | any;
  @Input() buttonType: string | any;
  @Input() metaOptions: any;
  @Input() selecte_auto_interval: any;
  @Input() userId: any;

  @Output() btnClickEmt: EventEmitter<string> = new EventEmitter<string>();
  @Output() onMenuOption: EventEmitter<string> = new EventEmitter<string>();
  @Output() autoRefreshValue: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private backend: BackendService,
    private userService: UserService
  ) { }

  onBtnClick() {
    this.btnClickEmt.emit();
  }

  getToolTipMessageForActionButtons(name: any) {
    return TOOLTIP_MESSAGE.ACTION_BUTTONS[name];
  }

  onMenuOptionBtnClick(data: any, index: number) {
    // console.log("ooMenuOptionBtnClick", data, index);
    this.metaOptions.splice(index, 1);
    this.onMenuOption.emit(data);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['metaOptions']) {
    }
  }

  onAutoRefreshButtonClicked(event: any) {
    // const self = this;
    // const autoRefreshValue = {
    //   "_id": self.userId,
    //   "userPreference": {
    //     "eventAutoRefershTime": event.target.value
    //   }
    // };
    // self.backend.editUserProfile(autoRefreshValue).subscribe((response: any) => {
    //   self.userService.getCurrentUser().then((data: any)=>{
    //     this.autoRefreshValue.emit(event.target.value);
    //   }).catch((err:any)=>{
    //     console.log("err", err);
    //   });      
    // }, (error: any) => {
    //   console.log("error", error);
    // });
   
  }
  
  getButtonClass() {
    switch (this.buttonType) {
      case 'filter':
        return 'syrn-button-class';
      case 'highlight-filter':
        return 'highlight-filter-button';
      default:
        return '';
    }
  }


}
