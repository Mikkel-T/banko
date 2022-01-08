import { atom } from 'nanostores';

export const drawn = atom<Number[]>([]);

export function add(num: Number) {
  drawn.set([num, ...drawn.get()]);
}

export function reset() {
  drawn.set([]);
}
