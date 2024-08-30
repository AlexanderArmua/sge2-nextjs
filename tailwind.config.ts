import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import colors from "tailwindcss/colors";

export const sgePlugin = plugin(
  function ({ addBase }) {
    addBase({
      ":root": {
        "--gray-100": "0 0% 56%",
        "--gray-200": "218 5% 34%",
        "--gray-300": "230 9% 27%",
        "--gray-400": "231 7% 19%",
        "--gray-500": "225 5% 16%",
        "--gray-600": "240 4% 13%",
        "--gray-700": "220 5% 12%",
        "--gray-800": "210 6% 7%",
        "--gray-900": "210 3 12%",
        "--primary": "43 86% 57%",
        "--secondary": "231 7% 19%",
        "--secondary-foreground": "220 10% 65%",
        "--positive": "148 36% 21%",
        "--positive-foreground": "151 65% 49%",
        "--primary-foreground": "46 47% 15%",
        "--muted": "224 11% 55%",
        "--border": "229 8% 27%",
        "--input": "231 7% 19%",
        "--ring": "212.7 26.8% 83.9%",
        "--success": "144 86% 57%",
        "--warning": "32 86% 57%",
        "--error": "0 86% 57%",
        "--info": "211 57% 55%",
        "--danger": "0 86% 57%",
        "--danger-foreground": "222.2 47.4% 11.2%",
        "--success-dark": "150 45% 9%",
        "--error-dark": "350 33% 9%",
        "--warning-dark": "30 36% 9%",
        "--info-dark": "200 45% 9%",
        "--midnight": "222 59% 57%",
        "--aqua": "196 45% 38%",
        "--nocturne": "0 0% 5%",
        "--negative": "351 96 70%",
        "--charcoal": "0 0% 11%",
      },
    });
    addBase({
      ":root": {
        "--popover": "220 5% 12%",
      },
    });
    addBase({
      "html, body": {
        "@apply text-foreground bg-background": {},
      },
    });
  },
  {
    theme: {
      extend: {
        screens: {
          "2xl": "1600px",
          "3xl": "1800px",
          "4xl": "2000px",
          "5xl": "2400px",
        },
        colors: {
          //...colors,
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          foreground: colors.white,
          transparent: colors.transparent,
          "gray-100": "hsl(var(--gray-100))",
          "gray-200": "hsl(var(--gray-200))",
          "gray-300": "hsl(var(--gray-300))",
          "gray-400": "hsl(var(--gray-400))",
          "gray-500": "hsl(var(--gray-500))",
          "gray-600": "hsl(var(--gray-600))",
          "gray-700": "hsl(var(--gray-700))",
          "gray-800": "hsl(var(--gray-800))",
          "gray-900": "hsl(var(--gray-900))",
          background: {
            DEFAULT: "hsl(var(--gray-700))",
            secondary: "hsl(var(--charcoal))",
          },
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          danger: {
            DEFAULT: "hsl(var(--danger))",
            foreground: "hsl(var(--danger-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          success: {
            DEFAULT: "hsl(var(--success))",
            dark: "hsl(var(--success-dark))",
          },
          warning: {
            DEFAULT: "hsl(var(--warning))",
            dark: "hsl(var(--warning-dark))",
          },
          error: {
            DEFAULT: "hsl(var(--error))",
            dark: "hsl(var(--error-dark))",
          },
          info: {
            DEFAULT: "hsl(var(--info))",
            dark: "hsl(var(--info-dark))",
          },

          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: colors.white,
          },
          nocturne: {
            DEFAULT: "hsl(var(--nocturne))",
          },
          // components
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: colors.white,
          },
          aqua: {
            DEFAULT: "hsl(var(--aqua))",
            border: "hsl(var(--aqua))",
          },
          midnight: {
            DEFAULT: "hsl(var(--midnight))",
            border: "hsl(var(--midnight))",
          },
          negative: {
            DEFAULT: "hsl(var(--negative))",
          },
          positive: {
            DEFAULT: "hsl(var(--positive))",
            foreground: "hsl(var(--positive-foreground))",
          },
        },
        transitionTimingFunction: {
          "in-expo": "cubic-bezier(0.36, 0.66, 0.04, 1)",
          "out-expo": "cubic-bezier(0.36, 0.66, 0.04, 1)",
        },
      },
    },
  },
);

