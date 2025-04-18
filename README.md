# SMART HOME - NEXT.JS APPLICATION

## 📖 Overview  
This **Next.js** application serves as the frontend and backend for the **Hager Smart Home** system. It handles the API routes for incoming data, as well as the user interface. The backend API handles data from various nodes in the smart home system, while the frontend displays this information in an interactive, real-time user interface.

### **Key Features:**
- **API Routes**: For handling incoming data from devices like the **Mailbox Node** and **Bridge Node**.
- **Real-Time Updates**: Utilizes **TanStack React Query** for efficient data fetching and updating.
- **Database Management**: Uses **Prisma** with SQLite to store and manage logs, device data, and user interactions.

---

## ⚙️ Functionality  
This application provides the following core functionalities:

### 1. **Backend API**  
- The application exposes a RESTful API that handles incoming data from various smart home nodes.
  - **POST /api/new-device** – Registers a new device in the system.
  - **POST /api/new-log** – Logs events from smart home devices.
  - **GET /api/get-all-devices** – Retrieves a list of all registered devices and their most recent log.
  

### 2. **Frontend**  
- The user interface displays:
  - Real-time notifications of new device activity (e.g., motion detection).
  - A list of registered devices and their current statuses.
  - Data logs showing the history of interactions with the devices.
  
- **TanStack React Query** is used for efficient data fetching and caching. This ensures that the UI remains responsive, even when the backend data changes frequently.

### 3. **Data Handling with Prisma**  
- **Prisma ORM** is used to handle the SQLite database. It manages device registration, log storage, and any other data needed for the smart home system.
  
  - **SQLite Database**: Stores device logs, registration details, and configurations.
  - **Models**: Device, Log, and potentially a future User model for authentication.

---

## 🔩 Technologies Used  
- **Next.js**: Framework for building the application (both frontend and backend).
- **Axios**: For making HTTP requests to external services and APIs.
- **TanStack React Query**: For efficient data fetching, caching, and synchronization between the frontend and backend.
- **Prisma**: ORM for managing and querying the SQLite database.

---

## 🌐 API Endpoints  
The application provides the following API routes for interacting with the data:

- **POST /api/new-device**:  
  - Registers a new device in the system.  
  - Body Example: `{ "deviceId": "esp32 mac-address", "name": "mailbox-sensor", "type": "motion detection", "location": "mailbox" }`
  
- **POST /api/new-log**:  
  - Logs events (e.g., motion detected).  
  - Body Example: `{ "deviceId": "esp32 mac-address", "event": "motion detected", "value": "new mail" }`

- **GET /api/get-all-devices**:  
  - Retrieves a list of all registered devices in the system + the lates log.

---

## 🛠️ Future Plans  
- **Authentication**: Implement a **register and login system** to allow user-specific settings and device management.
- **UI Enhancements**: Improve the user interface for a better and more interactive experience.
- **Real-Time Updates**: Integrate WebSocket support for real-time notifications of events across the smart home system.
- **User Profiles**: Allow users to create and manage profiles with personalized device configurations and preferences.

---