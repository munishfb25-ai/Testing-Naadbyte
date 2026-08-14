import { wordpressContentProvider } from './src/services/providers/wordpress/wordpress-content-provider.ts';
import { wordpressConfig } from './src/services/providers/wordpress/config.ts';
wordpressContentProvider.getSongs().then(songs => {
  console.log("Songs:", songs);
}).catch(console.error);
