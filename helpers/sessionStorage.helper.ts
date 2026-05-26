import { BrowserContext } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const sessionStoragePath = path.resolve(__dirname, '../.auth/session-storage.json');

export async function restoreSessionStorage(context: BrowserContext) {
  if (!fs.existsSync(sessionStoragePath)) {
    throw new Error(
      `Session storage file not found: ${sessionStoragePath}. Run auth.setup.ts first.`
    );
  }

  const sessionStorageData = JSON.parse(
    fs.readFileSync(sessionStoragePath, 'utf-8')
  );

  await context.addInitScript((storage) => {
    if (window.location.origin === 'https://qauto.forstudy.space') {
      for (const [key, value] of Object.entries(storage)) {
        window.sessionStorage.setItem(key, value as string);
      }
    }
  }, sessionStorageData);
}