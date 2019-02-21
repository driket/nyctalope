# Nyctalope.js

Javascript UI Kit to build apps/websites with both dark and light theming (like Mac OS Mojave)

## Packages

### Core

```shell
yarn add @nyctalope/core
```

Base references for:

- Color palettes (dark/light reference colors, system colors)
- Fonts (header fonts, text fonts, brand fonts)
- Screensizes (different screen sizes for various devices)

### React

```shell
yarn add @nyctalope/react
```

Library of React components and design tools

- Dark/light theming
- Cross platform (mobile/tablet/web/desktop)
- Accessibility (reduce animation option, high-contrast mode)
- Generate sketch files for single source of truth

Tooling:

- Context (Provider/Consumer) for React components
- Hooks (accessibility media queries , etc.)

### Doc (showroom)

```shell
yarn add @nyctalope/doc
```

Documentation style guide generator (Gatsby)

- Components showroom with examples
- Preview components in dark/light mode
- UI guidelines and principles

### Project starters

```shell
/starters # from git clone
```

Basic minimal app templates

- Ready-to-use
- Cross platform: Mobile, Tablet, Desktop
- Native/Standalone builder (Electron, ReactNative, ReactXP)
- Opt-in Typescript, prettier, etc.
