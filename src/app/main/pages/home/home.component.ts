import { Component, signal } from '@angular/core';
import { Template } from '../../interfaces/template.interface';
import { TemplateComponent } from '../../components/template/template.component';
import { IndicatorWidgetComponent } from '../../components/widgets/indicator-widget/indicator-widget.component';

@Component({
  selector: 'app-home',
  imports: [TemplateComponent, IndicatorWidgetComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


  templates = signal< Template[]>([

    {
      createdTime: new Date(),
      description: "descripcion x ",
      name: "Template 1",
      userId: "ken111",
      widgets: [
        {
          userId: "ken111",
        did: "11111",
        name: "Arduino",
        selected: false,
        createdTime: new Date()
      }
      ]
    },
    {
      createdTime: new Date(),
      description: "descripcion x ",
      name: "Template 2",
      userId: "ken222",
      widgets: [
        {
          userId: "ken222",
        did: "22222",
        name: "SparkFun board",
        selected: false,
        createdTime: new Date()
      }
      ]
    },
    {
      createdTime: new Date(),
      description: "descripcion x ",
      name: "Template 3",
      userId: "ken333",
      widgets: [
        {
          userId: "ken333",
        did: "33333",
        name: "Raspberry pi",
        selected: true,
        createdTime: new Date()
      }
      ]
    },

  ])

}
