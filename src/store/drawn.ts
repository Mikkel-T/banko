import { atom } from "nanostores";

export const drawn = atom<number[]>([]);

export function draw() {
  const d = drawn.get();
  const nums = Array.from({ length: 90 }, (_, i) => i + 1).filter(
    (i) => !d.includes(i)
  );

  if (nums.length > 0) {
    //@ts-expect-error The picked index will be available due to the length of nums being used to calculate it
    add(nums[Math.floor(Math.random() * nums.length)]);
  }
}

export function add(num: number) {
  drawn.set([num, ...drawn.get()]);
}

export function reset() {
  drawn.set([]);
}
