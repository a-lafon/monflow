export interface User {
  display_name: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images:
  {
    url: string;
    height: number;
    width: number;
  }[];
  type: string;
  uri: string;
  country: string;
  product: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  email: string;
}