import { StaticImageData } from "next/image";

import ProductHuntTodayImg from "../../public/images/product-hunt-today/product-hunt-today-tweet.jpg";
import TaiKerMapImg from "../../public/images/project-taiker-map/taiker-map.png";
import TimezoneConverterImg from "../../public/images/project-timezone-converter/timezone-converter-screenshot.png";
import TrendMicroIdProtectionImg from "../../public/images/project-trendmicro-id-protection/trendmicro-id-protection-homepage.jpg";
import TrendMicroNewsBlogImg from "../../public/images/project-trendmicro-news-blog/trendmicro-news-blog-homepage.jpg";
import OneHundredSitesImg from "../../public/images/projects/100sites.png";
import ScifiTrophyImg from "../../public/images/projects/scifi-trophy.png";
import SigmaGoImg from "../../public/images/projects/sigmago.jpg";
import SmartGlovesImg from "../../public/images/projects/smart-gloves.png";
import WinsterImg from "../../public/images/projects/winster.png";

export type Project = {
  title: string;
  description: string;
  links: {
    post: string;
    github: string;
    site: string;
  };
  image: {
    src: string | StaticImageData;
    alt: string;
    placeholder: "blur" | "empty";
  };
};

export const PROJECTS_ZH = <Project[]>[
  // Timez - Timezone Converter
  {
    title: "Timez - Time Zone Converter 時區轉換工具",
    description: "輕鬆在不同時區之間轉換時間並比較重疊時間段",
    links: {
      post: "/posts/timezone-converter",
      github: "https://github.com/eason-dev/timezone-converter",
      site: "https://timez.eason.ch",
    },
    image: {
      src: TimezoneConverterImg,
      alt: "Time Zone Converter 時區轉換工具",
      placeholder: "blur",
    },
  },
  // Product Hunt Today
  {
    title:
      "Product Hunt Today - 自動產生短影片介紹熱門 Product Hunt 專案的推特機器人",
    description:
      "每日透過 Product Hunt API 爬取 Product Hunt 上熱門專案，接著用 Remotion 產生短影片（使用 React！），最後寫些簡介，透過 Twitter API 發佈到貼文到推特上。",
    links: {
      post: "/posts/product-hunt-today",
      github: "https://github.com/eason-dev/product-hunt-today",
      site: "https://twitter.com/ProductHunToday",
    },
    image: {
      src: ProductHuntTodayImg,
      alt: "Tweet of Product Hunt Today",
      placeholder: "blur",
    },
  },
  // Trend Micro ID Protection - Password Manager
  {
    title: "Trend Micro ID Protection - 密碼管理工具",
    description: `
    <p>跨平台的機敏資料管理工具，可以管理密碼、信用卡資訊等重要資料。</p>
    <ul>
      <li>主導並開發核心密碼學加解密 TypeScript 模組，讓跨平台應用程式（網頁、瀏覽器擴充套件、手機應用程式）能夠使用，減少 70% 的開發負荷。</li>
      <li>設計了核心的加密協定和身份驗證流程，達到零知識（Zero-knowledge）加密標準。</li>
      <li>將 Next.js 前端和 Golang 後端轉移到 Nx Monorepo，提高 60% 的開發迭代速度。</li>
    </ul>`,
    links: {
      // post: '/posts/trendmicro-id-protection',
      github: "",
      site: "https://idprotect.trendmicro.com/vault",
    },
    image: {
      src: TrendMicroIdProtectionImg,
      alt: "Trend Micro ID Protection",
      placeholder: "blur",
    },
  },
  // Trend Micro News Blog
  {
    title: "Trend Micro News Blog",
    description: `
    <p>趨勢科技新聞網站，提供最新的資安領域新聞和趨勢。</p>
    <ul>
      <li>翻新並重構舊有 WordPress 程式庫，將效能分數從 20 提升到 95，並增加 200% 的搜尋引擎流量，以及改善使用者和開發者體驗。</li>
      <li>採用 Next.js、GraphQL 和 headless WordPress 技術，大幅提升使用者和開發者體驗。</li>
      <li>推動將 UI 元件標準化為 Web Components，減少了 60% 的維護工作量，並促進了 5 個以上開發團隊的導入。</li>
      <li>建立了 multi-stage CI/CD pipeline，用於全端網站部署，整合了 AWS 和 GitHub Actions 的安全掃描和性能監控，將部署時間縮短到 5 分鐘內。</li>
</ul>`,
    links: {
      // post: '/posts/trendmicro-news-blog',
      github: "",
      site: "https://news.trendmicro.com/",
    },
    image: {
      src: TrendMicroNewsBlogImg,
      alt: "Trend Micro News Blog",
      placeholder: "blur",
    },
  },
  // TaiKer Map
  {
    title: "台客地圖 - 台灣景點地圖編輯器",
    description: `
    <p>提供商家、旅行團、活動主辦者使用，簡單易用的景點地圖編輯器。選擇附近的景點、餐廳和飯店，自訂風格，並輸出印刷可靠、美麗的地圖。</p>
    <p>開發工具：Next.js、Tailwind CSS、Google Map API、Vercel。</p>
    `,
    links: {
      // post: '/posts/taiker-map',
      github: "https://github.com/eason-dev/taiker-map",
      site: "https://taiker-map.vercel.app/",
    },
    image: {
      src: TaiKerMapImg,
      alt: "TaiKer Map",
      placeholder: "blur",
    },
  },
  // 智慧手套 Smart Gloves
  {
    title: "智慧手套 Smart Gloves",
    description: `<b>「智慧手套 Smart Gloves」</b>，是我們在2018年3月底參加 台大電機創客松 MakeNTU 2018 時的專案作品。
    <br/>
    智慧手套旨在取代鍵盤及滑鼠，成為下個世代的人機介面裝置，希望使用者能透過智慧手套，操控生活中的所有事物，例如：控制智慧家電、作為遊戲控制器、演奏虛擬樂器等。
      <br />
      這個專案拿到了 <b>台大電機創客松 大會獎Best Tech 入圍</b>。
      `,
    links: {
      post: "/posts/smart-gloves",
      github: "",
      site: "",
    },
    image: {
      src: SmartGlovesImg,
      alt: "Smart Gloves",
      placeholder: "blur",
    },
  },
  // 科幻風造型獎盃
  {
    title: "科幻風造型獎盃",
    description: `「科幻風造型獎盃」，是我在2017年11月時，受新竹黑客松官方委託打造的，希望能呈現出科技感、及體現創客們的創造力。<br /><br />
    這作品在技術上使用了兩大創客神器：雷射切割、3D列印，並搭配了自己焊接的LED開關電路。`,
    links: {
      post: "/posts/scifi-trophy",
      github: "",
      site: "",
    },
    image: {
      src: ScifiTrophyImg,
      alt: "Sci-fi Trophy",
      placeholder: "blur",
    },
  },
  // 智慧釀藏酒大師 Winster
  {
    title: "智慧釀藏酒大師 Winster",
    description: `「智慧釀藏酒大師 Winster」，是一套幫助您釀酒和控管酒況的釀藏酒平台。
    <br /><br />
    主要能夠提供專業釀酒玩家、小型釀酒企業，酒的品種以及產地的分析和釀酒過程的錯誤偵測，同時在網頁與行動裝置上指示用戶，註冊、偵測並顯示相關資訊，並紀錄之，亦可對於單純收藏酒的一般用戶提供酒況偵測與建議。
    <br /><br />
    技術上透過光學、溫度、濕度和重量感測，以及背後的數據收集，利用 RNN 的機器學習架構，採用 LSTM 來分析原始資料。
    <br /><br />
    這項作品拿到了 2017 ARM Design Contest 決賽入圍，以及 第2屆遠傳物聯網應用開發大賽的 Ericsson 企業獎。`,
    links: {
      post: "/posts/winster",
      github: "",
      site: "",
    },
    image: {
      src: WinsterImg,
      alt: "Wine Master",
      placeholder: "blur",
    },
  },
  // 智慧導盲犬 SigmaGO
  {
    title: "智慧導盲犬 SigmaGO",
    description: `「SigmaGO 智慧導盲犬」，是我們在2017年7月時參加 2017 臺大黑客松 HackNTU 時，開發的軟硬整合專案。
    <br /><br />
    專案目的是開發低成本的智慧導盲犬，取代需要龐大成本訓練的傳統導盲犬，造福盲人朋友的生活。
    <br /><br />
    技術上使用了 Raspberry Pi 3 做運算，串接威盛電子提供的 Olami 中文語意辨識平台，即時辨識使用者的語音命令，Arduino 小車車（機械導盲犬的 Prototype）就會帶使用者前往目標地點。
    <br /><br />
    這個專案最後拿下了威盛電子超級黑客獎和大會技術人氣獎。`,
    links: {
      post: "/posts/sigmago",
      github: "",
      site: "",
    },
    image: {
      src: SigmaGoImg,
      alt: "SigmaGO",
      placeholder: "blur",
    },
  },
  // 100sites
  {
    title: "100 Sites",
    description: `為了成為全端工程師，我決定開始做大量的side-project，從做中學，高效地提升我所需要的能力。
    <br /><br />
    這就是100sites，從現在起我會寫出100個網頁並將其上傳，然後盡可能地說明我使用了哪些技術和工具。`,
    links: {
      post: "/posts/100sites",
      github: "",
      site: "",
    },
    image: {
      src: OneHundredSitesImg,
      alt: "100sites",
      placeholder: "blur",
    },
  },
];

