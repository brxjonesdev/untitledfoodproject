import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useState, useEffect } from 'react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

export function getRandomColor() {
  const colors = [
    'bright_plum-700',
    'strawberry_milkshake-700',
    'citrus_blush-700',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

type MealOption = {
  name: string;
  similarPlaces: {
    name: string;
  }[];
};

export const breakfastOptions: MealOption[] = [
  {
    name: 'Diner/Breakfast Restaurant',
    similarPlaces: [
      { name: 'IHOP' },
      { name: "Denny's" },
      { name: 'Waffle House' },
      { name: 'Cracker Barrel' },
    ],
  },
  {
    name: 'Cafe',
    similarPlaces: [
      { name: 'Starbucks' },
      { name: "Dunkin'" },
      { name: 'Panera Bread' },
      { name: 'Tim Hortons' },
    ],
  },
  {
    name: 'Brunch',
    similarPlaces: [
      { name: 'First Watch' },
      { name: 'Another Broken Egg Cafe' },
      { name: 'Snooze' },
      { name: 'The Egg & I' },
    ],
  },
  {
    name: 'Fast Food',
    similarPlaces: [
      { name: "McDonald's" },
      { name: 'Chick-fil-A' },
      { name: 'Taco Bell' },
      { name: 'Burger King' },
    ],
  },
  {
    name: 'Bakery',
    similarPlaces: [
      { name: 'Panera Bread' },
      { name: 'Great Harvest Bread Co.' },
      { name: 'Corner Bakery Cafe' },
      { name: 'Au Bon Pain' },
    ],
  },
];
export const lunchOptions: MealOption[] = [
  {
    name: 'Casual Dining',
    similarPlaces: [
      { name: "Applebee's" },
      { name: "Chili's" },
      { name: 'TGI Fridays' },
      { name: 'Red Robin' },
    ],
  },
  {
    name: 'Fast-Casual',
    similarPlaces: [
      { name: 'Chipotle' },
      { name: 'Panera Bread' },
      { name: 'Shake Shack' },
      { name: 'Noodles & Company' },
    ],
  },
  {
    name: 'Food Trucks/Street Food',
    similarPlaces: [{ name: 'Local food trucks' }, { name: 'Street vendors' }],
  },
  {
    name: 'Sandwich Shops',
    similarPlaces: [
      { name: 'Subway' },
      { name: "Jimmy John's" },
      { name: "Jersey Mike's Subs" },
      { name: 'Firehouse Subs' },
    ],
  },
  {
    name: 'Salad Bars',
    similarPlaces: [
      { name: 'Sweetgreen' },
      { name: 'Chopt' },
      { name: 'Saladworks' },
      { name: 'Just Salad' },
    ],
  },
];

export const dinnerOptions: MealOption[] = [
  {
    name: 'Fine Dining',
    similarPlaces: [
      { name: "Ruth's Chris Steak House" },
      { name: 'The Capital Grille' },
      { name: "Morton's The Steakhouse" },
      { name: "Fleming's Prime Steakhouse" },
    ],
  },
  {
    name: 'Casual Dining',
    similarPlaces: [
      { name: 'Olive Garden' },
      { name: 'Outback Steakhouse' },
      { name: 'Cheesecake Factory' },
      { name: 'Buffalo Wild Wings' },
    ],
  },
  {
    name: 'Ethnic Cuisine',
    similarPlaces: [
      { name: "P.F. Chang's" },
      { name: 'La Hacienda' },
      { name: 'Olive Garden' },
      { name: 'Bombay House' },
    ],
  },
  {
    name: 'Steakhouses',
    similarPlaces: [
      { name: 'Texas Roadhouse' },
      { name: 'LongHorn Steakhouse' },
      { name: 'Black Angus Steakhouse' },
      { name: "Logan's Roadhouse" },
    ],
  },
  {
    name: 'Seafood Restaurants',
    similarPlaces: [
      { name: 'Red Lobster' },
      { name: 'Bonefish Grill' },
      { name: "Joe's Crab Shack" },
      { name: 'Legal Sea Foods' },
    ],
  },
];

export const dessertOptions: MealOption[] = [
  {
    name: 'Ice Cream Shops',
    similarPlaces: [
      { name: 'Baskin-Robbins' },
      { name: 'Cold Stone Creamery' },
      { name: 'Dairy Queen' },
      { name: "Ben & Jerry's" },
    ],
  },
  {
    name: 'Bakery/Café',
    similarPlaces: [
      { name: 'Magnolia Bakery' },
      { name: "Carlo's Bakery" },
      { name: 'Panera Bread' },
      { name: 'Corner Bakery Cafe' },
    ],
  },
  {
    name: 'Specialty Dessert Shops',
    similarPlaces: [
      { name: 'Krispy Kreme' },
      { name: 'Ghirardelli' },
      { name: 'Sprinkles Cupcakes' },
      { name: 'Godiva' },
    ],
  },
  {
    name: 'Frozen Yogurt Shops',
    similarPlaces: [
      { name: 'Yogurtland' },
      { name: "Menchie's" },
      { name: 'Red Mango' },
      { name: 'Sweet Frog' },
    ],
  },
  {
    name: 'Candy Stores',
    similarPlaces: [
      { name: "Dylan's Candy Bar" },
      { name: 'Sugarfina' },
      { name: 'Lolli & Pops' },
      { name: "IT'SUGAR" },
    ],
  },
  {
    name: 'Boba Tea Shops',
    similarPlaces: [
      { name: 'Gong Cha' },
      { name: 'Kung Fu Tea' },
      { name: 'Sharetea' },
      { name: 'Bubbleology' },
    ],
  },
  {
    name: 'Milkshake Bars',
    similarPlaces: [
      { name: 'Shake Shack' },
      { name: 'Johnny Rockets' },
      { name: 'Black Tap Craft Burgers & Beer' },
      { name: "Steak 'n Shake" },
    ],
  },
  {
    name: 'Smoothie Shops',
    similarPlaces: [
      { name: 'Jamba Juice' },
      { name: 'Smoothie King' },
      { name: 'Tropical Smoothie Cafe' },
      { name: 'Planet Smoothie' },
    ],
  },
];
