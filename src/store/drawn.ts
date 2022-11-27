import { atom } from "nanostores";

export const drawn = atom<number[]>([]);

export function add(num: number) {
  drawn.set([num, ...drawn.get()]);
}

export function reset() {
  drawn.set([]);
}
