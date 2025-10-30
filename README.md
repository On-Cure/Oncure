# onCare

A **social support network** for cancer patients, survivors, caregivers, and health coaches&#x20;
onCare blends **community connection, mentorship, and blockchain-powered rewards** (via Hedera) to create a safe, stigma-free, and motivating environment for healing and resilience.

---

## 🚀 Features

### 💙 Core Support Features

* **User Profiles**: Patients, survivors, caregivers, and coaches with role-based profile customization.
* **Community Feed**: Share stories, encouragement, and resources in a personalized timeline.
* **Groups & Topics**: Join groups based on cancer type, nutrition, caregivers, or general wellness.
* **Anonymous Mode**: Patients can post, comment, or seek help privately.

### 🎁 Reward System (Hedera Integration)

* **Tipping with Hedera Tokens**: Patients/families can send micro-rewards to supporters.
* **Weekly Rewards**: Automatic distribution of Hedera tokens to top contributors.
* **NFT Badges**: Recognition for mentors, supporters, and milestone achievers (e.g., “Community Hero”).

### 🧑‍🤝‍🧑 Mentorship & Coaching

* **1-on-1 & Group Mentorship**: Survivors and certified coaches can guide patients.
* **Secure Chat & Resource Sharing**: Built-in private and group chat powered by WebSockets.

### 🔔 Engagement & Interaction

* **Notifications**: Real-time updates on tips, badges, mentorship invitations, and milestones.
* **Events & Workshops**: Group members can organize health webinars and support events.
* **Privacy Controls**: Granular visibility options for posts, milestones, and profiles.

---

## 🛠️ Tech Stack

### Frontend

* **Framework**: Next.js 14+ (App Router)
* **Styling**: Tailwind CSS + shadcn/ui
* **Real-time**: WebSockets for chat & notifications

### Backend

* **Runtime**: Go 1.21+
* **Database**: PostgreSQL (production) / SQLite (development) with migrations
* **Authentication**: Sessions & cookies
* **File Storage**: Local filesystem for media uploads
* **WebSocket**: Gorilla WebSocket

### Blockchain Layer

* **Hedera Token Service (HTS)**: Micro-rewards & tipping
* **Hedera Consensus Service (HCS)**: Transparent, immutable reward tracking
* **NFT Layer**: Achievement badges

### DevOps

* **Containerization**: Docker & Docker Compose
* **Database Migrations**: golang-migrate
* **Security**: bcrypt for password hashing + HIPAA/GDPR-aligned data handling

---

## 📋 Prerequisites

* Node.js 18+
* Go 1.21+
* Docker & Docker Compose
* Git
* Hedera Testnet Account (for blockchain features in dev mode)

---

## 🚀 Getting Started

### Option 1: Docker (Recommended)

```bash
# Clone repository
git clone https://github.com/On-Cure/Oncure.git
cd Oncure

# Make scripts executable
chmod +x build.sh dev.sh

# Build and run all services
./build.sh
```

Access the app:

