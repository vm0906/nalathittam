# Nala Thittam · Benefit Discovery Simplified

An elegant, bilingual (Tamil/English) web application that helps users discover government benefits, welfare schemes, certificates, and scholarships they're eligible for in Tamil Nadu.

## Features

- 🎯 **Smart Eligibility Engine** - Matches user profiles against a comprehensive scheme database
- 🌍 **Bilingual UI** - Full support for Tamil and English
- 🏛️ **Multi-Sector Schemes** - Covers education, agriculture, social welfare, healthcare, and more
- 📍 **e-Sevai Locator** - Find nearest government service centers with live hours and fees
- 📊 **Results Dashboard** - Clear breakdown of eligible schemes, partial matches, and gaps
- ⚡ **Fast & Responsive** - Built with React + Vite for optimal performance
- 📱 **Mobile-First Design** - Seamless experience across all devices

## Technology Stack

- **Frontend**: React 18.3.1
- **Build Tool**: Vite 8.x
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Styling**: Custom CSS with responsive design
- **State Management**: React Hooks

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/nala-thittam.git
cd nala-thittam-app
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## Project Structure

```
nala-thittam-app/
├── public/
│   ├── assets/
│   │   └── cat-playing-ball.gif (loader animation)
│   └── favicon.svg
├── src/
│   ├── App.jsx (main application component with all logic)
│   ├── index.css (responsive styling system)
│   ├── main.jsx (entry point)
│   └── assets/
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

## Usage

1. **Landing Page** - Introduces the platform and its benefits
2. **Guided Form** - 4-step questionnaire covering personal, social, educational, and economic details
3. **Loading State** - Animated processing while eligibility is calculated
4. **Results Dashboard** - Three-panel view:
   - Eligible Certificates
   - Eligible Schemes & Scholarships
   - Schemes with Missing Eligibility Criteria
5. **e-Sevai Locator** - Browse service centers by taluk with fees information

## Features Detail

### Eligibility Engine
The system evaluates user input against a comprehensive rule-based scheme matrix covering:
- Government scholarships (merit, SC/ST, minority)
- Farmer welfare schemes
- Women empowerment programs
- Healthcare subsidies
- Certificate issuance (Income, Community, etc.)

### Bilingual Support
Full Tamil (தமிழ்) and English interface with:
- Dynamic language switching
- Proper Unicode rendering
- Localized scheme names and descriptions

### Responsive Design
- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)
- Large screens (1200px+)

## API Integration

The app is designed to connect to a backend service at `/api/process-eligibility` for:
- Form validation
- Eligibility rule processing
- Scheme matching
- Certificate generation

See the `BACKEND_BLUEPRINT` in `App.jsx` for the API contract.

## License

MIT License - see LICENSE file for details

## Support & Contact

For issues, feature requests, or questions:
- Email: hello@nala.thittam
- GitHub Issues: [Create an issue](https://github.com/yourusername/nala-thittam/issues)

---

Built with ❤️ for Tamil Nadu
