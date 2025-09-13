 Smart Expense Tracker with AI Insights

A comprehensive financial tracking application that helps users monitor expenses, categorize spending, and receive AI-powered insights about their financial habits.

![Smart Expense Tracker](https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80)

##  Features

###  **Dashboard Overview**
- Clean, intuitive dashboard interface
- Expense summary with visual charts (pie/bar charts)
- Recent transactions display
- Budget progress tracking with color-coded warnings

###  **Expense Management**
- Easy expense entry form with smart auto-categorization
- Date selection and category management
- Transaction history and filtering

###  **AI-Powered Insights**
- Intelligent spending pattern analysis
- Anomaly detection for unusual expenses
- Trend identification and recommendations
- Smart categorization suggestions

###  **Budget Tracking**
- Visual budget progress indicators
- Color-coded warnings when approaching limits
- Goal setting and tracking
- Financial health monitoring

###  **User Experience**
- Modern, responsive design
- User profile management
- Preference settings
- Clean authentication system

##  Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smart-expense-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create a .env file in the root directory
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework

### UI Components
- **ShadCN/UI** - Beautiful, accessible component library
- **Lucide React** - Modern icon library
- **Recharts** - Responsive chart library

### Backend & Database
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Relational database
- **Real-time subscriptions** - Live data updates

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing

##  Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # ShadCN UI components
│   ├── AIInsightsPanel.tsx
│   ├── AddExpenseForm.tsx
│   ├── ExpenseSummary.tsx
│   └── TransactionsList.tsx
├── pages/               # Page components
│   ├── home.tsx         # Main dashboard
│   └── Login.tsx        # Authentication
├── lib/                 # Utility functions
├── types/               # TypeScript type definitions
├── stories/             # Storybook stories
└── main.tsx            # Application entry point
```

##  Component Library

The app uses a comprehensive set of UI components:

- **Forms**: Input, Label, Button, Select, Textarea
- **Layout**: Card, Separator, Tabs, Sheet
- **Feedback**: Alert, Toast, Progress, Skeleton
- **Navigation**: Dropdown Menu, Command, Pagination
- **Data Display**: Table, Badge, Avatar, Calendar

## Responsive Design

The application is fully responsive and optimized for:
-  Mobile devices (320px+)
-  Tablets (768px+)
-  Desktop (1024px+)
-  Large screens (1440px+)

##  Authentication

- Modern login interface with gradient design
- Social authentication (Google, GitHub)
- Password visibility toggle
- Remember me functionality
- Forgot password flow

##  Data Visualization

- Interactive pie charts for expense categories
- Bar charts for spending trends
- Progress bars for budget tracking
- Real-time data updates

##  AI Features

- **Smart Categorization**: Automatically categorizes expenses
- **Spending Insights**: Identifies unusual spending patterns
- **Trend Analysis**: Provides spending trend recommendations
- **Budget Alerts**: AI-powered budget warnings

##  Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

##  Development

### Run Storybook
```bash
npm run storybook
```

### Lint Code
```bash
npm run lint
```

### Type Check
```bash
npm run type-check
```

##  Performance

- **Vite** for lightning-fast development
- **Code splitting** for optimized loading
- **Lazy loading** for components
- **Optimized images** with proper sizing

## 🔧 Configuration

### Tailwind CSS
Custom configuration in `tailwind.config.js` with:
- Custom color palette
- Extended spacing scale
- Custom animations
- Dark mode support

### TypeScript
Strict TypeScript configuration for:
- Type safety
- Better IDE support
- Compile-time error checking

##  Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.




**Built using React, TypeScript, and Tailwind CSS**
