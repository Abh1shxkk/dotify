# 🎯 Dotify - Gmail Email Variation Generator

<div align="center">

![Dotify Logo](public/logo.png)

**Generate thousands of valid Gmail email variations using dots for filtering, tracking, and organizing your digital life.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-dotify--one.vercel.app-00C853?style=for-the-badge&logo=vercel)](https://dotify-one.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Abh1shxkk-181717?style=for-the-badge&logo=github)](https://github.com/Abh1shxkk)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

[Live Demo](https://dotify-one.vercel.app) • [Report Bug](https://github.com/Abh1shxkk/dotify/issues) • [Request Feature](https://github.com/Abh1shxkk/dotify/issues)

</div>

---

## 📖 About

**Dotify** is a powerful web application that generates all possible email variations of a Gmail address by strategically placing dots in the username. Gmail ignores dots in email addresses, meaning `example@gmail.com` and `e.x.a.m.p.l.e@gmail.com` all point to the same inbox!

This tool helps you create unique email aliases for:
- 📧 **Email Filtering** - Organize emails by source
- 🔍 **Tracking Signups** - Know which service shared your email
- 🛡️ **Privacy Protection** - Use unique emails for different services
- 📊 **A/B Testing** - Track different campaign sources

---

## ✨ Features

- 🚀 **Instant Generation** - Generate all possible email variations in milliseconds
- 📋 **One-Click Copy** - Copy individual variations or all at once
- 📄 **Export Options** - Download as TXT or CSV file
- 🌓 **Dark/Light Mode** - Beautiful UI with theme toggle
- 📱 **Fully Responsive** - Works perfectly on all devices
- ⚡ **No Backend Required** - 100% client-side processing
- 🔒 **Privacy Focused** - Your email never leaves your browser

---

## 🖼️ Screenshots

<div align="center">

### Generator Page
![Generator](https://dotify-one.vercel.app/hero-bg.png)

</div>

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black) | Frontend Framework |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) | Type Safety |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) | Build Tool |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) | Styling |
| ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white) | Deployment |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abh1shxkk/dotify.git
   cd dotify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
```

The production files will be in the `dist` folder.

---

## 📁 Project Structure

```
dotify/
├── components/
│   ├── pages/
│   │   ├── GeneratorPage.tsx    # Main email generator
│   │   ├── UseCasesPage.tsx     # Use cases documentation
│   │   └── ConnectPage.tsx      # Social links & contact
│   ├── ui/
│   │   └── Icons.tsx            # Lucide icon components
│   ├── EmailCard.tsx            # Email variation card
│   ├── Layout.tsx               # Main layout wrapper
│   └── Pagination.tsx           # Pagination component
├── utils/
│   └── emailLogic.ts            # Email generation logic
├── public/
│   ├── favicon.png
│   ├── logo.png
│   └── hero-bg.png
├── App.tsx                      # Main app component
├── index.tsx                    # Entry point
├── index.html                   # HTML template
├── index.css                    # Global styles
├── types.ts                     # TypeScript types
├── vite.config.ts               # Vite configuration
└── package.json
```

---

## 🎯 How It Works

Gmail ignores dots (.) in the local part of email addresses. This means:

```
example@gmail.com
e.xample@gmail.com
ex.ample@gmail.com
e.x.a.m.p.l.e@gmail.com
```

All these variations deliver emails to the **same inbox**! 

Dotify generates **all** possible combinations using a binary approach:
- For an email with `n` characters, there are `2^(n-1)` possible dot positions
- Each position can either have a dot or not

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📬 Connect with Me

<div align="center">

[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/abh1shxkk)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Abh1shxkk)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/abhishek-chauhan-880496394)
[![Email](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:abhishek.codes2004@gmail.com)

</div>

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## ⭐ Show Your Support

If you found this project helpful, please consider giving it a ⭐ on GitHub!

---

<div align="center">

**Made with ❤️ by [Abhishek Chauhan](https://github.com/Abh1shxkk)**

</div>
