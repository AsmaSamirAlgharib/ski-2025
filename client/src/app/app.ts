import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./layout/header/header";
import { HttpClient } from '@angular/common/http';
import { Product } from './shared/models/product';
import { Pagination } from './shared/pagination';
import { Shop } from "./features/shop/shop";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Shop],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'Skinet';
}
