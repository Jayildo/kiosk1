import { useTranslation } from 'react-i18next';
import { useOSDetection } from '../../hooks/useOSDetection';
import type { AppStoreLinks, DeepLinks } from '../../types/app';

interface DownloadButtonProps {
  storeLinks: AppStoreLinks;
  deepLinks?: DeepLinks;
  isInstalled: boolean;
}

function AppleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function PlayStoreIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 010 1.38l-2.302 2.302L15.396 12l2.302-3.492zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" />
    </svg>
  );
}

function OpenIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

function buildIntentUrl(deepLinks: DeepLinks, fallbackUrl: string): string {
  const scheme = deepLinks.android?.replace('://', '') || '';
  const pkg = deepLinks.androidPackage || '';
  const encoded = encodeURIComponent(fallbackUrl);
  return `intent://#Intent;scheme=${scheme};package=${pkg};S.browser_fallback_url=${encoded};end`;
}

export default function DownloadButton({ storeLinks, deepLinks, isInstalled }: DownloadButtonProps) {
  const { t } = useTranslation('common');
  const os = useOSDetection();

  // "Open App" button for installed apps with deep links on Android
  const showOpenButton = isInstalled && deepLinks?.android && os === 'android';

  if (showOpenButton) {
    const intentUrl = buildIntentUrl(deepLinks!, storeLinks.android);
    return (
      <div className="flex flex-wrap gap-2">
        <a
          href={intentUrl}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-500 transition-colors"
        >
          <OpenIcon />
          {t('installed.openApp')}
        </a>
      </div>
    );
  }

  if (os === 'ios') {
    return (
      <a
        href={storeLinks.ios}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
      >
        <AppleIcon />
        {t('download.getOnAppStore')}
      </a>
    );
  }

  if (os === 'android') {
    return (
      <a
        href={storeLinks.android}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-500 transition-colors"
      >
        <PlayStoreIcon />
        {t('download.getOnPlayStore')}
      </a>
    );
  }

  // Desktop: show both buttons
  return (
    <div className="flex flex-wrap gap-2">
      <a
        href={storeLinks.ios}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white rounded-lg text-xs font-medium hover:bg-gray-700 transition-colors"
      >
        <AppleIcon />
        {t('download.getOnAppStore')}
      </a>
      <a
        href={storeLinks.android}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-500 transition-colors"
      >
        <PlayStoreIcon />
        {t('download.getOnPlayStore')}
      </a>
      {storeLinks.web && (
        <a
          href={storeLinks.web}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-500 transition-colors"
        >
          {t('download.visitWebsite')}
        </a>
      )}
    </div>
  );
}
