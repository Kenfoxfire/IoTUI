import { Component, inject, OnInit, signal, ViewChild, AfterViewInit } from '@angular/core';
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
export class DevicesComponent implements OnInit, AfterViewInit { // Implement AfterViewInit

  _snackBar: MatSnackBar = inject(MatSnackBar)

  // Usando signals para los estados de carga es una buena práctica en Angular 20+
  isLoadingData = signal(true); // Ahora es un signal
  isUpdatingToggle = signal<Record<string, boolean>>({}); // Ahora es un signal

  displayedColumns: string[] = ['did', 'name', 'template', 'actions']
  dataSource = new MatTableDataSource<Device>([]); // Inicializa con un array vacío

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // ngOnInit se usa para inicializar data
  ngOnInit(): void {
    this.loadDevicesData();
  }

  // ngAfterViewInit se usa para interacciones con ViewChild
  ngAfterViewInit() {
    // Aseguramos que el paginador esté disponible antes de asignarlo
    // Esto es crucial para cuando la data se carga inicialmente
    this.dataSource.paginator = this.paginator;
  }

  onToggleChange(event: MatSlideToggleChange, device: Device): void {
    const newSelectedValue = event.checked;
    console.log(`Toggling device DID: ${device.did}, new state: ${newSelectedValue}`);

    const originalSelectedState = device.selected;

    // Optimistic UI Update
    device.selected = newSelectedValue;

    // Actualiza la señal para el estado de carga del dispositivo específico
    this.isUpdatingToggle.update(currentStatus => ({
      ...currentStatus,
      [device.did]: true
    }));

    setTimeout(() => {
      console.log(`Backend actualizado con éxito para el dispositivo DID: ${device.did}. Valor: ${newSelectedValue}`);
      this._snackBar.open(`Estado del dispositivo ${device.name} actualizado a ${newSelectedValue ? 'Activo' : 'Inactivo'}`, 'Cerrar', { duration: 2000 });

      // Limpia la señal para el estado de carga del dispositivo específico
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
    this.dataSource.data = this.dataSource.data.filter(i => i.did != element.did)
    // Opcional: Ir a la primera página después de eliminar para evitar páginas vacías
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadDevicesData() {
    this.isLoadingData.set(true); // Actualiza el valor del signal
    console.log('Simulando solicitud GET para cargar dispositivos...');
    setTimeout(() => {
      this.dataSource.data = ELEMENT_DATA;
      this.isLoadingData.set(false); // Actualiza el valor del signal
      console.log('Dispositivos cargados:', this.dataSource.data);
    }, 1500);
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
      this.dataSource.data = [...this.dataSource.data, { createdTime: new Date(), did, name, selected: false, templateId: 'tpl_new', templateName: template, userId: 'user_new' }];
      // Opcional: Ir a la última página después de añadir un nuevo dispositivo
      if (this.dataSource.paginator) {
        this.dataSource.paginator.lastPage();
      }
      this.deviceForm.reset(); // Limpiar el formulario
      Object.keys(this.deviceForm.controls).forEach(key => {
        this.deviceForm.get(key)?.setErrors(null);
      });
    } else {
      console.log("tocados");
      this.deviceForm.markAllAsTouched();
    }
  }
}