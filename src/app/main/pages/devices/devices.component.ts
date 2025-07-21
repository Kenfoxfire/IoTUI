import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Device } from '../../interfaces/device.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


export const ELEMENT_DATA: Device[] = [
  {
    userId: 'user_alpha_123',
    did: '1',
    name: 'Hydrogen Sensor',
    selected: false,
    templateId: 'tpl_1_chem',
    templateName: 'template 1',
    createdTime: new Date('2025-01-15T10:00:00Z'),
  },
  {
    userId: 'user_beta_456',
    did: '2',
    name: 'Helium Flowmeter',
    selected: true,
    templateId: 'tpl_1_chem',
    templateName: 'template 1',
    createdTime: new Date('2025-02-20T11:30:00Z'),
  },
  {
    userId: 'user_gamma_789',
    did: '3',
    name: 'Lithium Battery Monitor',
    selected: false,
    templateId: 'tpl_1_chem',
    templateName: 'template 1',
    createdTime: new Date('2025-03-05T14:15:00Z'),
  },
  {
    userId: 'user_delta_101',
    did: '4',
    name: 'Beryllium Analyzer',
    selected: false,
    templateId: 'tpl_1_chem',
    templateName: 'template 1',
    createdTime: new Date('2025-04-10T09:00:00Z'),
  },
  {
    userId: 'user_epsilon_112',
    did: '5',
    name: 'Boron Detector',
    selected: true,
    templateId: 'tpl_1_chem',
    templateName: 'template 1',
    createdTime: new Date('2025-05-22T16:45:00Z'),
  },
  {
    userId: 'user_zeta_131',
    did: '6',
    name: 'Carbon Monoxide Sensor',
    selected: false,
    templateId: 'tpl_1_chem',
    templateName: 'template 1',
    createdTime: new Date('2025-06-01T08:00:00Z'),
  },
  {
    userId: 'user_eta_141',
    did: '7',
    name: 'Nitrogen Purifier',
    selected: false,
    templateId: 'tpl_1_chem',
    templateName: 'template 1',
    createdTime: new Date('2025-07-03T13:00:00Z'),
  },
  {
    userId: 'user_theta_152',
    did: '8',
    name: 'Oxygen Level Monitor',
    selected: true,
    templateId: 'tpl_1_chem',
    templateName: 'template 1',
    createdTime: new Date('2025-07-10T10:00:00Z'),
  },
  {
    userId: 'user_iota_163',
    did: '9',
    name: 'Fluorine Leak Detector',
    selected: false,
    templateId: 'tpl_1_chem',
    templateName: 'template 1',
    createdTime: new Date('2025-07-11T09:00:00Z'),
  },
  {
    userId: 'user_kappa_174',
    did: '10',
    name: 'Neon Light Controller',
    selected: false,
    templateId: 'tpl_1_chem',
    templateName: 'template 1',
    createdTime: new Date('2025-07-11T12:00:00Z'),
  },
];

@Component({
  selector: 'app-devices',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButton, ReactiveFormsModule, MatTableModule, MatPaginatorModule, MatIconModule,
    MatTooltipModule, MatButtonModule, MatIconModule, MatSlideToggleModule, MatProgressSpinnerModule],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.scss'
})
export class DevicesComponent implements OnInit{
  ngOnInit(): void {
    this.loadDevicesData()
  }


  _snackBar: MatSnackBar = inject(MatSnackBar)

  onToggleChange(event: MatSlideToggleChange, device: Device): void {
    const newSelectedValue = event.checked;
    console.log(`Toggling device DID: ${device.did}, new state: ${newSelectedValue}`);

    const originalSelectedState = device.selected;

    // Optimistic UI Update
    device.selected = newSelectedValue;

    // Update the signal for the specific device's loading state
    this.isUpdatingToggle.update(currentStatus => ({
      ...currentStatus,
      [device.did]: true
    }));

    setTimeout(() => {
      console.log(`Backend actualizado con éxito para el dispositivo DID: ${device.did}. Valor: ${newSelectedValue}`);
      this._snackBar.open(`Estado del dispositivo ${device.name} actualizado a ${newSelectedValue ? 'Activo' : 'Inactivo'}`, 'Cerrar', { duration: 2000 });

      // Clear the signal for the specific device's loading state
      this.isUpdatingToggle.update(currentStatus => {
        const newStatus = { ...currentStatus };
        delete newStatus[device.did];
        return newStatus;
      });

      // --- Ejemplo de manejo de un error simulado (descomenta para probar el error) ---
      // const simulateError = Math.random() > 0.7; // 30% de probabilidad de error
      // if (simulateError) {
      //   console.error(`Error de backend simulado para el dispositivo DID: ${device.did}`);
      //   this._snackBar.open(`Fallo al actualizar ${device.name}. Por favor, inténtalo de nuevo.`, 'Cerrar', { duration: 3000 });
      //   device.selected = originalSelectedState; // Revertir UI en caso de error
      //   this.isUpdatingToggle.update(currentStatus => {
      //     const newStatus = { ...currentStatus };
      //     delete newStatus[device.did];
      //     return newStatus;
      //   });
      // } else {
      //   console.log(`Backend actualizado con éxito para el dispositivo DID: ${device.did}. Valor: ${newSelectedValue}`);
      //   this._snackBar.open(`Estado del dispositivo ${device.name} actualizado a ${newSelectedValue ? 'Activo' : 'Inactivo'}`, 'Cerrar', { duration: 2000 });
      //   this.isUpdatingToggle.update(currentStatus => {
      //     const newStatus = { ...currentStatus };
      //     delete newStatus[device.did];
      //     return newStatus;
      //   });
      // }

    }, 1500); // Simular retraso de red
  }
  deleteDevice(element: Device) {
    this.dataSource.data = this.dataSource.data.filter(i => i.did != element.did )
  }

  loadDevicesData() {
    this.isLoadingData.set(true); // Update signal value
    console.log('Simulating GET request to load devices...');
    setTimeout(() => {
      this.dataSource.data = ELEMENT_DATA;
      this.isLoadingData.set(false); // Update signal value
      console.log('Devices loaded:', this.dataSource.data);
    }, 1500);
  }

  // Using signals for loading states is a good practice in Angular 20+
  isLoadingData = signal(true); // Now a signal
  // For per-item loading, an object/Map is still common, but could also be a signal<Record<string, boolean>>
  isUpdatingToggle = signal<Record<string, boolean>>({}); // Now a signal

  displayedColumns: string[] = ['did', 'name', 'template', 'actions']
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  templates = ['template 1', 'template 2', 'template 3'];

  deviceForm = new FormGroup({
    did: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    template: new FormControl('', Validators.required)
  });

  submitForm() {
    console.log("guardadndo");

    const { did, name, template } = this.deviceForm.value as any
    if (this.deviceForm.valid) {
      this.dataSource.data = [...this.dataSource.data, { createdTime: new Date('2025-07-11T12:00:00Z'), did, name, selected: false, templateId: 'tpl_1_chem', templateName: template, userId: 'user_kappa_174' }];

    } else {
      console.log("tocados");

      this.deviceForm.markAllAsTouched();
    }
  }

}
