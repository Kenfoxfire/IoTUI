import { Component } from '@angular/core';
import { MatCardSubtitle, MatCardModule } from "@angular/material/card";
import { MatSlideToggleChange, MatSlideToggleModule } from "@angular/material/slide-toggle";

@Component({
  selector: 'app-switch-widget',
  imports: [MatCardSubtitle, MatCardModule, MatSlideToggleModule],
  templateUrl: './switch-widget.component.html',
  styleUrl: './switch-widget.component.scss'
})
export class SwitchWidgetComponent {
  onToggleChange($event: MatSlideToggleChange) {
    console.log($event);

  }
  isUpdating() {
    console.log();

  }

  data = {
    value: false,
    config: {
      userId: "user id ",
      selectedDevice: {
        name: "home",
        dId: "8888",
        templateName: "Power Sensor",
        templateId: "8723894623",
        saverRule: false
      },
      variableFullname: "Pump",
      variable: "uniquestr",
      icon: "fa-sun",
      column: "col-6",
      widget: "indicator",
      class: "danger"
    }
  }
}
