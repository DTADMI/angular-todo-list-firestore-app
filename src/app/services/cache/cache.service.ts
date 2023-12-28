import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private cache: Map<string, any> = new Map()

  put(url: string, response: any){
    this.cache.set(url, response);
  }

  get(url: string): any{
    return this.cache.get(url);
  }

  clear() {
    this.cache.clear();
  }
}
