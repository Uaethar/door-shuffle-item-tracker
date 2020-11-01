# Door shuffle dungeon items tracker

## How to run

1. Install node w/ npm: https://nodejs.org/en/

1. Clone/DL repo

2. Go to project root, open shell, and run the following commands:
```bash
npm install
npm start
```

## How to use

- On entrances, small keys, chests: 
  - Left click to increment count by 1
    - For found items, the value cannot exceed total if set
    - For used small keys, the value cannot exceed found
  - Right click to decrement count by 1 (down to 0)
  - On total counts, incrementing from `?` will set count to the amount of corresponding items found, and decrementing from that value will reset count to `?`
- On maps and compasses:
  - Left click to toggle between found (check mark) and not found (no mark)
- On big keys:
  - Left click to toggle between found (check mark) and not found (no mark)
  - Right click to toggle between not available (cross mark) and not found (no mark)

## In future updates

-  Add header icon for entrance count
-  Save (to browser local storage)
-  Reset button