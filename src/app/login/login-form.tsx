'use client';

import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium">
          Nom d’utilisateur
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm"
        />
      </div>
      
      <input type="hidden" name="callbackUrl" value="/dashboard" />

      <button
        type="submit"
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        disabled={isPending}
      >
        Se connecter
      </button>

      {errorMessage && (
        <p className="text-sm text-red-500" aria-live="polite">
          {errorMessage}
        </p>
      )}
    </form>
  );
}

