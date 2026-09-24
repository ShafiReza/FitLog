# FitLog — Train with Intent. Log Every Set.

A dark, no-nonsense gym companion built with Next.js. Pick a lift, lock it into today’s plan, and watch the week’s work add up.

## Technologies Used

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **DaisyUI 5**
- **React-Toastify**
- **LocalStorage** persistence

## Key Features

1. **Workout Library** — Browse 12 carefully selected lifts covering every major muscle group with images, categories, equipment, duration, calories and ratings.
2. **Workout Detail Pages** — Full instructions, key specs table, and one-click actions to add to plan or save for later.
3. **Today’s Plan & Saved** — Cap of 5 lifts for the day. Live metrics (exercises / minutes / calories). Mark as done or remove with toast feedback.
4. **Live Navbar Counters** — Plan and Saved badges update in real time and link to the My Plan page.
5. **Sort & Responsive** — Sort library by Duration, Calories or Rating. Fully responsive on mobile, tablet and desktop.
6. **Persistence** — Plan and Saved lists survive page reloads via localStorage.
7. **404 Page & Loading States** — Clean 404 and loading spinner while data is fetched.

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API

- All workouts: `https://api.abcz.workers.dev/api/fitlog`
- Single workout: `https://api.abcz.workers.dev/api/fitlog/:id`

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout + providers
│   ├── page.tsx            # Home (Hero + Library)
│   ├── my-plan/page.tsx    # My Plan page
│   ├── workout/[id]/page.tsx
│   └── not-found.tsx
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── home/               # Hero, Library, Cards
│   ├── plan/               # Metrics, PlanCard, EmptyState
│   ├── workout/            # Detail actions
│   └── ui/                 # Spinner, SortDropdown
├── context/PlanContext.tsx # Plan + Saved state
├── hooks/                  # Data fetching
└── lib/                    # API, types, utils
```

## License

MIT
