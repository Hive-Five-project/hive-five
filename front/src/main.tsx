import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@app/App';
import * as Translations from '@app/translations';

Translations.init();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
)
