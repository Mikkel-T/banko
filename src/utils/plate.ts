import { get_seed } from "@utils";
import { prng_alea } from "esm-seedrandom";

type PlateRows<T> = [
  [T, T, T, T, T, T, T, T, T],
  [T, T, T, T, T, T, T, T, T],
  [T, T, T, T, T, T, T, T, T]
];

export class Plate {
  /**
   * The rows of the plate
   */
  readonly rows: PlateRows<number>;

  /**
   * The current state of the plate
   */
  state: PlateRows<{
    has_number: boolean;
    number?: number;
    picked?: boolean;
  }>;

  seed: number;

  /**
   * Generate a plate, either randomly or with a provided seed
   */
  constructor(seed?: number) {
    if (!seed) {
      this.seed = get_seed();
    } else {
      this.seed = seed;
    }

    const rng = prng_alea(this.seed);

    /**
     * The rows of the plate itself
     */
    const rows: PlateRows<number> = new_plate(NaN);

    /**
     * An array of the numbers that have been selected
     */
    const numbers: number[] = [];

    /**
     * A list of the ranges for the different columns on the plate
     */
    const ranges = [
      Array.from({ length: 9 }, (_, i) => i + 1),
      Array.from({ length: 10 }, (_, i) => i + 10),
      Array.from({ length: 10 }, (_, i) => i + 20),
      Array.from({ length: 10 }, (_, i) => i + 30),
      Array.from({ length: 10 }, (_, i) => i + 40),
      Array.from({ length: 10 }, (_, i) => i + 50),
      Array.from({ length: 10 }, (_, i) => i + 60),
      Array.from({ length: 10 }, (_, i) => i + 70),
      Array.from({ length: 11 }, (_, i) => i + 80),
    ];

    // Array.from({length: 4}, (_, i) => i + 1

    // Start by populating the numbers array with one number from each range
    ranges.forEach((range) => {
      numbers.push(range[Math.floor(rng() * range.length)]);
    });

    // Keep adding numbers to the numbers array until there are 15
    while (numbers.length < 15) {
      const num = Math.floor(1 + rng() * 90);
      if (numbers.includes(num)) continue;
      const range = ranges.find((i) => i.includes(num));
      // Add only if there is less than 3 numbers from the same range in the numbers array
      if (numbers.filter((i) => range?.includes(i)).length < 3) {
        numbers.push(num);
      }
    }

    numbers.sort((a, b) => a - b);

    const lengths: [
      len1: [index: number, numbers: [number]][],
      len2: [index: number, numbers: [number, number]][],
      len3: [index: number, numbers: [number, number, number]][]
    ] = [[], [], []];

    ranges.forEach((range, i) => {
      const in_col = numbers.filter((j) => range.includes(j));
      if (in_col.length === 1) {
        lengths[0].push([i, [in_col[0]]]);
      } else if (in_col.length === 2) {
        lengths[1].push([i, [in_col[0], in_col[1]]]);
      } else if (in_col.length === 3) {
        lengths[2].push([i, [in_col[0], in_col[1], in_col[2]]]);
      }
    });

    for (const col of lengths[2]) {
      rows[0][col[0]] = col[1][0];
      rows[1][col[0]] = col[1][1];
      rows[2][col[0]] = col[1][2];
    }

    for (const col of lengths[1]) {
      const row_lens = shuffle_array(get_row_lens(rows), rng);

      row_lens.sort((a, b) => a[1] - b[1]);
      row_lens.pop();
      row_lens.sort((a, b) => a[0] - b[0]);

      rows[row_lens[0][0]][col[0]] = col[1][0];
      rows[row_lens[1][0]][col[0]] = col[1][1];
    }

    for (const col of lengths[0]) {
      const row_lens = shuffle_array(get_row_lens(rows), rng);

      row_lens.sort((a, b) => a[1] - b[1]);

      rows[row_lens[0][0]][col[0]] = col[1][0];
    }

    this.rows = rows;
    this.state = this.rows_to_state();
  }

  /**
   * Convert the plate to a nicely formatted string
   */
  to_string(): string {
    let res = "┌──┬──┬──┬──┬──┬──┬──┬──┬──┐\n";
    const rows = this.to_string_rows().map((row) =>
      row.map((i) => i.padStart(2, " "))
    );

    rows.forEach((r, i) => {
      res += `│${r.join("│")}│\n`;

      if (i !== 2) {
        res += "├──┼──┼──┼──┼──┼──┼──┼──┼──┤\n";
      } else {
        res += "└──┴──┴──┴──┴──┴──┴──┴──┴──┘";
      }
    });
    return res;
  }

  /**
   * Convert all the numbers in the plate to strings
   */
  to_string_rows(): PlateRows<string> {
    const rows = new_plate("");

    this.rows.forEach((row, i) => {
      row.forEach((num, j) => {
        rows[i][j] = isNaN(num) ? "" : num.toString();
      });
    });

    return rows;
  }

  rows_to_state(): Plate["state"] {
    const rows: Plate["state"] = new_plate({ has_number: false });

    this.rows.forEach((row, i) => {
      row.forEach((num, j) => {
        if (!isNaN(num)) {
          rows[i][j] = { has_number: true, number: num, picked: false };
        }
      });
    });

    return rows;
  }

  reset() {
    this.state = this.rows_to_state();
  }

  pick_num(num: number) {
    for (let i = 0; i < this.state.length; i++) {
      const index = this.state[i].findIndex((i) => i.number === num);

      if (index !== -1) {
        this.pick_index(i, index);
      }
    }
  }

  pick_nums(nums: number[]) {
    for (const num of nums) {
      this.pick_num(num);
    }
  }

  pick_index(row: number, col: number) {
    if (this.state[row][col].has_number) {
      this.state[row][col].picked = !this.state[row][col].picked;
    }
  }

  check_rows(): number[] {
    const res: number[] = [];

    for (let i = 0; i < this.state.length; i++) {
      if (this.state[i].filter((i) => i.picked).length === 5) {
        res.push(i);
      }
    }

    return res;
  }
}

/**
 * Get the amount of already filled spaces on each row
 */
function get_row_lens(
  rows: PlateRows<number>
): [index: number, used_spaces: number][] {
  const all_lens: [number, number][] = rows.map((row, i) => [
    i,
    row.filter((i) => !isNaN(i)).length,
  ]);

  return all_lens.filter(([_idx, len]) => len < 5);
}

/**
 * Shuffles an array
 */
function shuffle_array<T>(array: T[], rng): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

/**
 * Returns a new plate filled with any data
 */
function new_plate<T>(fill: T): PlateRows<T> {
  return [
    [fill, fill, fill, fill, fill, fill, fill, fill, fill],
    [fill, fill, fill, fill, fill, fill, fill, fill, fill],
    [fill, fill, fill, fill, fill, fill, fill, fill, fill],
  ];
}
