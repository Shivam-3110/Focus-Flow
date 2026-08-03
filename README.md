# Focus-Flow

A personal productivity web app that brings together all your daily focus tools in one clean, minimal interface — with live weather, a clock, and three switchable themes.

## Features

### To Do List
- Add tasks with a title and optional details
- Mark tasks as important (highlighted with a red badge)
- Remove tasks by marking them as completed
- Persists across sessions via localStorage
- Input validation (empty check, 100 char limit on title, 300 char limit on details)

### Daily Planner
- 18 time slots from 6:00 AM to 11:00 PM
- Type your plan for each hour directly into the slot
- Auto-saves to localStorage on every keystroke

### Motivation
- Fetches a random quote on every visit from [DummyJSON Quotes API](https://dummyjson.com/quotes/random)
- Displays quote content and author

### Pomodoro Timer
- 25-minute work session followed by a 5-minute break
- Start, Pause, and Reset controls
- Session label updates automatically between Work Session and Take a Break

### Daily Goals
- Add daily goals and mark them as important
- Remove goals by marking them as completed
- Persists across sessions via localStorage
- Input validation (empty check, 100 char limit)

### Weather & Clock
- Live clock updating every second (12-hour format with AM/PM)
- Current date displayed
- Real-time weather data via [WeatherAPI](https://www.weatherapi.com/) — shows temperature, condition, wind speed, humidity, and heat index

### Theme Switcher
- Cycles through 3 color themes on clicking the sun icon in the navbar
  - Default: Teal/Blue
  - Theme 2: Red/Dark
  - Theme 3: Sand/Mint

## Tech Stack

- HTML5
- CSS3 (custom properties, flexbox, vendor prefixes)
- Vanilla JavaScript (ES6+)
- localStorage for data persistence
- [WeatherAPI](https://www.weatherapi.com/) for weather data
- [DummyJSON](https://dummyjson.com/) for motivational quotes
- [Remix Icon](https://remixicon.com/) for icons
- Custom font: Aeonik (Regular & Bold)

## Project Structure

```
Focus-Flow/
├── index.html
├── style.css
├── script.js
├── favicon_io/
│   └── apple-touch-icon.png
├── icons8-quotes-100.png
├── icons8-quotes-100 (1).png
├── fonnts.com-Aeonik-Regular.ttf
└── fonnts.com-Aeonik-Bold.ttf
```

## Getting Started

No build tools or dependencies required. Just open `index.html` in a browser.

```bash
git clone https://github.com/your-username/Focus-Flow.git
cd Focus-Flow
# open index.html in your browser
```

> The weather feature requires an active API key from [weatherapi.com](https://www.weatherapi.com/). The key is currently hardcoded in `script.js` — replace it with your own key if it expires.

## Local Storage Keys

| Key | Used By |
|---|---|
| `currentTask` | To Do List |
| `currentGoal` | Daily Goals |
| `dayPlanData` | Daily Planner |

## Known Limitations

- Weather city is hardcoded to Gorakhpur — change the `city` variable in `script.js` to use a different location
- No backend — all data is stored in the browser's localStorage and will be lost if cleared
- Not fully responsive on mobile screens
