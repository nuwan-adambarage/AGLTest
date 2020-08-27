import { Pet } from './pet.model';

export interface People{
    id: string;
    name: string;
    gender: string;
    age: string;
    
    pets?: Pet[];
}