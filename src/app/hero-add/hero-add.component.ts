import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Hero } from '../models/Hero';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-hero-add',
  templateUrl: './hero-add.component.html',
  styleUrls: ['./hero-add.component.scss']
})
export class HeroAddComponent implements OnInit {

  heroes: Hero[] = [];
  @Output() newItemEvent = new EventEmitter<string>();

  constructor(
    private heroService: HeroService,
  ) { }

  ngOnInit(): void {
    this.heroService.getHeroes().subscribe((heroes: Hero[]) => {
      this.heroes=heroes; 
    });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {this.newItemEvent.emit(`${name}`)});
    }

}
