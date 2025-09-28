# 🎯 AI Prediction dApp

> A decentralized prediction platform powered by AI and Chainlink oracles, where smart contracts meet artificial intelligence for trustless, automated outcome resolution.


<p align="center">   
<img width="45%" alt="image" src="https://github.com/user-attachments/assets/43cd040d-5fef-4288-9c66-4565d77aeabe" />
<img width="45%" alt="image" src="https://github.com/user-attachments/assets/9fc8a52c-aeca-46b2-b280-b946e2d8ee66" />
</p>

<p align="center">   
<img width="45%" alt="Screenshot 2025-09-28 163937" src="https://github.com/user-attachments/assets/e5884595-fe5e-4f8f-97c4-6094c0642712" />
<img width="45%" alt="Screenshot 2025-09-28 153730" src="https://github.com/user-attachments/assets/5d172353-6c94-4fab-9590-b396ee7b06d3" />
</p>

<p align="center">   
<img width="45%" alt="Screenshot 2025-09-28 153652" src="https://github.com/user-attachments/assets/8780aa31-bb22-4216-8ac9-ddd836f65d2f" />
<img  width="45%" alt="image" src="https://github.com/user-attachments/assets/de90e818-d36d-42d7-b616-9911c276494b" />
</p>


## 🌟 Overview

This dApp revolutionizes prediction markets by combining blockchain technology with AI-powered outcome resolution. Users can create and bet on future events, with AI automatically determining results using trusted data sources through Chainlink Functions.

### ✨ Key Features

- **🤖 AI-Powered Resolution**: No human intervention - AI analyzes trusted sources to determine outcomes
- **🔗 Chainlink Integration**: Secure off-chain computations with on-chain verification
- **💰 Decentralized Betting**: Place bets on sports, politics, pop culture, and custom events
- **🔐 Smart Contract Security**: Built-in protection against reentrancy and contract-based attacks
- **📱 Modern UI/UX**: Responsive design with real-time updates and multi-language support
- **👛 Web3 Ready**: Connect any wallet - MetaMask, WalletConnect, and more

## 🏗️ Technology Stack

### Frontend

- **Nuxt 3** - Vue.js framework for production
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first styling
- **Shadcn/ui** - Modern component library
- **Wagmi** - React hooks for Ethereum
- **Viem** - TypeScript interface for Ethereum

### Backend & Blockchain

- **Smart Contracts** - Solidity on Ethereum
- **Chainlink Functions** - Decentralized oracle network
- **Chainlink Price Feeds** - Real-time ETH/USD pricing
- **Prisma** - Database ORM
- **PostgreSQL** - Database

### Development Tools

- **Vee-validate** - Form validation
- **Vue Query** - Data fetching and caching
- **ESLint** - Code linting
- **Vue i18n** - Internationalization

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Git
- MetaMask or compatible Web3 wallet

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/mayar4ki/prediction-web-app.git
   cd prediction-web-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Environment Setup**

   ```bash
   cp .env.example .env
   ```

   Configure your environment variables:

   - `DATABASE_URL` - PostgreSQL connection string
   - `VITE_WALLET_CONNECT_PROJECT_ID` - WalletConnect project ID
   - `VITE_AI_PREDICTION_V1_CONTRACT_ADDRESS` - Smart contract address

4. **Database Setup**

   ```bash
   npx prisma migrate
   npx prisma db seed
   ```

5. **Start Development Server**

   ```bash
   yarn dev
   ```

   Visit `http://localhost:3000` to see the app in action!

## 📖 How It Works

### 1. Create Predictions

Users can create prediction markets for future events by:

- Setting a question/prompt for the AI to evaluate
- Defining lock and close timestamps
- Paying the oracle fee for AI & oracle

### 2. Place Bets

Other users can bet on outcomes:

- **YES** - Betting the event will happen
- **NO** - Betting the event won't happen
- Minimum bet amounts and fees are enforced by smart contracts

### 3. AI Resolution

When the prediction period ends:

- Chainlink Functions triggers AI analysis
- AI evaluates trusted sources and data
- Smart contract receives the result automatically
- No human intervention required

### 4. Claim Rewards

Winners can claim their rewards:

- Automatic calculation of winnings
- Proportional distribution based on betting amounts
- House fees and creator fees are deducted

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

The app supports static site generation and can be deployed to:

- Vercel
- Netlify
- GitHub Pages
- Any static hosting provider

## 🛠️ Development

### Project Structure

```
app/
├── components/          # Vue components
│   ├── bet/            # Betting related components
│   ├── home/           # Landing page components
│   └── ui/             # Reusable UI components
├── composables/        # Vue composables for blockchain interaction
├── pages/              # Application routes
├── _config/            # Smart contract configurations
│   ├── ai-prediction-v1/  # Main contract ABI & address
│   └── eth-usd-price-feed/ # Chainlink price feed
└── _types/             # TypeScript type definitions

server/
├── api/                # API endpoints
├── prisma/             # Database schema and migrations
└── lib/                # Server utilities
```

### Key Composables

- `useCreateBet` - Create new prediction rounds
- `usePlaceBet` - Place YES/NO bets
- `useBetResolver` - Trigger AI resolution
- `useClaimBet` - Claim winnings
- `useBetIndex` - Fetch prediction data

## 🔗 Chainlink Integration

This dApp leverages Chainlink's decentralized oracle network:

- **Chainlink Functions** - Execute AI computations off-chain
- **Price Feeds** - Get real-time ETH/USD conversion rates
- **DON (Decentralized Oracle Network)** - Ensure computation integrity

## 🌍 Multi-Language Support

Supported languages:

- 🇺🇸 English
- 🇯🇵 Japanese
- 🇻🇳 Vietnamese
- 🇨🇳 Chinese (Simplified)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

Copyright © 2025 mayar4ki. All Rights Reserved.

This project and its source code are proprietary and confidential. Unauthorized copying, modification, distribution, or use of this software is strictly prohibited.

## 🔮 Roadmap

- [ ] Additional blockchain networks
- [ ] multiple AI models
- [ ] Social features and leaderboards
