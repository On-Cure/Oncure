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
* **Database**: SQLite with migrations
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
cd oncare

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
go run main.go
```

---

## 📁 Project Structure

```
soshicare/
├── frontend/                   
│   ├── src/                    
│   │   ├── app/                # Pages & routes
│   │   ├── components/         # UI components
│   │   ├── lib/                # Utilities
│   │   └── types/              # TypeScript types
│   ├── public/                 # Static assets
│   └── package.json
├── backend/                    
│   ├── pkg/                    
│   │   ├── db/                 # Database & migrations
│   │   ├── handlers/           # API handlers
│   │   ├── middleware/         # Auth & validation
│   │   ├── models/             # Data models
│   │   └── websocket/          # WebSocket features
│   ├── uploads/                # Media uploads
│   └── server.go
├── blockchain/                 # Hedera integration layer
│   ├── tokens/                 # HTS utilities
│   ├── rewards/                # Reward distribution
│   └── nfts/                   # NFT achievements
├── data/                       # SQLite DB storage
├── docker-compose.yml
├── build.sh
├── dev.sh
└── README.md
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
* `POST /api/auth/register`- User registration 
* `POST /api/auth/login`- User login 
* `POST /api/auth/logout`- User logout 
* `GET /api/auth/session`- Check session status

### Users & Profiles 
* `GET /api/users/profile`- Get user profile 
- `PUT /api/users/profile`- Update profile 
- `POST /api/users/follow`- Follow/unfollow user 
- `GET /api/users/followers`- Get followers list

### Posts 
- `GET /api/posts ` - Get posts feed 
- `POST /api/posts` - Create new post 
- `POST /api/posts/:id/comments`- Add comment 
- `GET /api/posts/:id`- Get specific post 

### Groups 
- `GET /api/groups`- List all groups 
- `POST /api/groups`- Create new group 
- `POST /api/groups/:id/join` - Join group 
- `POST /api/groups/:id/events` - Create group event 
### Real-time Features 
-` WebSocket/ws/chat` - Private messaging 
-  `WebSocket/ws/notifications` - Real-time notifications 
- `WebSocket/ws/groups/:id` - Group chat

### Rewards

* `POST /api/rewards/tip` → Tip a user with Hedera tokens
* `GET /api/rewards/leaderboard` → Weekly contributors ranking
* `GET /api/rewards/badges` → User NFT badges

### Healing Journey

* `POST /api/journey/milestone` → Add milestone
* `GET /api/journey/:userId` → Get user journey timeline

(Other endpoints remain same as base Soshi features: users, posts, groups, chat, etc.)

---

## 📝 Environment Variables

### Backend (.env)

```env
PORT=8080
DB_PATH=./data/soshicare.db
MIGRATIONS_PATH=file://pkg/db/migrations/sqlite
JWT_SECRET=your-secret-key
UPLOAD_PATH=./uploads

# Hedera Integration
HEDERA_ACCOUNT_ID=your-hedera-id
HEDERA_PRIVATE_KEY=your-private-key
HEDERA_NETWORK=testnet
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_HEDERA_NETWORK=testnet
```

---

## 🚢 Deployment

```bash
docker-compose -f docker-compose.prod.yml up --build -d
```

* Configure reverse proxy (nginx/caddy)
* Add SSL certificates
* Set Hedera mainnet credentials for production

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
