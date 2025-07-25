import { Component, inject, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IndicatorWidgetComponent } from "../../components/widgets/indicator-widget/indicator-widget.component";
import { ButtonWidgetComponent } from "../../components/widgets/button-widget/button-widget.component";
import { SwitchWidgetComponent } from "../../components/widgets/switch-widget/switch-widget.component";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-templates',
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatCardModule, MatSelectModule, FormsModule, MatFormFieldModule, MatInputModule, IndicatorWidgetComponent, ButtonWidgetComponent, SwitchWidgetComponent, ReactiveFormsModule],
  templateUrl: './templates.component.html',
  styleUrl: './templates.component.scss'
})
export class TemplatesComponent {

saveTemplate() {

    const newTemplate = {
      name: this.templateForm.value.name,
      description: this.templateForm.value.description,
      widgets: [...this.currentDashboardTemplate.widgets]
    };
    this.dashboardsTemplateList = [...this.dashboardsTemplateList, newTemplate];
    this.templateForm.reset();
    this.currentDashboardTemplate.widgets = [];
}
  removeWidget(index: number) {
    this.currentDashboardTemplate.widgets.splice(index, 1);
  }
  getWidgetTypes(element: any): string {
    return element.widgets.map((widget: any) => widget.type).join(', ');
  }
  removeTemplate(template: any) {
    const index = this.dashboardsTemplateList.indexOf(template);
    if (index > -1) {
      this.dashboardsTemplateList.splice(index, 1);
      // Si estás usando dataSource como MatTableDataSource, refresca:
      this.dashboardsTemplateList = [...this.dashboardsTemplateList];
    }
  }

  dashboardsTemplateList = [
    {
      name: 'Dashboard 1',
      description: 'Description 1',
      widgets: [{ type: 'button', variableFullName: 'variable1', message: 'Click Me', text: 'Button 1', icon: 'icon1', class: 'class1', column: 'col-3' },
      { type: 'switch', variableFullName: 'variable2', icon: 'icon2', class: 'class2', column: 'col-6' },
      { type: 'indicator', variableFullName: 'variable3', icon: 'icon3', variableSendFreq: 5000, class: 'class3', column: 'col-12' },]
    },
  ]

  currentDashboardTemplate = {
    widgets: [
      { type: 'button', variableFullName: 'variable1', message: 'Click Me', text: 'Button 1', icon: 'icon1', class: 'class1', column: 'col-3' },
      { type: 'switch', variableFullName: 'variable2', icon: 'icon2', class: 'class2', column: 'col-6' },
      { type: 'indicator', variableFullName: 'variable3', icon: 'icon3', variableSendFreq: 5000, class: 'class3', column: 'col-12' },
    ]
  }

  fb = inject(FormBuilder);

  selected = signal<'button' | 'switch' | 'indicator'>('button');

  widgets = [
    { value: 'button', viewValue: 'IotButton' },
    { value: 'switch', viewValue: 'IotSwitch' },
    { value: 'indicator', viewValue: 'IotIndicator' }
  ];
  // Formulario principal (reconstruido según widget seleccionado)
  form = signal<FormGroup>(this.buildButtonForm());

  // Actualiza el formulario cuando se cambia el tipo de widget
  onWidgetChange(type: 'button' | 'switch' | 'indicator') {
    this.selected.set(type);
    switch (type) {
      case 'button':
        this.form.set(this.buildButtonForm());
        break;
      case 'switch':
        this.form.set(this.buildSwitchForm());
        break;
      case 'indicator':
        this.form.set(this.buildIndicatorForm());
        break;
    }
  }

  buildButtonForm(): FormGroup {
    return this.fb.group({
      variableFullName: [''],
      message: [''],
      text: [''],
      icon: [''],
      class: [''],
      column: ['']
    });
  }

  buildSwitchForm(): FormGroup {
    return this.fb.group({
      variableFullName: [''],
      icon: [''],
      class: [''],
      column: ['']
    });
  }

  buildIndicatorForm(): FormGroup {
    return this.fb.group({
      variableFullName: [''],
      icon: [''],
      variableSendFreq: [''],
      class: [''],
      column: ['']
    });
  }

  onSubmit() {
    console.log("Formulario enviado:", this.form().value);
    this.currentDashboardTemplate.widgets.push({
      type: this.selected(),
      ...this.form().value
    });
  }
  templateForm: FormGroup<any> = this.fb.group({
    name: [''],
    description: ['']
  });

  displayedColumns: string[] = ['Name', 'Description', 'Widgets', 'Actions'];
  

}
