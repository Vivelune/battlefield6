"use client";

import { useActionState } from "react";
import { submitSignup, type FormState } from "./actions";

const initial: FormState = { success: false };

export function SignupForm() {
  const [state, action, pending] = useActionState(submitSignup, initial);

  if (state.success) {
    return (
      <div className="relative bg-[#0d1526]/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-8 text-center">
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-cyan-400" />
        <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-cyan-400" />
        <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-cyan-400" />
        <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-cyan-400" />

        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/10 border border-green-400/40 mb-4">
          <svg
            className="w-6 h-6 text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <p className="font-orbitron text-sm tracking-[0.2em] uppercase text-green-400 mb-2">
          Access Granted
        </p>
        <p className="text-gray-300 text-sm">{state.message}</p>
      </div>
    );
  }

  return (
    <form
      action={action}
      className="relative space-y-5 max-w-md w-full bg-[#0d1526]/80 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6 sm:p-8"
    >
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-cyan-400/60" />
      <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-cyan-400/60" />
      <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-cyan-400/60" />
      <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-cyan-400/60" />

      {/* Header */}
      <div className="pb-4 mb-2 border-b border-white/5">
        <p className="text-[10px] tracking-[0.4em] uppercase text-cyan-400 font-orbitron mb-1">
          Enlist Now
        </p>
        <h3 className="font-orbitron text-lg font-bold text-white tracking-wide">
          SECURE YOUR SPOT
        </h3>
      </div>

      {["firstName", "lastName", "email", "phone"].map((name) => (
        <div key={name}>
          <label className="block text-[10px] tracking-[0.3em] uppercase text-gray-400 font-orbitron mb-2 capitalize">
            {name.replace(/([A-Z])/g, " $1")}
          </label>
          <input
            name={name}
            type={name === "email" ? "email" : name === "phone" ? "tel" : "text"}
            className="w-full bg-black/40 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 font-rajdhani tracking-wide focus:outline-none focus:border-cyan-400/60 focus:bg-black/60 focus:shadow-[0_0_20px_rgba(0,200,255,0.15)] transition-all duration-300"
          />
          {state.errors?.[name] && (
            <p className="mt-1.5 text-xs text-red-400 font-rajdhani tracking-wide flex items-center gap-1.5">
              <span className="inline-block w-1 h-1 rounded-full bg-red-400" />
              {state.errors[name][0]}
            </p>
          )}
        </div>
      ))}

      {/* Consent checkbox */}
      <label className="flex items-start gap-3 text-xs text-gray-400 font-rajdhani leading-relaxed cursor-pointer group pt-1">
        <input
          type="checkbox"
          name="consent"
          className="mt-0.5 w-4 h-4 shrink-0 appearance-none border border-white/20 rounded bg-black/40 checked:bg-cyan-500 checked:border-cyan-400 cursor-pointer transition-all duration-200 relative checked:after:content-['✓'] checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-black checked:after:text-[10px] checked:after:font-bold"
        />
        <span className="group-hover:text-gray-300 transition-colors">
          I agree to the{" "}
          <span className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
            terms and conditions
          </span>{" "}
          from Activision.
        </span>
      </label>
      {state.errors?.consent && (
        <p className="text-xs text-red-400 font-rajdhani tracking-wide flex items-center gap-1.5 -mt-2">
          <span className="inline-block w-1 h-1 rounded-full bg-red-400" />
          {state.errors.consent[0]}
        </p>
      )}

      {/* Submit button */}
      <button
        disabled={pending}
        className="group relative w-full px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-orbitron font-bold text-xs tracking-[0.25em] uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,200,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {pending ? (
            <>
              <svg
                className="w-4 h-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Submitting...
            </>
          ) : (
            <>
              Sign Up
              <svg
                className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </>
          )}
        </span>
        {!pending && (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
      </button>

      {/* Error message */}
      {state.message && !state.success && (
        <div className="flex items-start gap-2 px-4 py-3 bg-red-500/5 border border-red-500/30 rounded">
          <svg
            className="w-4 h-4 text-red-400 mt-0.5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          <p className="text-red-400 text-xs font-rajdhani tracking-wide">
            {state.message}
          </p>
        </div>
      )}
    </form>
  );
}