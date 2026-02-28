export interface SocialLink {
  id: string;
  label: string;
  url: string;
  icon: string;
}

export const socials: SocialLink[] = [
  { id: 'github', label: 'GitHub', url: 'https://github.com/iamdecatalyst', icon: 'github' },
  { id: 'twitter', label: 'X / Twitter', url: 'https://x.com/iamdecatalyst', icon: 'twitter' },
  { id: 'instagram', label: 'Instagram', url: 'https://instagram.com/iamdecatalyst', icon: 'instagram' },
  { id: 'telegram', label: 'Telegram', url: 'https://t.me/iamdecatalyst', icon: 'send' },
  { id: 'reddit', label: 'Reddit', url: 'https://reddit.com/u/iamdecatalyst', icon: 'message-circle' },
  { id: 'email', label: 'Email', url: 'mailto:iamdecatalyst24@gmail.com', icon: 'mail' },
];
