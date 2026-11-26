
"use client";

import { useActionState } from "react";
import {
  createGroup,
  type CreateGroupState,
} from "@/lib/actions/groups";

const initialState: CreateGroupState = {};

export default function NewGroupPage() {
  const [state, formAction, isPending] = useActionState(
    createGroup,
    initialState
  );

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Create a Study Group
        </h1>

        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Create a group and bring people together to learn.
        </p>
      </div>

      <form action={formAction} className="space-y-6">
        {/* Group Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Group Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            defaultValue={state.values?.name ?? ""}
            placeholder="e.g. Web Development Study Group"
            aria-invalid={!!state.errors?.name}
            aria-describedby={state.errors?.name ? "name-error" : undefined}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-400"
          />

          {state.errors?.name && (
            <p
              id="name-error"
              role="alert"
              className="mt-2 text-sm text-red-600 dark:text-red-400"
            >
              {state.errors.name}
            </p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label
            htmlFor="subject"
            className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Subject
          </label>

          <input
            id="subject"
            name="subject"
            type="text"
            defaultValue={state.values?.subject ?? ""}
            placeholder="e.g. Computer Science"
            aria-invalid={!!state.errors?.subject}
            aria-describedby={
              state.errors?.subject ? "subject-error" : undefined
            }
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-400"
          />

          {state.errors?.subject && (
            <p
              id="subject-error"
              role="alert"
              className="mt-2 text-sm text-red-600 dark:text-red-400"
            >
              {state.errors.subject}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            rows={5}
            defaultValue={state.values?.description ?? ""}
            placeholder="Describe what your study group is about..."
            aria-invalid={!!state.errors?.description}
            aria-describedby={
              state.errors?.description ? "description-error" : undefined
            }
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-400"
          />

          {state.errors?.description && (
            <p
              id="description-error"
              role="alert"
              className="mt-2 text-sm text-red-600 dark:text-red-400"
            >
              {state.errors.description}
            </p>
          )}
        </div>

        {/* General Message */}
        {state.message && (
          <p role="status" className="text-sm text-slate-600 dark:text-slate-300">
            {state.message}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Creating Group..." : "Create Group"}
        </button>
      </form>
    </main>
  );
}
