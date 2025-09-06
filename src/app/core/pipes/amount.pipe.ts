import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amount',
})
export class AmountPipe implements PipeTransform {
  transform(value: any) {
    if (!value) return '0';
    return value.toLocaleString('en-IN');
  }
}
