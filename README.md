# 🦷 Bays Dental Analytics Dashboard

A **premium, intelligent dashboard** for dental practice analytics with advanced filtering, interactive charts, and comprehensive data visualization.

## ✨ Features

### 🎨 **Premium Design**
- **Glassmorphism UI** with backdrop blur effects
- **Animated backgrounds** with particle effects
- **Premium icons** throughout the interface
- **Responsive design** for all devices
- **Smooth animations** and transitions

### 🎛️ **Advanced Filtering System**
- **Dynamic filter selection** with multi-select dropdown
- **Real-time filtering** by multiple criteria:
  - Offices
  - Insurance Carriers
  - Claim Status
  - Interaction Types
  - Email Addresses
  - How We Proceeded
  - Escalated To
  - Comments/Reasons
- **Date range filtering** with timestamp by interaction
- **Search functionality** for patient names
- **Filter persistence** and state management

### 📊 **Interactive Analytics**
- **6 Premium Charts** with coherent metrics:
  - 📊 Claim Status Distribution (Doughnut)
  - 💰 Revenue by Office (Bar)
  - 🏦 Performance by Insurance Carrier (Bar)
  - 📈 Monthly Revenue Trends (Line)
  - 🔄 Interaction Types (Doughnut)
  - 💵 Average Payment by Status (Bar)
- **Chart type switching** (Bar, Line, Doughnut, Polar Area)
- **Real-time data updates** based on filters
- **Professional color schemes** and animations

### 📥 **Export Functionality**
- **Excel Export** (CSV format) with all patient data
- **PDF Export** with professional report layout
- **Automatic file naming** with current date
- **Complete data export** including filtered results

### 🔗 **Google Apps Script Integration**
- **Real-time data fetching** from Google Sheets
- **Automatic data validation** and error handling
- **Fallback to sample data** when connection fails
- **CORS handling** for cross-origin requests

## 🚀 Quick Start

### Option 1: Deploy to Vercel (Recommended)

1. **Visit [vercel.com](https://vercel.com)**
2. **Create a free account**
3. **Click "New Project"**
4. **Upload the entire `Overview` folder**
5. **Vercel will automatically detect Next.js**
6. **Click "Deploy"**
7. **Get your live URL in minutes!**

### Option 2: Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 📁 Project Structure

```
Overview/
├── app/
│   └── page.tsx              # Main dashboard component
├── components/
│   ├── charts-section.tsx    # Interactive charts
│   ├── dashboard-header.tsx  # Premium header
│   ├── data-table.tsx        # Patient records table
│   ├── filter-sidebar.tsx    # Advanced filters
│   ├── loading-indicator.tsx # Loading states
│   ├── metrics-grid.tsx      # Statistics cards
│   └── notification-system.tsx # User feedback
├── lib/
│   └── google-script.ts      # Google Apps Script integration
├── package.json              # Dependencies and scripts
├── tailwind.config.js        # Tailwind CSS configuration
├── next.config.js           # Next.js configuration
└── tsconfig.json            # TypeScript configuration
```

## 🛠️ Technologies Used

- **Next.js 14** - React framework with App Router
- **React 18** - UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Google Apps Script** - Backend data source
- **Vercel** - Deployment platform

## 📊 Data Schema

```typescript
interface PatientRecord {
  timestamp: string
  insurancecarrier: string
  offices: string
  patientname: string
  paidamount: number
  claimstatus: string
  typeofinteraction?: string
  patientdob?: string
  dos?: string
  productivityamount?: number
  missingdocsorinformation?: string
  howweproceeded?: string
  escalatedto?: string
  commentsreasons?: string
  emailaddress?: string
  status?: string
  timestampbyinteraction?: string
}
```

## 🎯 Key Features

### **Smart Filtering**
- **Multi-select dropdown** for filter types
- **Individual filter dropdowns** with checkboxes
- **Real-time filtering** with visual feedback
- **Filter count indicators** and summaries

### **Premium Charts**
- **6 different chart types** with meaningful metrics
- **Interactive chart switching** (Bar, Line, Doughnut, Polar Area)
- **Professional color schemes** for each data type
- **Responsive chart layouts** for all screen sizes

### **Data Export**
- **Excel export** with complete patient data
- **PDF reports** with professional formatting
- **Filtered data export** based on current selections
- **Automatic file naming** with timestamps

### **User Experience**
- **Loading states** with animated indicators
- **Error handling** with user-friendly messages
- **Responsive design** for mobile and desktop
- **Smooth animations** and transitions

## 🔧 Configuration

### Environment Variables
```env
# Google Apps Script URL (optional)
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=your_script_url_here
```

### Google Apps Script Setup
1. Create a new Google Apps Script project
2. Copy the provided script code
3. Deploy as web app
4. Set the URL in your environment variables

## 📱 Responsive Design

- **Mobile-first** approach
- **Tablet optimization** for medium screens
- **Desktop enhancement** for large displays
- **Touch-friendly** interactions

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (`from-blue-500 to-purple-600`)
- **Success**: Green (`#10B981`)
- **Warning**: Yellow (`#F59E0B`)
- **Error**: Red (`#EF4444`)
- **Neutral**: Slate (`#64748B`)

### Typography
- **Headings**: Bold with gradient text effects
- **Body**: Clean, readable fonts
- **Labels**: Medium weight for clarity

### Components
- **Glassmorphism cards** with backdrop blur
- **Gradient buttons** with hover effects
- **Animated icons** and transitions
- **Professional spacing** and layout

## 🚀 Deployment

### Vercel (Recommended)
- **Automatic deployment** from Git
- **SSL certificate** included
- **Global CDN** for fast loading
- **Preview deployments** for testing

### Other Platforms
- **Netlify**: Compatible with Next.js
- **AWS Amplify**: Full-stack deployment
- **Railway**: Simple deployment
- **Heroku**: Traditional hosting

## 📈 Performance

- **Optimized bundle** size
- **Lazy loading** for charts
- **Memoized calculations** for filters
- **Efficient re-renders** with React hooks

## 🔒 Security

- **CORS handling** for external APIs
- **Input validation** for user data
- **Error boundaries** for graceful failures
- **Secure data transmission** with HTTPS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- **Documentation**: Check this README
- **Issues**: Create a GitHub issue
- **Email**: Contact the development team

## 🎉 Acknowledgments

- **Next.js team** for the amazing framework
- **Tailwind CSS** for the utility-first approach
- **Vercel** for seamless deployment
- **Google Apps Script** for backend integration

---

**Built with ❤️ for Bays Dental Group** 