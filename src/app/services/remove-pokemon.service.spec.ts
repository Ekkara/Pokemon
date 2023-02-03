import { TestBed } from '@angular/core/testing';

import { RemovePokemonService } from './remove-pokemon.service';

describe('RemovePokemonService', () => {
  let service: RemovePokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemovePokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
