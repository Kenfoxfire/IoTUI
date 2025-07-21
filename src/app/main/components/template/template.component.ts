import { Component, input } from '@angular/core';
import { Template } from '../../interfaces/template.interface';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-template',
  imports: [JsonPipe],
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss'
})
export class TemplateComponent {

  public template = input<Template>() // This expects an array

}
