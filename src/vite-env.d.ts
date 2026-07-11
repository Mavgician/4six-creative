/// <reference types="vite/client" />

// Type declarations for vite-imagetools
// Allows importing images with query parameters like ?w=800&format=webp&quality=85

declare module '*?w=*&format=webp&quality=*' {
  const src: string;
  export default src;
}

declare module '*?w=*&format=webp' {
  const src: string;
  export default src;
}

declare module '*?format=webp&quality=*' {
  const src: string;
  export default src;
}

declare module '*?format=webp' {
  const src: string;
  export default src;
}

declare module '*?w=*' {
  const src: string;
  export default src;
}

declare module '*?w=*&format=webp&quality=*&as=metadata' {
  const metadata: { src: string; width: number; height: number; format: string };
  export default metadata;
}

declare module '*?w=*&format=webp&as=metadata' {
  const metadata: { src: string; width: number; height: number; format: string };
  export default metadata;
}
