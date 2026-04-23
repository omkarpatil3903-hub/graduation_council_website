# Graduate Student Council Website

Welcome to the official repository for the Graduate Student Council (GSC) website. 

The website serves as the central hub for the GSC, focusing on advocacy, leadership, and community for graduate scholars. It provides information and resources for graduate students, as well as a platform for communication and engagement.

## Features & Pages

The application is built as a Single Page Application (SPA) with the following key sections:

- **Home**: The landing page with announcements, mission statement, and quick links.
- **About**: Information about the Graduate Student Council, its history, leadership team, and mission.
- **Blog**: Latest news, articles, and updates relevant to graduate students.
- **Constituencies**: Details on the various departments, schools, or groups represented by the council.
- **Grievance**: A portal for students to submit and track grievances or concerns securely.
- **Contact**: Contact information and a form to get in touch with the council directly.
- **Be a Part**: Information on how to get involved, open positions, and volunteer opportunities.

## Technology Stack

This project is built using modern web development tools to ensure a fast, responsive, and maintainable application:

- **React**: Frontend UI library.
- **Vite**: Next-generation frontend tooling for fast development and building.
- **React Router**: For handling navigation and routing within the SPA.
- **Tailwind CSS**: A utility-first CSS framework for rapid and responsive UI development.
- **ESLint**: For maintaining code quality and consistency.

## Getting Started

To run the project locally, follow these steps:

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd graduate-council-website
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Development Server

To start the local development server:

```bash
npm run dev
```

This will run the application in development mode. Open your browser and navigate to the local URL provided in the terminal (usually `http://localhost:5173`) to view it. The page will reload when you make changes.

### Building for Production

To build the app for production:

```bash
npm run build
```

This will bundle the application into the `dist` directory, optimizing the build for the best performance.

### Linting

To run the linter to check for code formatting and style issues:

```bash
npm run lint
```
