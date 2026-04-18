export const PROJECTS = [
  { id:1, title:'E-Commerce Platform',  thumb:'🛒', price:999,  tag:'Web App',    cat:'web',    seller:'DevMaster',  stack:['React','Node.js','MongoDB'],  bg:'#12102a', desc:'Full e-commerce with cart, checkout & Stripe payments.', sales:89,  rating:4.8, reviews:62 },
  { id:2, title:'Hospital Mgmt System', thumb:'🏥', price:1499, tag:'Final Year', cat:'fyp',    seller:'med_coder',  stack:['Django','PostgreSQL'],         bg:'#0d1f1a', desc:'Patient records, appointments & billing system.',        sales:54,  rating:4.7, reviews:38 },
  { id:3, title:'Chat App (MERN)',       thumb:'💬', price:799,  tag:'Web App',    cat:'web',    seller:'DevMaster',  stack:['React','Socket.io','Node.js'], bg:'#16122e', desc:'Real-time chat with rooms, DMs & file sharing.',         sales:72,  rating:4.9, reviews:55 },
  { id:4, title:'ML Crop Predictor',    thumb:'🌱', price:1299, tag:'Final Year', cat:'fyp',    seller:'ml_farm',    stack:['Python','Flask','scikit-learn'],bg:'#0f1f10', desc:'Predicts optimal crops from soil & weather data.',       sales:41,  rating:4.6, reviews:29 },
  { id:5, title:'Food Delivery App',    thumb:'🍕', price:1899, tag:'Mobile',     cat:'mobile', seller:'mobile_guru',stack:['React Native','Firebase'],      bg:'#201510', desc:'Food delivery app with tracking & payments.',           sales:33,  rating:4.7, reviews:22 },
  { id:6, title:'Portfolio Template',   thumb:'✨', price:299,  tag:'Template',   cat:'web',    seller:'ui_pro',     stack:['HTML','CSS','GSAP'],            bg:'#10102a', desc:'Animated portfolio with smooth scroll & 3D bg.',        sales:120, rating:4.8, reviews:84 },
  { id:7, title:'IoT Smart Home FYP',   thumb:'🏠', price:2199, tag:'Final Year', cat:'fyp',    seller:'iot_dev',    stack:['Arduino','Python','MQTT'],      bg:'#1a100a', desc:'IoT home automation with mobile companion app.',        sales:18,  rating:4.5, reviews:14 },
  { id:8, title:'Django REST API',      thumb:'⚡', price:499,  tag:'API',        cat:'api',    seller:'py_wizard',  stack:['Django','DRF','PostgreSQL'],    bg:'#0a101a', desc:'Production-ready REST API with JWT auth & Swagger.',    sales:65,  rating:4.8, reviews:47 },
]

export const CATEGORIES = [
  { value:'all',    label:'All',        icon:'🌐' },
  { value:'web',    label:'Web Apps',   icon:'💻' },
  { value:'mobile', label:'Mobile',     icon:'📱' },
  { value:'ml',     label:'ML / AI',    icon:'🤖' },
  { value:'fyp',    label:'Final Year', icon:'🎓' },
  { value:'api',    label:'APIs',       icon:'⚡' },
]