export const PROJECTS_EN = <Project[]>[
  // Timez - Timezone Converter
  {
    title: "Timez - Time Zone Converter",
    description:
      "Easily convert time between different timezones and compare overlapping time periods",
    links: {
      post: "/posts/timezone-converter",
      github: "https://github.com/eason-dev/timezone-converter",
      site: "https://timez.eason.ch",
    },
    image: {
      src: TimezoneConverterImg,
      alt: "Time Zone Converter",
      placeholder: "blur",
    },
  },
  // Product Hunt Today
  {
    title:
      "Product Hunt Today - Automatically Generate Short Video Introductions to Hottest Product Hunt Projects on Twitter",
    description:
      "Daily fetching popular projects on Product Hunt through the Product Hunt GraphQL API, then generating short videos using Remotion (with React!), and finally writing some introductions to publish posts on Twitter through the Twitter API.",
    links: {
      post: "/posts/product-hunt-today",
      github: "https://github.com/eason-dev/product-hunt-today",
      site: "https://twitter.com/ProductHunToday",
    },
    image: {
      src: ProductHuntTodayImg,
      alt: "Tweet of Product Hunt Today",
      placeholder: "blur",
    },
  },
  // Trend Micro ID Protection - Password Manager
  {
    title: "Trend Micro ID Protection - Password Manager",
    description: `
    <p>A cross-platform vault for managing sensitive data like passwords.</p>
    <ul>
      <li>Led the development of a critical cryptography module for cross-platform applications (web, browser extension, and mobile app) in TypeScript, cutting development effort by 70%.</li>
      <li>Designed core data encryption protocol and authentication flow, achieving zero-knowledge encryption standards.</li>
      <li>Transitioned Next.js frontend and Golang backend to Nx monorepo, enhancing development iteration speed by 60%.</li>
    </ul>`,
    links: {
      // post: '/posts/trendmicro-id-protection',
      github: "",
      site: "https://idprotect.trendmicro.com/vault",
    },
    image: {
      src: TrendMicroIdProtectionImg,
      alt: "Trend Micro ID Protection",
      placeholder: "blur",
    },
  },
  // Trend Micro News Blog
  {
    title: "Trend Micro News Blog",
    description: `
    <p>A news website with latest cybersecurity news and trends from Trend Micro.</p>
    <ul>
      <li>Revamped legacy WordPress codebase, elevating performance score from 20 to 95 and doubling search engine impressions by 200%.</li>
      <li>Utilized Next.js, GraphQL, and headless WordPress to improve user and developer experiences significantly.</li>
      <li>Drove the standardization of UI modules into Web Components, reducing maintenance effort by 60% and facilitating adoption across 5+ development teams.</li>
      <li>Established a multi-stage CI/CD pipeline for full-stack website deployment, incorporating security scanning and performance monitoring with AWS and GitHub Actions, reducing deployment time to 5 minutes.</li>
      </ul>`,
    links: {
      // post: '/posts/trendmicro-news-blog',
      github: "",
      site: "https://news.trendmicro.com/",
    },
    image: {
      src: TrendMicroNewsBlogImg,
      alt: "Trend Micro News Blog",
      placeholder: "blur",
    },
  },
  // TaiKer Map
  {
    title: "TaiKer Map - Taiwan Attraction Map Editor",
    description: `<p>A utility-based web tool designed for accommodation businesses, tour groups, or event organizers, offering an easy-to-use map editor. Users can effortlessly select from a range of attractions, restaurants, and hotels in the vicinity, customize the style, and output the map in a print-ready, aesthetically pleasing format.</p>
    <p>Technologies Used: Next.js, Tailwind CSS, Google Map API, Vercel.</p>
    `,
    links: {
      // post: '/posts/taiker-map',
      github: "https://github.com/eason-dev/taiker-map",
      site: "https://taiker-map.vercel.app/",
    },
    image: {
      src: TaiKerMapImg,
      alt: "TaiKer Map",
      placeholder: "blur",
    },
  },
  // 智慧手套 Smart Gloves
  {
    title: "Smart Gloves - A Smart Gloves for Your Hands",
    description: `<b>"Smart Gloves"</b>, our project at MakeNTU 2018 in late March 2018, aims to replace keyboards and mice as the next generation human-computer interface device.
      <br/>
      It is designed for users to control everything in their lives, such as smart home appliances, gaming controllers, and playing virtual instruments.
      <br/>
      This project received the **Best Tech Finalist Award** at the MakeNTU event in NTU Electrical Engineering.`,
    links: {
      post: "/posts/smart-gloves",
      github: "",
      site: "",
    },
    image: {
      src: SmartGlovesImg,
      alt: "Smart Gloves",
      placeholder: "blur",
    },
  },
  // 科幻風造型獎盃
  {
    title: "Sci-fi Trophy",
    description: `The Sci-fi Trophy is a Maker project developed in 2017 for Hsinchu Hackathon, showcase the scientific knowledge and innovation of the makers.<br/>
    We used laser cutting, 3D printing, and a custom LED light circuit to make the trophy.`,
    links: {
      post: "/posts/scifi-trophy",
      github: "",
      site: "",
    },
    image: {
      src: ScifiTrophyImg,
      alt: "Sci-fi Trophy",
      placeholder: "blur",
    },
  },
  // 智慧釀藏酒大師 Winster
  {
    title: "Winster - A Wine Master",
    description: `
    "Smart Winemaking Master Winster" is a winemaking and storage platform that helps you make wine and control the condition of your wine.
    <br /><br />
    It can mainly provide professional brewing players and small brewing companies with analysis of wine varieties and origins and error detection in the brewing process. It also instructs users on web pages and mobile devices to register, detect and display relevant information, and record it. It can provide wine condition detection and suggestions for general users who simply collect wine.
    <br /><br />
    Technically, through optical, temperature, humidity and weight sensing, as well as the data collection behind it, the machine learning architecture of RNN is used, and LSTM is used to analyze the original data.
    <br /><br />
    This work won the 2017 ARM Design Contest finalist and the Ericsson Enterprise Award in the 2nd Far EasTone IoT Application Development Competition.`,
    links: {
      post: "/posts/winster",
      github: "",
      site: "",
    },
    image: {
      src: WinsterImg,
      alt: "Wine Master",
      placeholder: "blur",
    },
  },
  // 智慧導盲犬 SigmaGO
  {
    title: "SigmaGo - A Smart Guide Dog",
    description: `"SigmaGO Smart Guide Dog" is a software and hardware integration project developed when we participated in the 2017 National Taiwan University Hackathon (HackNTU) in July 2017.
    <br /><br />
    The purpose of the project is to develop low-cost smart guide dogs to replace traditional guide dogs that require huge training costs and benefit the lives of blind friends.
    <br /><br />
    Technically, Raspberry Pi 3 is used for calculations, connected in series with the Olami Chinese semantic recognition platform provided by VIA Electronics, to instantly recognize the user's voice commands, and the Arduino car (the prototype of the mechanical guide dog) will take the user to the target location.
    <br /><br />
    This project finally won the VIA Electronics Super Hacker Award and the Conference Technology Popularity Award.`,
    links: {
      post: "/posts/sigmago",
      github: "",
      site: "",
    },
    image: {
      src: SigmaGoImg,
      alt: "SigmaGO",
      placeholder: "blur",
    },
  },
  // 100sites
  {
    title: "100 Sites",
    description: `In order to become a full-end engineer, I decided to start doing a lot of side-projects, learn by doing, and effectively improve the capabilities I need.
    <br /><br />
    This is 100sites, from now on I will write 100 web pages and upload them, and then explain as much as possible what techniques and tools I used.`,
    links: {
      post: "/posts/100sites",
      github: "",
      site: "",
    },
    image: {
      src: OneHundredSitesImg,
      alt: "100sites",
      placeholder: "blur",
    },
  },
];
