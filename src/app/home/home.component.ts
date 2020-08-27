import { Component, OnInit } from '@angular/core';

import { RepositoryService } from './../shared/services/repository.service';
import { People } from './../_interface/people.model';
import { Pet } from '../_interface/pet.model';
import { Types } from './../classes/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private repository: RepositoryService) { }
    public peopleAndPets: People[];
    public catsOfMales: Pet[] = [];
    public catsOfFemale: Pet[] = [];

  ngOnInit(): void {
    this.getAllPeople();
  }

  private getAllPeople = () => {
    let apiAddress = 'people.json';
    this.repository.getData(apiAddress)
      .subscribe(res => {
        this.peopleAndPets = res as People[];  
        
        for(let person of this.peopleAndPets)
        {
          if(person.gender == Types.genderMale && person.pets != null && person.pets.length > 0){
            for(let pet of person.pets){
              if(pet.type == Types.petCat)
                this.catsOfMales.push(pet);
            } 
          }
          else if(person.gender == Types.genderFemale && person.pets != null && person.pets.length > 0){
            for(let pet of person.pets){
              if(pet.type == Types.petCat)
                this.catsOfFemale.push(pet);
            } 
          }
         }
         
        this.catsOfMales.sort((a,b) => a.name.localeCompare(b.name));
        this.catsOfFemale.sort((a,b) => a.name.localeCompare(b.name));
      })
  }

}
