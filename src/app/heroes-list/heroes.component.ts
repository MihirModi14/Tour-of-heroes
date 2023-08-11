import { Component, OnInit } from '@angular/core';
import { Hero } from '../models/Hero';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };
  heroes: Hero[] = [];

  constructor(
    private heroService: HeroService,
  ) { 
  }

  ngOnInit(): void {
    this.heroService.getHeroes().subscribe((heroes: Hero[]) => {
      this.heroes=heroes;
    });
  }

  // selectedHero?: Hero;
  // onSelect(hero: Hero): void {
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  //   this.selectedHero = hero;
  // }

  delete(hero: Hero): void {
    this.heroService.deleteHero(hero.id).subscribe(()=>{
      this.heroes = this.heroes.filter(h => h !== hero);
    });
  }

  addData(hero: string): void {
    const data = {
      id: this.genId(this.heroes),
      name: hero
    } as Hero;
    this.heroes.push(data);
  }

  genId(heroes: Hero[]): number {
    return Math.max(...heroes.map(hero => hero.id)) + 1;
  }

}