const sgePeset = {
  content: [],
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("tailwindcss-animate"),
    sgePlugin,
  ],
} satisfies Config;

export const rfqPlugin = plugin(
  function ({ addBase }) {
    addBase({
      ":root": {
        "--sub": "224 5% 40%",
        "--danger": "0 86% 57%",
        "--warn": "43 86% 57%",
        "--success": "144 86% 57%",
        "--info": "29 86% 57%",
        "--disabled": "230 9% 27%",
        "--text-default": "0 0% 100%",
        "--side-nav": "var(--gray-600)",
        "--divider": "var(--gray-400)",
        "--text-btn-default": "0 0% 100%",
        "--bg-btn-default": "var(--gray-200)",
        "--text-btn-bordered-default": "var(--gray-200)",
        "--border-btn-default": "var(--gray-200)",
        "--text-btn-primary": "var(--gray-700)",
        "--text-btn-bordered-primary": "var(--primary)",
        "--bg-btn-primary": "var(--primary)",
        "--border-btn-primary": "var(--primary)",
        "--text-btn-danger": "0 0% 100%",
        "--bg-btn-danger": "var(--danger)",
        "--bg-table-header": "var(--gray-400)",
        "--bg-table-row": "var(--gray-700)",
        "--bg-table-row-expanded": "228 7% 14%",
        "--text-table-header": "0 0% 100%",
        "--text-table-row": "0 0% 100%",
        "--border-table-header": "var(--gray-400)",
        "--border-table-header-accent": "var(--gray-100)",
        "--border-table-row": "var(--gray-400)",
        "--bg-modal-overlay": "var(--gray-700)",
        "--bg-modal": "var(--gray-700)",
        "--border-modal": "var(--gray-400)",
        "--bg-sidenav-menu": "var(--gray-900)",
        "--text-menu-item": "var(--text-default)",
        "--text-menu-item-active": "var(--text-default)",
        "--bg-menu": "var(--gray-400)",
        "--bg-menu-item-active": "var(--gray-300)",
        "--border-tab": "var(--gray-400)",
        "--text-tab-item": "var(--text-default)",
        "--text-tab-item-hover": "var(--text-default)",
        "--text-tab-item-active": "var(--primary)",
        "--text-tab-item-active-hover": "var(--primary)",
        "--bg-tab-item-hover": "var(--gray-600)",
        "--bg-tab-item-active-hover": "var(--gray-600)",
        "--bg-tab-indicator": "var(--primary)",
        "--bg-switch": "var(--gray-400)",
        "--bg-switch-active": "var(--primary)",
        "--bg-switch-indicator": "var(--primary)",
        "--bg-switch-indicator-active": "var(--gray-400)",
        "--bg-checkbox-active": "var(--primary)",
        "--border-checkbox": "var(--gray-400)",
        "--border-checkbox-active": "var(--primary)",
        "--text-checkbox-indicator": "var(--gray-700)",
        "--bg-input": "var(--gray-700)",
        "--text-input-label": "var(--text-default)",
        "--text-input-placeholder": "var(--gray-100)",
        "--border-input": "var(--gray-300)",
        "--border-input-active": "var(--primary)",
        "--border-input-hover": "var(--gray-100)",
        "--midnight": "222 59% 57%",
        "--aqua": "196 45% 38%",
        "--nocturne": "0 0% 5%",
        "--onyx": "240, 7%, 14%",
      },
    });
    addBase({
      "main.sge": {
        "@apply bg-layout": {},
      },
      body: {
        "@apply text-default": {},
      },
    });
  },
  {
    theme: {
      colors: {
        sub: "hsl(var(--sub))",
        divider: "hsl(var(--divider))",
        danger: "hsl(var(--danger))",
        warn: "hsl(var(--warn))",
        success: "hsl(var(--success))",
        info: "hsl(var(--info))",
        disabled: "hsl(var(--disabled))",
        aqua: "hsl(var(--aqua))",
        midnight: "hsl(var(--midnight))",
        nocturne: "hsl(var(--nocturne))",
        onyx: "hsl(var(--onyx))",
      },
      extend: {
        fontWeight: {
          btn: "700",
        },
        textColor: {
          default: "hsl(var(--text-default))",
          danger: "hsl(var(--danger))",
          "btn-default": "hsl(var(--text-btn-default))",
          "btn-primary": "hsl(var(--text-btn-primary))",
          "btn-bordered-default": "hsl(var(--text-btn-bordered-default))",
          "btn-bordered-primary": "hsl(var(--text-btn-bordered-primary))",
          "btn-danger": "hsl(var(--text-btn-danger))",
          "table-header": "hsl(var(--text-table-header))",
          "table-row": "hsl(var(--text-table-row))",
          "menu-item": "hsl(var(--text-menu-item))",
          "menu-item-active": "hsl(var(--text-menu-item-active))",
          "tab-item": "hsl(var(--text-tab-item))",
          "tab-item-hover": "hsl(var(--text-tab-item-hover))",
          "tab-item-active": "hsl(var(--text-tab-item-active))",
          "tab-item-active-hover": "hsl(var(--text-tab-item-active-hover))",
          "input-label": "hsl(var(--text-input-label))",
          "input-placeholder": "hsl(var(--text-input-placeholder))",
          "checkbox-indicator": "hsl(var(--text-checkbox-indicator))",
        },
        backgroundColor: {
          layout: `#0C0C0C`,
          sidenav: "hsl(var(--side-nav))",
          content: "#171717",
          "sidenav-menu": "hsl(var(--bg-sidenav-menu))",
          "btn-default": "hsl(var(--bg-btn-default))",
          "btn-primary": "hsl(var(--bg-btn-primary))",
          "btn-danger": "hsl(var(--bg-btn-danger))",
          "table-header": "hsl(var(--bg-table-header))",
          "table-row": "hsl(var(--bg-table-row))",
          "table-row-expanded": "hsl(var(--bg-table-row-expanded))",
          "modal-overlay": "hsl(var(--bg-modal-overlay))",
          modal: "hsl(var(--bg-modal))",
          menu: "hsl(var(--bg-menu))",
          "menu-item-active": "hsl(var(--bg-menu-item-active))",
          "tab-item-hover": "hsl(var(--bg-tab-item-hover))",
          "tab-item-active-hover": "hsl(var(--bg-tab-item-active-hover))",
          "tab-indicator": "hsl(var(--bg-tab-indicator))",
          switch: "hsl(var(--bg-switch))",
          "switch-active": "hsl(var(--bg-switch-active))",
          "switch-indicator": "hsl(var(--bg-switch-indicator))",
          "switch-indicator-active": "hsl(var(--bg-switch-indicator-active))",
          input: "hsl(var(----bg-input))",
          "checkbox-active": "hsl(var(--bg-checkbox-active))",
        },
        borderColor: {
          default: "hsl(var(--border))",
          "btn-default": "hsl(var(--border-btn-default))",
          "btn-primary": "hsl(var(--border-btn-primary))",
          "table-header": "hsl(var(--border-table-header))",
          "table-header-accent": "hsl(var(--border-table-header-accent))",
          "table-row": "hsl(var(--border-table-row))",
          modal: "hsl(var(--border-modal))",
          tab: "hsl(var(--border-tab))",
          input: "hsl(var(--border-input))",
          "input-active": "hsl(var(--border-input-active))",
          "input-hover": "hsl(var(--border-input-hover))",
          checkbox: "hsl(var(--border-checkbox))",
          "checkbox-active": "hsl(var(--border-checkbox-active))",
        },
        stroke: {
          "checkbox-indicator": "hsl(var(--text-checkbox-indicator))",
        },
      },
    },
  },
);

export default {
  presets: [sgePeset],
  content: ["./src/**/*.{js,ts,jsx,tsx}", "../../packages/shared/ui/**/*.{js,ts,jsx,tsx}"],
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("tailwindcss-animate"),
    rfqPlugin,
  ],
} satisfies Config;
