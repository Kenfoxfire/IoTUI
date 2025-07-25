import { Component, signal } from '@angular/core';
import { Template } from '../../interfaces/template.interface';
import { IndicatorWidgetComponent } from '../../components/widgets/indicator-widget/indicator-widget.component';
import { MatCardModule } from "@angular/material/card";
import { ButtonWidgetComponent } from "../../components/widgets/button-widget/button-widget.component";
import { SwitchWidgetComponent } from "../../components/widgets/switch-widget/switch-widget.component";

@Component({
  selector: 'app-home',
  imports: [MatCardModule, ButtonWidgetComponent, SwitchWidgetComponent, IndicatorWidgetComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  currentDashboard = {
    widgets: [
      { type: 'button', variableFullName: 'variable1', message: 'Click Me', text: 'Button 1', icon: 'icon1', class: 'class1', column: 'col-3' },
      { type: 'switch', variableFullName: 'variable2', icon: 'icon2', class: 'class2', column: 'col-6' },
      { type: 'indicator', variableFullName: 'variable3', icon: 'icon3', variableSendFreq: 5000, class: 'class3', column: 'col-12' },
    ]
  }
}
