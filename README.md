# MemeVerse

MemeVerse is a multi-page, highly interactive web application where users can explore, upload, and interact with memes. This project showcases advanced frontend development techniques, including UI/UX, animations, state management, performance optimization, API handling, and React best practices.

## Features & Functionalities

### Homepage (Landing Page)
- Displays trending memes dynamically (fetched from an API).
- Interactive animations & transitions using Framer Motion/GSAP.
- Dark mode toggle for better user experience.

### Meme Explorer Page
- Infinite scrolling or pagination for seamless browsing.
- Filter memes by categories (Trending, New, Classic, Random).
- Search functionality with debounced API calls.
- Sort memes by likes, date, or comments.

### Meme Upload Page
- Upload memes in image/gif format.
- Add captions using a text editor.
- Option to generate AI-based meme captions via a meme-related API.
- Preview feature before uploading.

### Meme Details Page
- Dynamic routing (`/meme/:id`) for detailed meme view.
- Displays meme details, likes, comments, and sharing options.
- Comment system (using Local Storage for now).
- Like button with animations and local storage persistence.

### User Profile Page
- Displays user-uploaded memes.
- Edit profile information (Name, Bio, Profile Picture).
- View liked memes (saved in local storage or API).

### Leaderboard Page
- Shows the top 10 most liked memes.
- User rankings based on engagement.

### 404 Page (Easter Egg)
- A fun, meme-based 404 error page for non-existent routes.

## Tech Stack
- **Frontend:** Next.js / React (Pages & App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion / GSAP
- **State Management:** Redux Toolkit / Context API
- **Storage:** Local Storage / IndexedDB (For Caching Data)
- **APIs:** Meme APIs for fetching memes dynamically
- **Image Uploads:** Cloudinary / Firebase
- **Performance Optimization:** Lighthouse / React Profiler

## Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/memeverse.git
   cd memeverse
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create an `.env.local` file and add necessary API keys:
   ```env
   NEXT_PUBLIC_MEME_API_KEY=your_api_key_here
   NEXT_PUBLIC_CLOUDINARY_URL=your_cloudinary_url_here
   ```

4. Start the development server:
   ```sh
   npm run dev
   ```
   The application will be available at `http://localhost:3000`

## Deployment
- Deployable on **Vercel**, **Netlify**, or any static hosting supporting Next.js.
- Run the following command for production build:
  ```sh
  npm run build
  ```

## Screenshots
Here are some screenshots of the MemeVerse application in action:

![Homepage](screenshots/homepage.png)
![Meme Explorer](screenshots/meme-explorer.png)
![Meme Upload](screenshots/meme-upload.png)
![Meme Details](screenshots/meme-details.png)

## Live Demo
Check out the live demo: [MemeVerse Live](https://meme-verse-seven.vercel.app/)

## Contribution
Pull requests and feature suggestions are welcome. Please open an issue for discussion before submitting changes.

## License
This project is licensed under the MIT License. Feel free to use and modify it as needed.

---
Happy Meming! 🎭

