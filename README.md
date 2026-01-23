# Lepron GPT - AI Chat Application with Authentication

A full-stack chat application built with React and Node.js that allows users to have conversations with an AI assistant powered by OpenAI's GPT model.

🔗 **[Live Demo](https://lepron-gpt-with-auth-frontend.onrender.com/)**

## System Architecture

## System Architecture

### Overview
Lepron GPT is a sophisticated full-stack AI chat application implementing a microservices-oriented architecture with session-based authentication, real-time chat capabilities, and persistent data storage. The system follows modern web development patterns with clear separation of concerns across presentation, business logic, and data layers.

### 🏗️ High-Level System Architecture

```mermaid
graph TB
    subgraph "🌐 Client Layer"
        Browser[🖥️ Web Browser]
        Mobile[📱 Mobile Browser]
    end
    
    subgraph "🚀 CDN/Static Assets"
        CDN[⚡ Content Delivery Network]
        StaticFiles[📁 Static Assets<br/>CSS, JS, Images]
    end
    
    subgraph "⚛️ Frontend Layer - React SPA"
        ReactApp[⚛️ React Application]
        Vite[⚡ Vite Dev Server/Build]
        Router[🛣️ Client-Side Routing]
        StateManager[🗃️ Context API State]
        APIClient[🔌 API Client Layer]
    end
    
    subgraph "🖥️ Backend Layer - Node.js"
        LoadBalancer[⚖️ Load Balancer]
        ExpressServer[🚀 Express.js Server]
        AuthMiddleware[🔐 Authentication Middleware]
        CORS[🌐 CORS Handler]
        SessionManager[🎫 Session Management]
        RouteHandlers[🛣️ Route Controllers]
    end
    
    subgraph "🌍 External Services"
        OpenAI[🤖 OpenAI GPT API]
        EmailService[📧 Email Service]
    end
    
    subgraph "🗄️ Database Layer"
        MongoDB[(🍃 MongoDB Atlas)]
        SessionStore[(🎫 Session Store)]
        UserCollection[(👥 Users Collection)]
        ThreadCollection[(💬 Threads Collection)]
    end
    
    subgraph "☁️ Infrastructure"
        RenderFE[🚀 Render - Frontend]
        RenderBE[🚀 Render - Backend]
        MongoAtlas[☁️ MongoDB Atlas Cloud]
    end
    
    Browser --> CDN
    Mobile --> CDN
    CDN --> ReactApp
    ReactApp --> Vite
    ReactApp --> Router
    ReactApp --> StateManager
    ReactApp --> APIClient
    
    APIClient --> LoadBalancer
    LoadBalancer --> ExpressServer
    ExpressServer --> CORS
    ExpressServer --> AuthMiddleware
    ExpressServer --> SessionManager
    ExpressServer --> RouteHandlers
    
    RouteHandlers --> OpenAI
    RouteHandlers --> EmailService
    
    SessionManager --> SessionStore
    RouteHandlers --> MongoDB
    MongoDB --> UserCollection
    MongoDB --> ThreadCollection
    
    ReactApp -.-> RenderFE
    ExpressServer -.-> RenderBE
    MongoDB -.-> MongoAtlas
    
    style Browser fill:#e1f5fe
    style Mobile fill:#e1f5fe
    style ReactApp fill:#e8f5e8
    style ExpressServer fill:#fff3e0
    style MongoDB fill:#f3e5f5
    style OpenAI fill:#ffebee
```

### 🎨 Detailed Frontend Architecture

```mermaid
graph TB
    subgraph "⚛️ React Application Structure"
        App[📱 App.jsx<br/>Main Application Entry]
        ContextProvider[🗃️ MyContextProvider<br/>Global State Management]
        AppContent[🎯 AppContent Component<br/>Route Logic]
        
        subgraph "🔐 Authentication Components"
            Login[🔑 Login.jsx<br/>User Login Form]
            Signup[📝 Signup.jsx<br/>User Registration]
        end
        
        subgraph "💬 Main Application Components"
            Slidebar[📋 Slidebar.jsx<br/>Thread Management]
            ChatWindow[💬 ChatWindow.jsx<br/>Main Chat Interface]
            Chat[💭 Chat.jsx<br/>Message Display]
        end
        
        subgraph "🗃️ State Management"
            AuthState[🔐 Authentication State<br/>user, isAuthenticated, authLoading]
            ChatState[💬 Chat State<br/>prompt, reply, currThreadId]
            ThreadState[📋 Thread State<br/>allThreads, prevChats, newChat]
        end
        
        subgraph "🔌 API Layer"
            APIConfig[⚙️ api.js<br/>Centralized API Configuration]
            APIEndpoints[🎯 API Endpoints<br/>AUTH, CHAT, THREADS]
            APIHelper[🛠️ API Helper Functions<br/>apiCall, DEFAULT_FETCH_OPTIONS]
        end
        
        subgraph "🛠️ Utilities"
            UUID[🆔 UUID Generator<br/>Thread ID Generation]
            Styling[🎨 CSS Modules<br/>Component Styling]
        end
    end
    
    App --> ContextProvider
    ContextProvider --> AppContent
    AppContent --> Login
    AppContent --> Signup
    AppContent --> Slidebar
    AppContent --> ChatWindow
    ChatWindow --> Chat
    
    ContextProvider --> AuthState
    ContextProvider --> ChatState
    ContextProvider --> ThreadState
    
    Login --> APIConfig
    Signup --> APIConfig
    Slidebar --> APIConfig
    ChatWindow --> APIConfig
    
    APIConfig --> APIEndpoints
    APIConfig --> APIHelper
    
    Slidebar --> UUID
    ContextProvider --> UUID
    
    App --> Styling
    Login --> Styling
    Signup --> Styling
    Slidebar --> Styling
    ChatWindow --> Styling
    Chat --> Styling
    
    style App fill:#e8f5e8
    style ContextProvider fill:#f3e5f5
    style Login fill:#e1f5fe
    style Signup fill:#e1f5fe
    style Slidebar fill:#fff3e0
    style ChatWindow fill:#fff3e0
    style APIConfig fill:#ffebee
```

### 🖥️ Backend Architecture Deep Dive

```mermaid
graph TB
    subgraph "🚀 Express.js Server Architecture"
        ServerEntry[🎯 server.js<br/>Application Entry Point]
        
        subgraph "🔧 Middleware Stack"
            TrustProxy[🛡️ Trust Proxy<br/>Production Security]
            CORSMiddleware[🌐 CORS Configuration<br/>Cross-Origin Requests]
            JSONParser[📝 JSON Body Parser<br/>Request Processing]
            SessionMiddleware[🎫 Express Session<br/>Session Management]
        end
        
        subgraph "🛣️ Route Handlers"
            AuthRoutes[🔐 auth.js<br/>Authentication Routes]
            ChatRoutes[💬 chat.js<br/>Chat & Thread Routes]
        end
        
        subgraph "🔐 Authentication System"
            AuthMiddleware[🛡️ auth.js<br/>Authentication Middleware]
            RequireAuth[🔒 requireAuth<br/>Protected Route Guard]
            RequireGuest[👤 requireGuest<br/>Guest Only Routes]
            OptionalAuth[🔓 optionalAuth<br/>Optional Authentication]
        end
        
        subgraph "⚙️ Business Logic"
            UserController[👥 User Management<br/>Registration, Login, Logout]
            ChatController[💬 Chat Processing<br/>Message Handling]
            ThreadController[📋 Thread Management<br/>CRUD Operations]
        end
        
        subgraph "🌍 External Integrations"
            OpenAIUtil[🤖 openai.js<br/>OpenAI API Integration]
            PasswordHash[🔐 bcryptjs<br/>Password Hashing]
        end
        
        subgraph "🗄️ Data Models"
            UserModel[👤 User.js<br/>User Schema & Methods]
            ThreadModel[💬 Thread.js<br/>Thread Schema & Methods]
        end
    end
    
    ServerEntry --> TrustProxy
    TrustProxy --> CORSMiddleware
    CORSMiddleware --> JSONParser
    JSONParser --> SessionMiddleware
    
    SessionMiddleware --> AuthRoutes
    SessionMiddleware --> ChatRoutes
    
    AuthRoutes --> AuthMiddleware
    ChatRoutes --> AuthMiddleware
    
    AuthMiddleware --> RequireAuth
    AuthMiddleware --> RequireGuest
    AuthMiddleware --> OptionalAuth
    
    AuthRoutes --> UserController
    ChatRoutes --> ChatController
    ChatRoutes --> ThreadController
    
    UserController --> PasswordHash
    ChatController --> OpenAIUtil
    
    UserController --> UserModel
    ChatController --> ThreadModel
    ThreadController --> ThreadModel
    
    style ServerEntry fill:#fff3e0
    style AuthRoutes fill:#e1f5fe
    style ChatRoutes fill:#e8f5e8
    style AuthMiddleware fill:#ffebee
    style UserController fill:#f3e5f5
```

### 🗄️ Database Schema and Relationships

```mermaid
erDiagram
    User {
        ObjectId _id PK "🆔 Primary Key"
        String username UK "👤 Unique username"
        String email UK "📧 Unique email address"
        String password "🔐 Hashed password"
        Date createdAt "📅 Account creation timestamp"
        Date updatedAt "🔄 Last update timestamp"
    }
    
    Thread {
        ObjectId _id PK "🆔 Primary Key"
        String threadid UK "🔗 UUID thread identifier"
        ObjectId userId FK "👤 Reference to User"
        String title "📝 Thread title (first message)"
        Array messages "💬 Array of message objects"
        Date updatedat "🕒 Last message timestamp"
        Date createdAt "📅 Thread creation timestamp"
    }
    
    Message {
        String role "🎭 user or assistant"
        String content "💬 Message content"
        Date timestamp "🕒 Message timestamp"
    }
    
    Session {
        String _id PK "🆔 Session ID"
        Object session "🎫 Session data"
        Date expires "⏰ Session expiration"
    }
    
    User ||--o{ Thread : "owns"
    Thread ||--o{ Message : "contains"
    User ||--o{ Session : "has"
```

### 🔐 Authentication Flow Architecture

```mermaid
sequenceDiagram
    participant Client as 🖥️ React Client
    participant API as 🚀 Express API
    participant Auth as 🛡️ Auth Middleware
    participant DB as 🗄️ MongoDB
    participant Session as 🎫 Session Store
    
    Note over Client,Session: 📝 User Registration Flow
    Client->>API: POST /api/auth/signup
    API->>DB: Check existing user
    DB-->>API: User exists check result
    API->>API: Hash password (bcrypt)
    API->>DB: Create new user
    DB-->>API: ✅ User created
    API->>Session: Create session
    Session-->>API: 🎫 Session ID
    API-->>Client: 🍪 Set-Cookie + User data
    
    Note over Client,Session: 🔑 User Login Flow
    Client->>API: POST /api/auth/login
    API->>DB: Find user by email
    DB-->>API: 👤 User data
    API->>API: Compare password (bcrypt)
    API->>Session: Create session
    Session-->>API: 🎫 Session ID
    API-->>Client: 🍪 Set-Cookie + User data
    
    Note over Client,Session: 🔒 Protected Route Access
    Client->>API: Request with session cookie
    API->>Auth: Validate session
    Auth->>Session: Check session validity
    Session-->>Auth: 🎫 Session data
    Auth->>DB: Verify user exists
    DB-->>Auth: 👤 User data
    Auth->>API: Attach user to request
    API->>API: Process protected route
    API-->>Client: 🔓 Protected resource
    
    Note over Client,Session: 🚪 Logout Flow
    Client->>API: POST /api/auth/logout
    API->>Session: Destroy session
    Session-->>API: ❌ Session destroyed
    API-->>Client: 🍪 Clear cookie + Success
```

### 💬 Chat Message Flow Architecture

```mermaid
sequenceDiagram
    participant UI as 🎨 Chat UI
    participant State as 🗃️ React State
    participant API as 🔌 API Client
    participant Server as 🚀 Express Server
    participant Auth as 🛡️ Auth Middleware
    participant DB as 🗄️ MongoDB
    participant OpenAI as 🤖 OpenAI API
    
    Note over UI,OpenAI: 💬 Complete Chat Message Flow
    
    UI->>State: 👤 User types message
    State->>State: ✅ Validate input (threadId, message)
    State->>UI: ⏳ Show loading state
    State->>API: POST /api/chat {threadId, message}
    
    API->>Server: 🌐 HTTP Request with session cookie
    Server->>Auth: 🔐 Validate authentication
    Auth->>Auth: 🎫 Check session & user
    Auth->>Server: ✅ User authenticated
    
    Server->>DB: 🔍 Find thread by threadId + userId
    DB-->>Server: 📋 Thread data or null
    
    alt Thread exists
        Server->>Server: ➕ Add user message to thread
    else New thread
        Server->>Server: 🆕 Create new thread with message
    end
    
    Server->>OpenAI: 🤖 Send message to GPT API
    OpenAI-->>Server: 🎯 AI response
    
    Server->>Server: ➕ Add AI response to thread
    Server->>DB: 💾 Save updated thread
    DB-->>Server: ✅ Save confirmation
    
    Server-->>API: 📤 Return AI response
    API-->>State: 🔄 Update chat state
    State->>UI: 💬 Display AI response with typing effect
    State->>UI: ❌ Hide loading state
    State->>State: 🧹 Clear input field
    
    Note over UI,State: 🔄 Update thread list if new thread
    State->>API: GET /api/thread (refresh threads)
    API-->>State: 📋 Updated thread list
    State->>UI: 🔄 Update sidebar
```

### 📋 Thread Management Architecture

```mermaid
graph TB
    subgraph "🔄 Thread Lifecycle Management"
        CreateThread[🆕 Create New Thread<br/>UUID Generation]
        LoadThreads[📋 Load User Threads<br/>Filtered by userId]
        SwitchThread[🔄 Switch Active Thread<br/>Load Messages]
        DeleteThread[🗑️ Delete Thread<br/>Cascade Delete Messages]
        UpdateThread[📝 Update Thread<br/>Add Messages, Update Timestamp]
    end
    
    subgraph "⚙️ Thread Operations"
        ThreadValidation[✅ Thread Validation<br/>User Ownership Check]
        MessagePersistence[💾 Message Persistence<br/>User + Assistant Messages]
        ThreadSorting[📊 Thread Sorting<br/>By Last Update Time]
        ThreadFiltering[🔍 Thread Filtering<br/>User Isolation]
    end
    
    subgraph "🎨 UI Thread Management"
        ThreadSidebar[📋 Thread Sidebar<br/>List All Threads]
        ActiveThread[🎯 Active Thread Indicator<br/>Highlight Current]
        ThreadActions[⚙️ Thread Actions<br/>Delete, Switch]
        NewChatButton[➕ New Chat Button<br/>Create Fresh Thread]
    end
    
    CreateThread --> ThreadValidation
    LoadThreads --> ThreadFiltering
    SwitchThread --> ThreadValidation
    DeleteThread --> ThreadValidation
    UpdateThread --> MessagePersistence
    
    ThreadValidation --> ThreadSorting
    MessagePersistence --> ThreadSorting
    ThreadFiltering --> ThreadSorting
    
    ThreadSidebar --> LoadThreads
    ActiveThread --> SwitchThread
    ThreadActions --> DeleteThread
    ThreadActions --> SwitchThread
    NewChatButton --> CreateThread
    
    style CreateThread fill:#e8f5e8
    style LoadThreads fill:#e1f5fe
    style SwitchThread fill:#fff3e0
    style DeleteThread fill:#ffebee
    style ThreadSidebar fill:#f3e5f5
```

### 🛡️ Security Architecture

```mermaid
graph TB
    subgraph "🔐 Authentication Security"
        PasswordSecurity[🔒 Password Security<br/>bcrypt Hashing + Salt]
        SessionSecurity[🎫 Session Security<br/>HTTP-Only Cookies]
        CSRFProtection[🛡️ CSRF Protection<br/>SameSite Cookies]
        SessionExpiry[⏰ Session Expiry<br/>Configurable TTL]
    end
    
    subgraph "🔒 Authorization Security"
        RouteProtection[🛡️ Route Protection<br/>Authentication Middleware]
        UserIsolation[👤 Data Isolation<br/>User-Scoped Queries]
        OwnershipValidation[✅ Ownership Validation<br/>Resource Access Control]
    end
    
    subgraph "🗄️ Data Security"
        InputValidation[✅ Input Validation<br/>Required Fields Check]
        DataSanitization[🧹 Data Sanitization<br/>XSS Prevention]
        ErrorHandling[🚨 Secure Error Handling<br/>No Data Leakage]
        EnvironmentSecurity[🔐 Environment Security<br/>Secret Management]
    end
    
    subgraph "🌐 Network Security"
        CORSConfiguration[🌐 CORS Configuration<br/>Origin Validation]
        HTTPSEnforcement[🔒 HTTPS Enforcement<br/>Secure Transport]
        RateLimiting[⚡ Rate Limiting<br/>API Abuse Prevention]
    end
    
    PasswordSecurity --> SessionSecurity
    SessionSecurity --> CSRFProtection
    CSRFProtection --> SessionExpiry
    
    RouteProtection --> UserIsolation
    UserIsolation --> OwnershipValidation
    
    InputValidation --> DataSanitization
    DataSanitization --> ErrorHandling
    ErrorHandling --> EnvironmentSecurity
    
    CORSConfiguration --> HTTPSEnforcement
    HTTPSEnforcement --> RateLimiting
    
    style PasswordSecurity fill:#ffebee
    style SessionSecurity fill:#e8f5e8
    style RouteProtection fill:#e1f5fe
    style InputValidation fill:#fff3e0
    style CORSConfiguration fill:#f3e5f5
```

### ☁️ Deployment Architecture

```mermaid
graph TB
    subgraph "💻 Development Environment"
        DevFE[🖥️ Local Frontend<br/>Vite Dev Server<br/>localhost:5173]
        DevBE[🖥️ Local Backend<br/>Node.js Server<br/>localhost:8080]
        DevDB[🗄️ Local MongoDB<br/>localhost:27017]
    end
    
    subgraph "☁️ Production Environment"
        ProdCDN[⚡ CDN<br/>Static Asset Delivery]
        ProdFE[🚀 Frontend Hosting<br/>Render/Vercel<br/>Static Build]
        ProdLB[⚖️ Load Balancer<br/>Traffic Distribution]
        ProdBE[🚀 Backend Hosting<br/>Render/Railway<br/>Node.js Runtime]
        ProdDB[☁️ MongoDB Atlas<br/>Cloud Database]
        ProdCache[🗄️ Redis Cache<br/>Session Storage]
    end
    
    subgraph "🔄 CI/CD Pipeline"
        GitRepo[📁 Git Repository<br/>Source Code]
        BuildProcess[🔨 Build Process<br/>Automated Testing]
        Deployment[🚀 Automated Deployment<br/>Zero Downtime]
        Monitoring[📊 Application Monitoring<br/>Health Checks]
    end
    
    subgraph "🌍 External Services"
        OpenAIService[🤖 OpenAI API<br/>GPT Integration]
        EmailService[📧 Email Service<br/>Notifications]
        LoggingService[📝 Logging Service<br/>Error Tracking]
    end
    
    DevFE --> DevBE
    DevBE --> DevDB
    
    ProdCDN --> ProdFE
    ProdFE --> ProdLB
    ProdLB --> ProdBE
    ProdBE --> ProdDB
    ProdBE --> ProdCache
    
    GitRepo --> BuildProcess
    BuildProcess --> Deployment
    Deployment --> Monitoring
    
    ProdBE --> OpenAIService
    ProdBE --> EmailService
    ProdBE --> LoggingService
    
    style DevFE fill:#e8f5e8
    style DevBE fill:#fff3e0
    style ProdFE fill:#e1f5fe
    style ProdBE fill:#ffebee
    style GitRepo fill:#f3e5f5
```

### 🔌 API Architecture and Endpoints

```mermaid
graph TB
    subgraph "🌐 API Gateway Layer"
        APIGateway[🚪 API Gateway<br/>Request Routing]
        RateLimiter[⚡ Rate Limiter<br/>Request Throttling]
        RequestLogger[📝 Request Logger<br/>Audit Trail]
    end
    
    subgraph "🔐 Authentication Endpoints"
        SignupEndpoint[📝 POST /api/auth/signup<br/>User Registration]
        LoginEndpoint[🔑 POST /api/auth/login<br/>User Authentication]
        LogoutEndpoint[🚪 POST /api/auth/logout<br/>Session Termination]
        MeEndpoint[👤 GET /api/auth/me<br/>Auth Status Check]
    end
    
    subgraph "💬 Chat Endpoints"
        ChatEndpoint[💬 POST /api/chat<br/>Send Message & Get Response]
        ThreadsEndpoint[📋 GET /api/thread<br/>Get User Threads]
        ThreadDetailEndpoint[📄 GET /api/thread/:id<br/>Get Thread Messages]
        DeleteThreadEndpoint[🗑️ DELETE /api/thread/:id<br/>Delete Thread]
    end
    
    subgraph "🔧 Middleware Chain"
        CORSHandler[🌐 CORS Handler<br/>Cross-Origin Requests]
        BodyParser[📝 Body Parser<br/>JSON Processing]
        SessionHandler[🎫 Session Handler<br/>Session Management]
        AuthHandler[🛡️ Auth Handler<br/>Route Protection]
    end
    
    APIGateway --> RateLimiter
    RateLimiter --> RequestLogger
    RequestLogger --> CORSHandler
    
    CORSHandler --> BodyParser
    BodyParser --> SessionHandler
    SessionHandler --> AuthHandler
    
    AuthHandler --> SignupEndpoint
    AuthHandler --> LoginEndpoint
    AuthHandler --> LogoutEndpoint
    AuthHandler --> MeEndpoint
    
    AuthHandler --> ChatEndpoint
    AuthHandler --> ThreadsEndpoint
    AuthHandler --> ThreadDetailEndpoint
    AuthHandler --> DeleteThreadEndpoint
    
    style APIGateway fill:#e1f5fe
    style SignupEndpoint fill:#e8f5e8
    style LoginEndpoint fill:#e8f5e8
    style ChatEndpoint fill:#fff3e0
    style ThreadsEndpoint fill:#fff3e0
    style CORSHandler fill:#f3e5f5
```

### 🚨 Error Handling and Monitoring Architecture

```mermaid
graph TB
    subgraph "🎨 Frontend Error Handling"
        ErrorBoundary[🛡️ React Error Boundary<br/>Component Error Catching]
        APIErrorHandler[🔌 API Error Handler<br/>Network Error Management]
        UserFeedback[💬 User Feedback<br/>Error Messages & Loading States]
        FallbackUI[🎨 Fallback UI<br/>Graceful Degradation]
    end
    
    subgraph "🖥️ Backend Error Handling"
        GlobalErrorHandler[🌐 Global Error Handler<br/>Centralized Error Processing]
        ValidationErrors[✅ Validation Errors<br/>Input Validation Failures]
        AuthenticationErrors[🔐 Authentication Errors<br/>Auth Failure Handling]
        DatabaseErrors[🗄️ Database Errors<br/>Connection & Query Failures]
    end
    
    subgraph "📊 Monitoring and Logging"
        ApplicationLogs[📝 Application Logs<br/>Request/Response Logging]
        ErrorLogs[🚨 Error Logs<br/>Exception Tracking]
        PerformanceLogs[⚡ Performance Logs<br/>Response Time Monitoring]
        SecurityLogs[🛡️ Security Logs<br/>Auth Attempt Tracking]
    end
    
    subgraph "🔔 Alerting System"
        ErrorAlerts[🚨 Error Rate Alerts<br/>High Error Rate Detection]
        PerformanceAlerts[⚡ Performance Alerts<br/>Slow Response Detection]
        SecurityAlerts[🛡️ Security Alerts<br/>Suspicious Activity Detection]
        UptimeAlerts[📊 Uptime Alerts<br/>Service Availability Monitoring]
    end
    
    ErrorBoundary --> APIErrorHandler
    APIErrorHandler --> UserFeedback
    UserFeedback --> FallbackUI
    
    GlobalErrorHandler --> ValidationErrors
    GlobalErrorHandler --> AuthenticationErrors
    GlobalErrorHandler --> DatabaseErrors
    
    ApplicationLogs --> ErrorLogs
    ErrorLogs --> PerformanceLogs
    PerformanceLogs --> SecurityLogs
    
    ErrorAlerts --> PerformanceAlerts
    PerformanceAlerts --> SecurityAlerts
    SecurityAlerts --> UptimeAlerts
    
    style ErrorBoundary fill:#ffebee
    style GlobalErrorHandler fill:#fff3e0
    style ApplicationLogs fill:#e8f5e8
    style ErrorAlerts fill:#e1f5fe
```

### Frontend Architecture (React + Vite)

#### Component Hierarchy
```
App.jsx
├── MyContextProvider (Global State)
│   ├── AppContent
│   │   ├── Login.jsx (Unauthenticated)
│   │   ├── Signup.jsx (Unauthenticated)
│   │   └── Authenticated Layout
│   │       ├── Slidebar.jsx (Thread Management)
│   │       └── ChatWindow.jsx (Main Chat Interface)
│   │           └── Chat.jsx (Message Display)
```

#### State Management
- **MyContext.jsx**: Centralized state using React Context API
  - Authentication state (`user`, `isAuthenticated`, `authLoading`)
  - Chat state (`prompt`, `reply`, `currThreadId`, `prevChats`)
  - Thread management (`allThreads`, `newChat`)

#### API Configuration
- **config/api.js**: Centralized API endpoint management
  - Environment-based URL switching (local/production)
  - Consistent fetch options with credentials
  - Helper functions for API calls

### Backend Architecture (Node.js + Express)

#### Server Structure
```
server.js (Main Entry Point)
├── CORS Configuration
├── Session Management (MongoDB Store)
├── Route Handlers
│   ├── /api/auth/* (Authentication Routes)
│   └── /api/* (Chat & Thread Routes)
└── Database Connection (Mongoose)
```

#### Middleware Stack
1. **CORS**: Cross-origin resource sharing with credentials
2. **Express Session**: Session-based authentication with MongoDB store
3. **JSON Parser**: Request body parsing
4. **Authentication Middleware**: Route protection

#### Route Architecture
```
routes/
├── auth.js
│   ├── POST /signup (User Registration)
│   ├── POST /login (User Authentication)
│   ├── POST /logout (Session Termination)
│   └── GET /me (Auth Status Check)
└── chat.js
    ├── POST /chat (Send Message & Get AI Response)
    ├── GET /thread (Get User's Threads)
    ├── GET /thread/:id (Get Thread Messages)
    └── DELETE /thread/:id (Delete Thread)
```

### Database Schema (MongoDB)

#### User Model
```javascript
{
  _id: ObjectId,
  username: String (unique, required),
  email: String (unique, required),
  password: String (hashed with bcrypt),
  createdAt: Date,
  updatedAt: Date
}
```

#### Thread Model
```javascript
{
  _id: ObjectId,
  threadid: String (UUID, unique),
  userId: ObjectId (ref: User),
  title: String (first message),
  messages: [{
    role: String ('user' | 'assistant'),
    content: String,
    timestamp: Date
  }],
  updatedat: Date,
  createdAt: Date
}
```

#### Session Store
- MongoDB-based session storage using `connect-mongo`
- Session data includes `userId` and `username`
- Automatic session cleanup and expiration

### Authentication Flow

```
1. User Registration/Login
   ├── Frontend sends credentials
   ├── Backend validates & creates session
   ├── Session stored in MongoDB
   └── Session cookie sent to client

2. Protected Route Access
   ├── Frontend sends request with session cookie
   ├── Backend validates session via middleware
   ├── User data attached to request object
   └── Route handler processes authenticated request

3. Logout
   ├── Frontend calls logout endpoint
   ├── Backend destroys session
   ├── Session removed from MongoDB
   └── Cookie cleared on client
```

### Chat Flow Architecture

```
1. Message Sending
   ├── User types message in ChatWindow
   ├── Frontend validates (thread ID, message content)
   ├── POST request to /api/chat with threadid & message
   └── Loading state activated

2. Backend Processing
   ├── Authentication middleware validates session
   ├── Find or create thread in database
   ├── Add user message to thread
   ├── Call OpenAI API for response
   ├── Add AI response to thread
   ├── Update thread timestamp
   └── Return AI response to frontend

3. Frontend Update
   ├── Receive AI response
   ├── Update chat history in context
   ├── Display message with typing effect
   ├── Clear input and loading state
   └── Refresh thread list if new thread
```

### Environment Configuration

#### Development Environment
```
Backend:
- MONGODB_URI: Local MongoDB instance
- FRONTEND_URL: http://localhost:5173
- NODE_ENV: development
- Session: secure=false, sameSite='lax'

Frontend:
- VITE_API_URL: http://localhost:8080
- VITE_NODE_ENV: development
```

#### Production Environment
```
Backend:
- MONGODB_URI: MongoDB Atlas connection
- FRONTEND_URL: https://lepron-gpt-with-auth-frontend.onrender.com
- NODE_ENV: production
- Session: secure=true, sameSite='none'

Frontend:
- VITE_API_URL: https://lepron-gpt-with-auth.onrender.com
- VITE_NODE_ENV: production
```

### Security Implementation

#### Authentication Security
- **Password Hashing**: bcryptjs with salt rounds
- **Session Management**: Secure HTTP-only cookies
- **CSRF Protection**: SameSite cookie attribute
- **Route Protection**: Authentication middleware on all protected routes

#### Data Security
- **User Isolation**: All threads filtered by userId
- **Input Validation**: Required field validation on all endpoints
- **Error Handling**: Consistent error responses without data leakage
- **Environment Variables**: Sensitive data stored in .env files

### API Integration

#### OpenAI Integration
```javascript
// utils/openai.js
- Model: gpt-4o-mini
- Request format: Chat completions API
- Error handling: Network and API errors
- Response processing: Extract message content
```

### Deployment Architecture

#### Frontend (Render/Vercel)
- Static build deployment
- Environment variables configured
- CORS headers for API communication

#### Backend (Render/Railway)
- Node.js server deployment
- Environment variables for production
- MongoDB Atlas connection
- Session store configuration

#### Database (MongoDB Atlas)
- Cloud-hosted MongoDB cluster
- Connection string with authentication
- Automatic backups and scaling

### Performance Considerations

#### Frontend Optimizations
- React Context for efficient state management
- Conditional rendering for authentication states
- Lazy loading for chat history
- Debounced API calls

#### Backend Optimizations
- MongoDB indexing on frequently queried fields
- Session store with TTL for automatic cleanup
- Efficient thread filtering by user
- Connection pooling for database

### Error Handling Strategy

#### Frontend Error Handling
- Try-catch blocks for all API calls
- User-friendly error messages
- Loading states for better UX
- Fallback UI for failed states

#### Backend Error Handling
- Centralized error handling middleware
- Consistent error response format
- Logging for debugging
- Graceful degradation

This architecture ensures scalability, maintainability, and security while providing a smooth user experience for AI-powered conversations.

## Features

- 🔐 **User Authentication** - Secure signup/login with session-based auth
- 💬 **Real-time chat** with AI assistant
- 📝 **Multiple conversation threads** per user
- ⚡ **Typing effect** for AI responses
- 📱 **Responsive design**
- 🔄 **Thread management** (create, switch, delete)
- 💾 **Persistent chat history** with user isolation
- 🎨 **Modern UI** with Font Awesome icons
- 🛡️ **Secure sessions** stored in MongoDB

## Tech Stack

### Frontend
- **React** - UI framework
- **Vite** - Build tool and dev server
- **React Markdown** - Markdown rendering for AI responses
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database for data and session storage
- **Mongoose** - MongoDB ODM
- **OpenAI API** - AI chat completions
- **Express-session** - Session-based authentication
- **connect-mongo** - MongoDB session store
- **bcryptjs** - Password hashing

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- OpenAI API key

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-chat-app
   ```

2. **Install Backend Dependencies**
   ```bash
   cd Backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd Frontend
   npm install
   ```

4. **Environment Setup**

   Create a `.env` file in the `Backend` directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   MONGODB_URI=mongodb://localhost:27017/chatapp
   SESSION_SECRET=your_session_secret_key_here
   PORT=8080
   ```

## Running the Application

1. **Start the Backend Server**
   ```bash
   cd Backend
   npm start
   ```
   Server will run on `http://localhost:8080`

2. **Start the Frontend Development Server**
   ```bash
   cd Frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication Routes
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Check authentication status

### Chat Routes (Protected)
- `POST /api/chat` - Send message and get AI response
- `GET /api/thread` - Get user's conversation threads
- `GET /api/thread/:threadid` - Get specific thread messages
- `DELETE /api/thread/:threadid` - Delete a thread

## Project Structure

```
├── Backend/
│   ├── models/
│   │   ├── Thread.js          # Chat thread schema
│   │   └── User.js            # User schema with auth
│   ├── routes/
│   │   ├── auth.js            # Authentication routes
│   │   └── chat.js            # Chat API routes
│   ├── middleware/
│   │   └── auth.js            # Authentication middleware
│   ├── utils/
│   │   └── openai.js          # OpenAI integration
│   └── server.js              # Express server with session config
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chat.jsx       # Chat display component
│   │   │   ├── ChatWindow.jsx # Main chat interface
│   │   │   ├── Slidebar.jsx   # Thread sidebar
│   │   │   ├── Login.jsx      # Login component
│   │   │   └── Signup.jsx     # Signup component
│   │   ├── context/
│   │   │   └── MyContext.jsx  # React context with auth
│   │   └── App.jsx            # Main app with routing
│   └── index.html
└── README.md
```

## Usage

1. **Sign up** for a new account or **log in** with existing credentials
2. Once authenticated, you'll see the chat interface
3. **Start a new conversation** by typing a message
4. The AI will respond with a typing effect
5. **Create multiple threads** for different conversations
6. **Switch between threads** using the sidebar
7. **Delete threads** using the minus icon
8. **Log out** when finished


## Acknowledgments

- OpenAI for providing the GPT API