* Frontend → [http://localhost:3000](http://localhost:3000)
* Backend API → [http://localhost:8080](http://localhost:8080)

### Option 2: Local Development

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

#### Backend

```bash
cd backend
go mod download
go run server.go
```

---

## 📁 Project Structure
 
 ```
-Oncure/
-├── frontend/
-│   ├── src/
-│   │   ├── app/                # Next.js App Router pages
-│   │   ├── components/         # UI components
-│   │   ├── hooks/              # React hooks
-│   │   ├── lib/                # Utilities
-│   │   └── contexts/           # React contexts
-│   ├── public/                 # Static assets (if any)
-│   └── package.json
-├── backend/
-│   ├── pkg/
-│   │   ├── db/                 # Database & migrations (sqlite/postgres)
-│   │   ├── handlers/           # API handlers
-│   │   ├── middleware/         # Auth, CORS, params
-│   │   ├── models/             # Data models
-│   │   ├── router/             # Custom router and route setup
-│   │   └── websocket/          # WebSocket hub and client
-│   ├── accounts/               # Hedera wallet utilities
-│   ├── uploads/                # Media uploads
-│   └── server.go               # Backend entrypoint
-├── docker-compose.yml
-├── build.sh
-├── dev.sh
-└── README.md
+Oncure/
+├── frontend/
+│   ├── src/
+│   │   ├── app/                # Routes & layouts
+│   │   ├── components/         # UI/components
+│   │   ├── hooks/              # React hooks
+│   │   ├── lib/                # Helpers
+│   │   └── contexts/           # Context providers
+│   └── package.json
+├── backend/
+│   ├── pkg/
+│   │   ├── db/                 # DB init + migrations (sqlite/postgres)
+│   │   ├── handlers/           # HTTP handlers
+│   │   ├── middleware/         # Auth, CORS, params
+│   │   ├── models/             # Persistence models
+│   │   ├── router/             # Routes and router
+│   │   └── websocket/          # Realtime hub
+│   ├── accounts/               # Hedera wallet utils
+│   └── server.go
+├── docker-compose.yml
+├── build.sh
+├── dev.sh
+└── README.md
 ```

---

## 🗃️ Database Schema (Key Entities)

* **Users**: Patients, survivors, caregivers, coaches
* **Posts**: Community stories & updates
* **Groups**: Support groups by topic
* **Events**: Community events & webinars
* **Messages**: Private & group chats
* **Notifications**: Alerts for tips, badges, milestones
* **Rewards**: Hedera token transactions
* **Badges**: NFT achievements

---

## 🔐 Authentication & Security

* **Password Security**: bcrypt + salted hashing
* **HIPAA/GDPR Alignment**: Data handling and anonymization features
* **Role-based Access**: Patient, survivor, caregiver, coach
* **Secure Sessions**: Expiring cookies with server validation
* **Blockchain Transparency**: All rewards traceable on Hedera ledger

---

## 🌐 API Endpoints

### Authentication
- POST `/api/auth/register`
- POST `/api/auth/login`
- POST `/api/auth/logout`
- GET  `/api/auth/session`

### Users
- GET  `/api/users/profile`
- PUT  `/api/users/profile`
- PUT  `/api/users/profile/privacy`
- GET  `/api/users/followers`
- GET  `/api/users/following`
- GET  `/api/users/suggested`
- GET  `/api/users/online`
- GET  `/api/users/counts`
- POST `/api/users/{userID}/follow`
- DELETE `/api/users/{userID}/follow`
- DELETE `/api/users/{userID}/follow-request`
- POST `/api/users/{userID}/accept-follow`
- GET  `/api/users/{userID}/follow-status`

### Posts
- GET  `/api/posts`
- GET  `/api/posts/liked`
- GET  `/api/posts/commented`
- GET  `/api/posts/saved`
- POST `/api/posts`
- PUT  `/api/posts`
- DELETE `/api/posts`
- GET  `/api/posts/{postID}/comments`
- POST `/api/posts/{postID}/comments`
- GET  `/api/posts/{postID}/reactions`
- POST `/api/posts/{postID}/reactions`
- GET  `/api/posts/{postID}/saved`
- POST `/api/posts/{postID}/save`
- DELETE `/api/posts/{postID}/save`

### Groups
- GET  `/api/groups`
- POST `/api/groups`
- GET  `/api/groups/{groupID}`
- PUT  `/api/groups/{groupID}`
- DELETE `/api/groups/{groupID}`
- POST `/api/groups/{groupID}/join`
- DELETE `/api/groups/{groupID}/join`
- POST `/api/groups/{groupID}/invite`
- PUT  `/api/groups/{groupID}/members/{userID}`
- DELETE `/api/groups/{groupID}/members/{userID}`
- GET  `/api/groups/{groupID}/posts`
- POST `/api/groups/{groupID}/posts`
- GET  `/api/groups/{groupID}/posts/{postID}/reactions`
- POST `/api/groups/{groupID}/posts/{postID}/reactions`
- GET  `/api/groups/{groupID}/posts/{groupPostID}/comments`
- POST `/api/groups/{groupID}/posts/{groupPostID}/comments`
- GET  `/api/groups/comments/{commentID}`
- PUT  `/api/groups/comments/{commentID}`
- DELETE `/api/groups/comments/{commentID}`
- GET  `/api/groups/comments/{commentID}/reactions`
- POST `/api/groups/comments/{commentID}/reactions`
- GET  `/api/groups/{groupID}/events`
- POST `/api/groups/{groupID}/events`
- POST `/api/groups/events/{eventID}/respond`
- GET  `/api/groups/{groupID}/messages`
- POST `/api/groups/{groupID}/messages`

### Messages
- GET  `/api/messages/conversations`
- GET  `/api/messages/unread-count`
- GET  `/api/messages/{userID}`
- POST `/api/messages/{userID}`
- PUT  `/api/messages/{userID}/read`

### Notifications
- GET  `/api/notifications`
- PUT  `/api/notifications/read`
- PUT  `/api/notifications/read-all`
- GET  `/api/notifications/unread-count`

### Verification
- POST `/api/verification/request`
- GET  `/api/verification/status`

### Hedera Transfers
- POST `/api/transfer/hbar`
- GET  `/api/transfer/balance`
- GET  `/api/transfer/balance/user?user_id={id}`
- GET  `/api/transfer/history`

### WebSocket
- GET  `/ws`

---

## 📝 Environment Variables

### Backend (.env)

#### Local (SQLite by default)
```env
PORT=8080
# Optional: override SQLite path (defaults to ./backend/soshi.db)
DB_PATH=./backend/soshi.db
MIGRATIONS_PATH=file://pkg/db/migrations/sqlite
JWT_SECRET=your-secret-key
UPLOAD_PATH=./backend/uploads

# Hedera (required for wallet/transfers)
HEDERA_CLIENT_ID=0.0.xxxxxx
HEDERA_PRIVATE_KEY=302e020100300506032b657004220420...
```

#### Production (PostgreSQL)
```env
PORT=8080
DATABASE_URL=postgres://username:password@host:port/database?sslmode=require
MIGRATIONS_PATH=file://pkg/db/migrations/postgres
JWT_SECRET=your-secret-key
UPLOAD_PATH=./uploads

# Hedera (required for wallet/transfers)
HEDERA_CLIENT_ID=0.0.xxxxxx
HEDERA_PRIVATE_KEY=302e020100300506032b657004220420...
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_HEDERA_NETWORK=testnet
```

---

## 🚢 Deployment

### Render Deployment (Recommended for Production)

1. **Create PostgreSQL Database on Render**
   - Go to Render Dashboard → New → PostgreSQL
   - Note the DATABASE_URL provided

2. **Deploy Backend**
   - Connect your GitHub repository
   - Set build command: `cd backend && go build -o server server.go`
   - Set start command: `cd backend && ./server`
   - Add environment variables:
     ```
     DATABASE_URL=<your-render-postgres-url>
     MIGRATIONS_PATH=file://pkg/db/migrations/postgres
     JWT_SECRET=<your-secret>
     ```

3. **Deploy Frontend on Netlify**
   - Connect repository
   - Set build command: `cd frontend && npm run build`
   - Set publish directory: `frontend/.next`
   - Add environment variable: `NEXT_PUBLIC_API_URL=<your-render-backend-url>`

### Docker Deployment (Alternative)
 
 ```bash
docker compose up --build -d
 ```

* Configure reverse proxy (nginx/caddy)
* Add SSL certificates
* Set Hedera mainnet credentials for production

---

## 📚 Documentation

### 🚀 Getting Started
- **[Project Structure](documentation/PROJECT_STRUCTURE.md)** - Complete project architecture and file organization
- **[Development Instructions](documentation/instructions.md)** - Detailed development setup and guidelines

### 🛠️ Development Guides
- **[Style Guide](documentation/style-guide.md)** - UI/UX design standards and component guidelines
- **[WebSocket Documentation](documentation/private-messaging-websockets.md)** - Real-time messaging implementation
- **[Group Chat WebSockets](documentation/group-chat-websockets.md)** - Multi-user chat system documentation

### 🚀 Deployment Guides
- **[Deployment Overview](DEPLOYMENT.md)** - Main deployment documentation
- **[Render Deployment](RENDER_DEPLOYMENT.md)** - Hybrid deployment (Render + Netlify)
- **[Native Deployment](DEPLOYMENT_NATIVE.md)** - Local development setup
- **[Deployment Checklist](DEPLOYMENT_CHECKLIST.md)** - Step-by-step deployment verification
- **[Deployment Summary](DEPLOYMENT_SUMMARY.md)** - Deployment issues and solutions
- **[Database Migration](MIGRATION_GUIDE.md)** - SQLite to PostgreSQL migration guide

### 📋 Additional Resources
- **[Interview Responses](NCIK_Interview_Responses.docx)** - Project interview documentation

---

## 🤝 Contributing

1. Fork repo
2. Create branch (`git checkout -b feature/amazing-feature`)
3. Commit (`git commit -m 'Add amazing feature'`)
4. Push (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📄 License

MIT License – see [LICENSE](LICENSE).

---

## 🙏 Acknowledgments

* Inspired by cancer survivors, caregivers, and medical coaches worldwide
* Built on **Soshi** (a social networking base project)
* Enhanced with **Hedera blockchain** for transparent and fair rewards

---

## 📞 Support

For issues, open a GitHub issue or contact the dev team.

---

## 👥 Authors

[Philip Ochieng](https://www.github.com/philip38-hub)

---

**Built with ❤️ using Next.js, Go, Hedera, and modern web technologies**
