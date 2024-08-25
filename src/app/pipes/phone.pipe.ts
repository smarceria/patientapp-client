import { Pipe, PipeTransform } from '@angular/core';

const formatPhoneNumber = (phoneNumber: string): string => {
  // Remove non-numeric characters
  phoneNumber = phoneNumber.replace(/\D/g, '');

  // Check for country code (optional)
  if (phoneNumber.length > 10) {
    // Extract country code
    const countryCode = phoneNumber.slice(0, -10);
    phoneNumber = phoneNumber.slice(-10);

    // Format with country code
    let formatted = `+${countryCode}`;
    formatted += ` ${phoneNumber.slice(0, 3)}`;
    formatted += `-${phoneNumber.slice(3, 6)}`;
    formatted += `-${phoneNumber.slice(6)}`;

    return formatted;
  } else {
    // Format without country code
    let formatted = `${phoneNumber.slice(0, 3)}`;
    formatted += `-${phoneNumber.slice(3, 6)}`;
    formatted += `-${phoneNumber.slice(6)}`;

    return formatted;
  }
};

@Pipe({
  name: 'phone',
  standalone: true,
})
export class PhonePipe implements PipeTransform {
  transform(value: string): string {
    return formatPhoneNumber(value);
  }
}
