import React from 'react';
import { createRoot } from 'react-dom/client';
import PackingListApp from './PackingListApp';

// Entry point rendering the PackingListApp into the page
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<PackingListApp />);
