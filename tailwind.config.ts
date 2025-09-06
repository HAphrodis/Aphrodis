/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", "dark"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./constants/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            blockquote: {
              quotes: "none",
            },
          },
        },
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        main_blue: "#3B9DF8",
        dark_blue: "#1A7AD6",
        light_blue: "#7CBFFA",
        complementary_orange: "#F88F3B",
        analogous_green: "#3BF89D",
        neutral_gray: "#F0F0F0",
        neutral_dark: "#333333",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },

        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        deep_sky_blue: {
          "100": "#062b3b",
          "200": "#0c5777",
          "300": "#1282b2",
          "400": "#1dabe9",
          "500": "#58c1ee",
          "600": "#79cef2",
          "700": "#9bdaf5",
          "800": "#bce6f8",
          "900": "#def3fc",
          DEFAULT: "#58c1ee",
        },
        pacific_cyan: {
          "100": "#0a222c",
          "200": "#144558",
          "300": "#1e6784",
          "400": "#288ab0",
          "500": "#3ba9d3",
          "600": "#63b9dc",
          "700": "#8acbe4",
          "800": "#b1dced",
          "900": "#d8eef6",
          DEFAULT: "#3ba9d3",
        },
        bondi_blue: {
          "100": "#061d25",
          "200": "#0c394a",
          "300": "#12566f",
          "400": "#187293",
          "500": "#1e90b8",
          "600": "#33b0de",
          "700": "#66c4e6",
          "800": "#99d8ee",
          "900": "#ccebf7",
          DEFAULT: "#1e90b8",
        },
        non_photo_blue: {
          "100": "#073b4e",
          "200": "#0f779d",
          "300": "#18b2e9",
          "400": "#66ccf1",
          "500": "#b3e6f8",
          "600": "#c3ebf9",
          "700": "#d2f0fb",
          "800": "#e1f5fc",
          "900": "#f0fafe",
          DEFAULT: "#b3e6f8",
        },
        aquamarine: {
          "100": "#063b2a",
          "200": "#0c7753",
          "300": "#12b27d",
          "400": "#1de9a5",
          "500": "#58eebc",
          "600": "#79f2ca",
          "700": "#9bf5d7",
          "800": "#bcf8e4",
          "900": "#defcf2",
          DEFAULT: "#58eebc",
        },
        anti_flash_white: {
          "100": "#213141",
          "200": "#426282",
          "300": "#6f93b7",
          "400": "#b0c4d7",
          "500": "#f3f6f9",
          "600": "#f4f7fa",
          "700": "#f7f9fb",
          "800": "#fafbfc",
          "900": "#fcfdfe",
          DEFAULT: "#f3f6f9",
        },
        baby_powder: {
          "100": "#2a471c",
          "200": "#558d38",
          "300": "#85c267",
          "400": "#bedead",
          "500": "#f7fbf5",
          "600": "#f8fcf6",
          "700": "#fafcf8",
          "800": "#fcfdfb",
          "900": "#fdfefd",
          DEFAULT: "#f7fbf5",
        },
        ivory: {
          "100": "#38550e",
          "200": "#71a91d",
          "300": "#a4e049",
          "400": "#ceee9d",
          "500": "#f9fdf3",
          "600": "#fafdf5",
          "700": "#fbfef7",
          "800": "#fcfefa",
          "900": "#fefffc",
          DEFAULT: "#f9fdf3",
        },
        gamboge: {
          "100": "#311f03",
          "200": "#633f05",
          "300": "#945e08",
          "400": "#c67e0a",
          "500": "#f39c12",
          "600": "#f5b041",
          "700": "#f8c471",
          "800": "#fad8a0",
          "900": "#fdebd0",
          DEFAULT: "#f39c12",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        d_primary: {
          DEFAULT: "#3B82F6",
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
        },
        d_secondary: {
          DEFAULT: "#10B981",
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
          800: "#065F46",
          900: "#064E3B",
        },
        d_background: {
          light: {
            DEFAULT: "#F9FAFB",
            100: "#F3F4F6",
            200: "#E5E7EB",
            300: "#D1D5DB",
            400: "#9CA3AF",
            500: "#6B7280",
            600: "#4B5563",
            700: "#374151",
            800: "#1F2937",
            900: "#111827",
            1000: "#e6f1ff",
            card: "#FFFFFF",
            alt: "#F3F4F6",
          },
          dark: {
            DEFAULT: "#020D1A",
            100: "#0F172A",
            200: "#1E293B",
            300: "#334155",
            400: "#475569",
            500: "#627D98",
            600: "#829AB1",
            700: "#9FB3C8",
            800: "#BBCBD9",
            900: "#D9E2EC",
            // 1000: '#F0F4F8',
            1000: "#030712",

            card: "#0F172A",
            alt: "#1E293B",
          },
        },
        d_surface: {
          light: {
            DEFAULT: "#FFFFFF",
            raised: "#F9FAFB",
            sunken: "#F3F4F6",
          },
          dark: {
            DEFAULT: "#0F172A",
            raised: "#1E293B",
            sunken: "#020D1A",
          },
        },
        d_text: {
          light: {
            primary: "#111827",
            secondary: "#4B5563",
            tertiary: "#6B7280",
          },
          dark: {
            primary: "#F9FAFB",
            secondary: "#E5E7EB",
            tertiary: "#D1D5DB",
          },
        },
        d_border: {
          light: "#E5E7EB",
          dark: "#1F2937",
        },
        d_accent: {
          purple: {
            light: "#8B5CF6",
            dark: "#7C3AED",
          },
          pink: {
            light: "#EC4899",
            dark: "#DB2777",
          },
          orange: {
            light: "#F97316",
            dark: "#EA580C",
          },
        },
        d_status: {
          error: {
            light: "#EF4444",
            dark: "#F87171",
          },
          warning: {
            light: "#F59E0B",
            dark: "#FBBF24",
          },
          success: {
            DEFAULT: "#22C55",
            light: "#10B981",
            dark: "#34D399",
          },
          info: {
            light: "#3B82F6",
            dark: "#60A5FA",
          },
          navy: {
            DEFAULT: "#0a192f",
            light: "#112240",
            lightest: "#233554",
          },
          slate: {
            DEFAULT: "#8892b0",
            light: "#a8b2d1",
            lightest: "#ccd6f6",
          },
          d_white: "#e6f1ff",
          d_green: "#64ffda",
        },
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "shimmer-slide": {
          to: {
            transform: "translate(calc(100cqw - 100%), 0)",
          },
        },
        "spin-around": {
          "0%": {
            transform: "translateZ(0) rotate(0)",
          },
          "15%, 35%": {
            transform: "translateZ(0) rotate(90deg)",
          },
          "65%, 85%": {
            transform: "translateZ(0) rotate(270deg)",
          },
          "100%": {
            transform: "translateZ(0) rotate(360deg)",
          },
        },
        "spinner-leaf-fade": {
          "0%, 100%": {
            opacity: "0",
          },
          "50%": {
            opacity: "1",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "shimmer-slide":
          "shimmer-slide var(--speed) ease-in-out infinite alternate",
        "spin-around": "spin-around calc(var(--speed) * 2) infinite linear",
        "spinner-leaf-fade": "spinner-leaf-fade 800ms linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
export default config;
