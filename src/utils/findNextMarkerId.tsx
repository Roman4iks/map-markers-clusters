export function findNextMarkerId(existingIds: number[]): number {
    let nextId = 0;
    while (existingIds.includes(nextId)) {
      nextId++;
    }
    return nextId;
  }
