export type BootcampTopic = {
  slug: string;
  title: string;
  description: string;
  icon: "plus" | "divide" | "calculator" | "sigma";
  price: number;
  priceLabel: string;
  bestFor: string;
  modules: Array<{
    title: string;
    description: string;
  }>;
};

export const bootcampTopics: BootcampTopic[] = [
  {
    slug: "addition-subtraction-number-comparison",
    title: "Addition, Subtraction & Number Comparison",
    description: "A focused bootcamp for children who need clarity and practice in basic number operations and comparison.",
    icon: "plus",
    price: 499,
    priceLabel: "₹499",
    bestFor: "Children who need confidence with basic number operations and comparison.",
    modules: [
      {
        title: "Topic 1: Number sense and comparison",
        description: "Understand bigger, smaller, equal, number order, and comparison thinking.",
      },
      {
        title: "Topic 2: Addition made clearer",
        description: "Practise addition through number-based and story-based questions.",
      },
      {
        title: "Topic 3: Subtraction without fear",
        description: "Learn subtraction with simple examples, guided practice, and worksheets.",
      },
      {
        title: "Topic 4: Mixed practice and revision",
        description: "Apply comparison, addition, and subtraction with fresh practice questions.",
      },
    ],
  },
  {
    slug: "multiplication-division-fractions-basics",
    title: "Multiplication, Division & Fractions Basics",
    description: "A topic-based bootcamp for children who need support in multiplication, division, and the beginning ideas of fractions.",
    icon: "divide",
    price: 499,
    priceLabel: "₹499",
    bestFor: "Children who need guided support with multiplication, division, and early fractions.",
    modules: [
      {
        title: "Topic 1: Multiplication basics",
        description: "Build multiplication using repeated addition, patterns, and simple examples.",
      },
      {
        title: "Topic 2: Division basics",
        description: "Understand sharing, grouping, and division meaning with gentle practice.",
      },
      {
        title: "Topic 3: Fractions foundation",
        description: "Learn beginning fraction ideas through visual and number-based activities.",
      },
      {
        title: "Topic 4: Mixed application practice",
        description: "Practise different question types so children learn to think and apply.",
      },
    ],
  },
  {
    slug: "factors-multiples-lcm-hcf",
    title: "Factors, Multiples, LCM & HCF",
    description: "A focused bootcamp for children who need clarity in factors, multiples, LCM, and HCF.",
    icon: "calculator",
    price: 499,
    priceLabel: "₹499",
    bestFor: "Children who get confused between factors, multiples, LCM, and HCF.",
    modules: [
      {
        title: "Topic 1: Factors and multiples",
        description: "Understand the difference between factors and multiples with clear examples.",
      },
      {
        title: "Topic 2: LCM made simple",
        description: "Learn where LCM is used and how to solve questions step by step.",
      },
      {
        title: "Topic 3: HCF made simple",
        description: "Understand HCF through guided examples and practice questions.",
      },
      {
        title: "Topic 4: Word problems and revision",
        description: "Apply LCM and HCF in story-based and real-life style questions.",
      },
    ],
  },
  {
    slug: "algebra-linear-equations",
    title: "Algebra & Linear Equations",
    description: "A topic-based bootcamp for children who are ready to understand algebra and linear equations in a simple, step-by-step way.",
    icon: "sigma",
    price: 499,
    priceLabel: "₹499",
    bestFor: "Children who are starting algebra and need a simple foundation.",
    modules: [
      {
        title: "Topic 1: Algebra basics",
        description: "Understand variables, expressions, and why letters are used in maths.",
      },
      {
        title: "Topic 2: Forming expressions",
        description: "Practise converting simple situations into algebra expressions.",
      },
      {
        title: "Topic 3: Linear equations",
        description: "Solve one-step and simple linear equations with clear reasoning.",
      },
      {
        title: "Topic 4: Application and revision",
        description: "Apply algebra ideas in guided practice and worksheet questions.",
      },
    ],
  },
];

export function getBootcampTopic(slug: string) {
  return bootcampTopics.find((topic) => topic.slug === slug);
}
