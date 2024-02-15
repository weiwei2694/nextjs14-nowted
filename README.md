# Fullstack Nowted Apps: Nextjs 14, Reactjs, Typescript, Prisma, NextAuth v4, Tailwind CSS, MySQL, Railway

## Demo: Nowted App
<a href="https://nextjs14-nowted.vercel.app/" target="_blank">Nowted Apps</a><br />
Adapted from: <a href="https://codedesign.dev/challenge/nowted-app">Nauval - Nowted App</a>

This website is completely made for desktop only, so if you access it via mobile or tablet, maybe the display you see is not good enough, or very messy.

If you can't open it or there are problems, most likely my railway hobby plan has run out :(.
So run it locally if you want to see all the features.

because I use a hobby plan from railway, the performance presented by my website will not be very good, maybe there will be a delay of 1-5 seconds, when querying.

<img src="./public/assets/previews/preview-note.PNG" />
<img src="./public/assets/previews/preview-restore.PNG" />
<img src="./public/assets/previews/preview-create-new-note.PNG" />

## Key Features

- Authentication with NextAuth v4
- Authorization
- Realtime Edit - Debouncing
- Soft Delete
- Beautiful UI using TailwindCSS
- MySQL database using Railways
- ORM using Prisma
- Desktop Only
- The main logic or view of Nowted, based on searchParams

## Cloning the repository

```bash
git clone https://github.com/weiwei2694/nextjs14-nowted.git
cd nextjs14-nowted
```

## Install packages

```bash
npm install
yarn install
pnpm install
bun install
```

## Setup .env file

```bash
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"

NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=
```

## Setup Prisma

Add MySQL Database (I used Railway - Instead of using railway, you can use local database)

```bash
npx prisma generate
npx prisma db push
```

## Available commands

| Command                | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Starts a development instance of the app |
| `npm run build`        | Builds the app for production            |
| `npm run start`        | Starts the app in production mode        |
