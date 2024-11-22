import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'labrador' })
export class LabradorPipe implements PipeTransform {
  transform(value: string): string {
    return `<span class="labrador">${value}</span>`;
  }
}



@Pipe({ name: 'poedel' })
export class PoedelPipe implements PipeTransform {
  transform(value: string): string {
    return `<span class="poedel">${value}</span>`;
  }
}



@Pipe({ name: 'parkiet' })
export class ParkietPipe implements PipeTransform {
  transform(value: string): string {
    return value.split(' ').map(word => `<span>${word}</span>`).join(' ');
  }
}

@Pipe({ name: 'papegaai' })
export class PapegaaiPipe implements PipeTransform {
  transform(value: string): string {
    return value.split(' ').map((word, index) => {
      const colors = ['red', 'green', 'yellow', 'blue'];
      return `<span style="color: ${colors[index % 4]}">${word}</span>`;
    }).join(' ');
  }
}