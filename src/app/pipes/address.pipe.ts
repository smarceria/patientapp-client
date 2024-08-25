import { Pipe, PipeTransform } from '@angular/core';
import { AustralianAddress } from '../models/australian-address';

@Pipe({
  name: 'address',
  standalone: true,
})
export class AddressPipe implements PipeTransform {
  transform(value: AustralianAddress | null | undefined): string {
    if (value) {
      return `${value.address}, ${value.suburb}, ${value.state}, ${value.postcode}`;
    }
    return '';
  }
}
