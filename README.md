Real-Time Chat Application
This is a real-time chat application built with ReactJS and Firebase. It allows users to send and receive messages instantly, with a clean and intuitive user interface.

✨ Features
Real-Time Messaging: Instantly send and receive messages without needing to refresh the page.

User Authentication: Securely sign in and out using Google Authentication.

Responsive Design: The application is optimized for both desktop and mobile devices.

File Uploads: Share images and other files directly in the chat.

Typing Indicators: See when other users are typing.

User Presence: Know which users are online and active.

🚀 Technologies Used
Frontend: ReactJS for building the user interface.

State Management: React Hooks (useState, useEffect, etc.).

Backend & Database: Firebase for:

Cloud Firestore: A NoSQL database for storing messages and user data.

Firebase Authentication: For handling user sign-in.

Firebase Storage: For storing uploaded images and files.

Firebase Realtime Database: (Optional, or for specific features) A NoSQL database that syncs data in real time.

🛠️ Installation & Setup
Clone the repository:

Bash

git clone <repository_url>
cd <repository_name>
Install dependencies:

Bash

npm install
Set up Firebase:

Create a new project on the Firebase Console.

Enable Cloud Firestore, Authentication (with Google Sign-in enabled), and Storage.

Get your Firebase configuration details from Project Settings.

Configure environment variables:

Create a .env file in the root directory.

Add your Firebase configuration keys to this file:

REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
Run the application:

Bash

npm start
The application will now be running on http://localhost:3000.

🤝 Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
