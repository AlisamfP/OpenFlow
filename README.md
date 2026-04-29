# Open Flow 

A free, open-source AAC (Augmentative and Alternative Communication) web app designed to support people with speech or language challenges. Originally built as my senior project while completing my bachelor's in Graphic Information Technology with a focus in Full Stack Web Development.

## About

Open Flow started as a passion project inspired by my own use of physical communication cards (and my tendency to lose them). It provides a digital set of communication cards that speak their text aloud when clicked, making AAC tools more accessible, portable, and a little harder to misplace.

What started as a Vite + React app powered entirely by local storage has grown into a full-stack application with a real database, user authentication, and data that follows you across devices. The latest update was a full migration to Next.js with MongoDB!

## Features

- **Text-to-speech** — click any card to hear it spoken aloud with customizable voice, pitch, rate, and volume
- **Custom cards** — create your own cards with custom text and emoji
- **Favorites** — save frequently used cards for quick access
- **User accounts** — make an account to sync your favorites, create custom cards, and update your settings
- **Dark mode** — light and dark theme with saved preference
- **Accessibility first** — built with screen reader support, keyboard navigation, and AAC users in mind

## Tech Stack

- **Frontend** — Next.js, React, TypeScript, Material UI, Tailwind CSS
- **Backend** — Next.js API Routes
- **Database** — MongoDB Atlas with Mongoose
- **Authentication** — Better Auth
- **Hosting** — Vercel

## Live Demo

[openflow.palson.info](https://openflow.palson.info)