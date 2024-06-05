import { BaseEntity } from './base-entity';

export interface User  extends BaseEntity {
    id: number;
    userName: string;
    email: string;
    phoneNumber1: string;
    phoneNumber2: string;
    phoneVerified:number;
    emailVerified:number;
    password: string;
}
