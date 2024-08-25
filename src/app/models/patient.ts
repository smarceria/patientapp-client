import { AustralianAddress } from './australian-address';

export class Patient {
  id: number | undefined;

  pid: string | undefined;

  firstName!: string;

  lastName: string | undefined;

  dateOfBirth: Date | string | undefined;

  gender: string | undefined;

  address: AustralianAddress | undefined;

  phoneNo!: string;
}
