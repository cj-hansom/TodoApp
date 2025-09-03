
# TodoApp

![React Native](https://img.shields.io/badge/React%20Native-0.81-blue)
![React](https://img.shields.io/badge/React-19.1.0-brightgreen)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

A simple, fully functional **Todo application** built with **React Native**.  
Supports adding, updating, deleting, and toggling tasks, with **dark/light theme support**.

---

## Features

- Add, update, delete, and toggle task completion
- Persistent storage using **AsyncStorage**
- Dark mode and light mode toggle
- Smooth animations with `LayoutAnimation`
- React Navigation stack for seamless screen transitions
- Fully tested with **Jest** and **React Testing Library**

---

## Screenshots

### Task List Screen
![Task List](assets/screenshots/task-list.png)

### Add Task Screen
![Add Task](assets/screenshots/add-task.png)

### Dark Mode
![Dark Mode](assets/screenshots/dark-mode.png)

### Task Completed
![Task Completed](assets/screenshots/task-completed.png)

> Add more screenshots as needed in the `assets/screenshots/` folder and reference them here.

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/cj-hansom/TodoApp.git
cd TodoApp
````

2. Install dependencies:

```bash
npm install
```

3. Run the app:

* **Android**:

```bash
npm run android
```

* **iOS** (Mac only):

```bash
npm run ios
```

---

## Testing

This project uses **Jest** and **React Testing Library** for unit and component tests.

Run tests with:

```bash
npm test
```

All test suites should pass.

---

## Usage

* Launch the app
* Use **Add Task** to create a new task
* Tap a task to toggle its completion
* Long press a task to edit or update
* Use **Delete** to remove a task
* Toggle dark/light mode using the button

---

## Project Structure

```
TodoApp/
│
├─ src/
│   ├─ components/     # TaskItem and UI components
│   ├─ context/        # TaskProvider and ThemeContext
│   ├─ screens/        # TaskListScreen, AddTaskScreen
│   └─ types/          # TypeScript types
│
├─ _tests_/            # Jest and Testing Library tests
├─ assets/screenshots/ # App screenshots for README
├─ App.tsx             # Main entry point
├─ package.json
└─ README.md
```

---

## Technologies

* **React Native 0.81**
* **React 19.1**
* **TypeScript**
* **AsyncStorage**
* **React Navigation**
* **Jest & React Testing Library**

---

## Contributing

1. Fork the repository
2. Create a branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m "Add feature"`)
4. Push to your branch (`git push origin feature-name`)
5. Create a Pull Request

---

## License

MIT License © 2025


