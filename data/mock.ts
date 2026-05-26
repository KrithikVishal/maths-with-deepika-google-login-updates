import {
  BookOpen,
  Boxes,
  ClipboardCheck,
  Download,
  Heart,
  PackageCheck,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/for-mothers", label: "For Mothers" },
  { href: "/for-kids", label: "For Kids" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
];

export const modules = [
  {
    name: "Module 1: Number Basics",
    lessons: [
      { title: "Friendly Numbers", duration: "12 min", complete: true, locked: false, progress: 100 },
      { title: "Place Value Made Simple", duration: "15 min", complete: true, locked: false, progress: 100 },
    ],
  },
  {
    name: "Module 2: Fast Addition",
    lessons: [
      { title: "Add From Left to Right", duration: "18 min", complete: false, locked: false, progress: 65 },
      { title: "Carry Less, Think Clearly", duration: "14 min", complete: false, locked: false, progress: 35 },
    ],
  },
  {
    name: "Module 3: Fast Subtraction",
    lessons: [
      { title: "Borrowing Without Stress", duration: "16 min", complete: false, locked: false, progress: 20 },
      { title: "Check Your Answer", duration: "10 min", complete: false, locked: true, progress: 0 },
    ],
  },
  {
    name: "Module 4: Multiplication Tricks",
    lessons: [
      { title: "Multiply Near 10", duration: "17 min", complete: false, locked: true, progress: 0 },
      { title: "Two Digit Shortcuts", duration: "20 min", complete: false, locked: true, progress: 0 },
    ],
  },
  {
    name: "Module 5: Division Made Simple",
    lessons: [
      { title: "Divide in Small Steps", duration: "19 min", complete: false, locked: true, progress: 0 },
      { title: "Remainders With Ease", duration: "13 min", complete: false, locked: true, progress: 0 },
    ],
  },
  {
    name: "Module 6: Practice and Revision",
    lessons: [
      { title: "Mixed Practice", duration: "22 min", complete: false, locked: true, progress: 0 },
      { title: "Confidence Check", duration: "11 min", complete: false, locked: true, progress: 0 },
    ],
  },
];

export const courses = [
  {
    title: "Vedic Maths Foundation",
    age: "Ages 7-12",
    price: "₹3,999",
    tag: "Best for beginners",
    progress: 54,
    description: "A calm step-by-step course for children who want faster and happier maths practice.",
  },
  {
    title: "Speed Maths Practice Club",
    age: "Ages 9-14",
    price: "₹1,499",
    tag: "Monthly support",
    progress: 28,
    description: "Weekly guided practice with worksheets, revision sheets, and short video lessons.",
  },
  {
    title: "Mother & Child Maths Routine",
    age: "Parent guided",
    price: "₹2,499",
    tag: "Family learning",
    progress: 72,
    description: "Simple routines and printable practice to help mothers support maths at home.",
  },
];

export const physicalProducts = [
  { id: "practice-book", name: "Vedic Maths Practice Book", price: 699, priceLabel: "₹699", status: "In stock", stock: 24, image: "book" },
  { id: "flash-cards", name: "Flash Cards", price: 399, priceLabel: "₹399", status: "In stock", stock: 18, image: "cards" },
  { id: "kids-learning-kit", name: "Kids Learning Kit", price: 1299, priceLabel: "₹1,299", status: "Few left", stock: 4, image: "kit" },
  { id: "activity-worksheets-bundle", name: "Activity Worksheets Bundle", price: 549, priceLabel: "₹549", status: "Out of Stock", stock: 0, image: "bundle" },
];

export const digitalProducts = [
  { name: "Printable Worksheets", price: "₹299", files: "40 pages", icon: Download },
  { name: "Practice PDFs", price: "₹349", files: "6 PDFs", icon: ClipboardCheck },
  { name: "Revision Sheets", price: "₹199", files: "18 sheets", icon: BookOpen },
  { name: "Maths Activity Pack", price: "₹499", files: "Games + sheets", icon: Sparkles },
];

export const benefits = [
  { title: "Small, clear lessons", text: "Children learn one idea at a time without feeling rushed.", icon: PlayCircle },
  { title: "Practice that feels doable", text: "Worksheets are simple, guided, and easy to repeat at home.", icon: ClipboardCheck },
  { title: "Confidence you can see", text: "Progress cards help mothers know what is improving.", icon: Sparkles },
];

export const whyMothers = [
  { title: "Easy to follow", text: "No confusing menus. Lessons, downloads, and progress are easy to find.", icon: Heart },
  { title: "Built for home learning", text: "Short lessons fit around school, activities, and family routines.", icon: ShieldCheck },
  { title: "Clear access and orders", text: "Courses, payments, downloads, and tracking are shown in one place.", icon: PackageCheck },
];

export const testimonials = [
  {
    name: "Priya, mother of 2",
    quote: "My daughter stopped fearing big sums. The lessons feel gentle and very clear.",
  },
  {
    name: "Anitha, parent",
    quote: "I like that I can see progress and download practice sheets without asking anyone.",
  },
  {
    name: "Meera, mother",
    quote: "The bootcamp gave us a simple routine. Maths feels lighter at home now.",
  },
];

export const adminCards = [
  { label: "Orders today", value: "42", note: "12 ready to ship", icon: PackageCheck },
  { label: "Active learners", value: "1,248", note: "86 new this week", icon: Users },
  { label: "Revenue", value: "₹2.8L", note: "This month", icon: Sparkles },
  { label: "Inventory alerts", value: "6", note: "Needs review", icon: Boxes },
];

export const orders = [
  { id: "#VM1024", name: "Priya S.", item: "Practice Book + Course", status: "Packed", payment: "Full paid", total: "₹4,698" },
  { id: "#VM1023", name: "Rashmi K.", item: "Foundation Course", status: "Course access", payment: "Half paid", total: "₹1,999" },
  { id: "#VM1022", name: "Lavanya R.", item: "Kids Learning Kit", status: "Shipped", payment: "Full paid", total: "₹1,299" },
  { id: "#VM1021", name: "Sneha M.", item: "Printable Worksheets", status: "Delivered", payment: "Full paid", total: "₹299" },
];
