import { describe, it, expect, beforeEach } from 'vitest';
import JaratKezelo from '../JaratKezelo';

describe('JaratKezelo', () => {
  let jaratKezelo;

  beforeEach(() => {
    jaratKezelo = new JaratKezelo();
  });

  it('Hozzáad egy új járatot', () => {
    jaratKezelo.ujJarat('A123', 'BUD', 'JFK', new Date());
    expect(jaratKezelo.jaratok.has('A123')).toBe(true);
  });

  it('Már létezik ilyen járatszám', () => {
    jaratKezelo.ujJarat('A123', 'BUD', 'JFK', new Date());
    expect(() => jaratKezelo.ujJarat('A123', 'BUD', 'JFK', new Date())).toThrow(Error);
  });

  it('Hozzáadja a kését a megadott járathoz', () => {
    jaratKezelo.ujJarat('A123', 'BUD', 'JFK', new Date());
    jaratKezelo.keses('A123', 30);
    expect(jaratKezelo.jaratok.get('A123').keses).toBe(30);
  });

  it('Hibát dob negatív késénél', () => {
    jaratKezelo.ujJarat('A123', 'BUD', 'JFK', new Date());
    expect(() => jaratKezelo.keses('A123', -10)).toThrow('NegativKesesException');
  });

  it('Késéssel adja vissza az indulási időt', () => {
    const now = new Date();
    jaratKezelo.ujJarat('A123', 'BUD', 'JFK', now);
    jaratKezelo.keses('A123', 30);
    const newIndulas = new Date(now);
    newIndulas.setMinutes(now.getMinutes() + 30);
    expect(jaratKezelo.mikorIndul('A123')).toEqual(newIndulas);
  });

  it('Felsorolja az adott repülőtérről induló járatokat', () => {
    jaratKezelo.ujJarat('A123', 'BUD', 'JFK', new Date());
    jaratKezelo.ujJarat('B456', 'BUD', 'LAX', new Date());
    jaratKezelo.ujJarat('C789', 'JFK', 'BUD', new Date());
    expect(jaratKezelo.jaratokRepuloterrol('BUD')).toEqual(['A123', 'B456']);
  });
});
