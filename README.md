_# Vue.js Course Platform

A modern course platform built with Vue 3 and Firebase, allowing users to browse courses, register as teachers, and see
users requests.

![Homepage Screenshot](./public/assets/images/screenshot.png)

## Features

- 🏠 **Home Page**: Landing page with featured courses and platform introduction
- 📚 **Course Listing**: Browse and filter available courses
- 👨‍🏫 **Teacher Profiles**: View teacher listings and contact them
- 🔒 **Authentication**: Email/password authentication using Firebase
- 👩‍🎓 **Teacher Registration**: Users can register as teachers
- 🎨 **Modern UI**: Built with SASS for styling
- 🔄 **State Management**: Efficient state handling with Pinia

## Tech Stack

- Vue.js 3 (Composition API)
- Vue Router
- Pinia for state management
- Firebase Authentication
- FormKit for form handling
- SASS for styling
- Vue Toast Notification

## Prerequisites

Before you begin, ensure you have installed:

- **use VPN for Firebase**
- Node.js (version 16 or higher)
- npm


3. Create a `.env` file in the root directory and add your Firebase configuration:

```env
VITE_APP_NAME='Free Education Platform'
VITE_BASE_URL='https://edupress-701b9-default-rtdb.firebaseio.com'
VITE_API_KEY='AIzaSyAIhYQYpKuH0jmfcGlZj4rafLw4vvnnHn8'
```

## Project Structure

```
src/
├── assets/          # Static assets
├── components/      # Reusable Vue components
├── composables/     # Composition API utilities
├── router/          # Vue Router configuration
├── store/          # Pinia stores
│   ├── auth.js     # Authentication store
│   └── course.js   # Courses store
├── views/          # Page components
└── App.vue         # Root component
```

## State Management

### Auth Store

- Handles user authentication state
- Manages user tokens and IDs
- Provides login/logout functionality

### Course Store

- Manages course data
- Handles course filtering
- Provides course search functionality

## Key Features Implementation

### Authentication

```javascript
// Example usage of auth store
import { useAuthStore } from '@/store/auth'

const auth = useAuthStore()
await auth.login(email, password)
```

### Course Filtering

```javascript
// Example usage of course store
import { useCourseStore } from '@/store/course'

const courseStore = useCourseStore()
const filteredCourses = courseStore.filterCourses(filters)
```

