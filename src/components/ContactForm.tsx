import { useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type FormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const EMPTY_VALUES: FormValues = { name: '', email: '', phone: '', message: '' };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): string | null {
  if (!values.name.trim()) return 'Please enter your name.';
  if (!EMAIL_PATTERN.test(values.email.trim())) return 'Please enter a valid email address.';
  if (!values.message.trim()) return 'Please write a short message.';
  return null;
}

const inputClass =
  'w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-neutral-800 placeholder:text-neutral-400 transition focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-secondary-400/60';

export default function ContactForm() {
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const updateField = (field: keyof FormValues) => (event: { target: { value: string } }) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationError = validate(values);
    if (validationError) {
      setErrorMessage(validationError);
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage(null);

    if (!supabase) {
      setErrorMessage('Online messages are temporarily unavailable. Please contact the temple office directly.');
      setStatus('error');
      return;
    }

    const { error } = await supabase.from('contact_messages').insert({
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim() || null,
      message: values.message.trim(),
    });

    if (error) {
      setErrorMessage('Your message could not be sent. Please try again in a moment.');
      setStatus('error');
      return;
    }

    setValues(EMPTY_VALUES);
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-success-100 bg-success-50 p-10 text-center">
        <CheckCircle2 className="h-14 w-14 text-success-700" />
        <h3 className="font-serif text-3xl font-semibold text-primary-700">Thank you for reaching out</h3>
        <p className="max-w-md text-neutral-700">Your message has been received. The temple office will get back to you soon.</p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-2 rounded-full bg-primary-700 px-6 py-2.5 text-sm font-semibold text-neutral-50 transition hover:bg-primary-600"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-neutral-700">Full name</span>
          <input
            className={inputClass}
            value={values.name}
            onChange={updateField('name')}
            maxLength={120}
            autoComplete="name"
            placeholder="Your name"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-neutral-700">Email</span>
          <input
            type="email"
            className={inputClass}
            value={values.email}
            onChange={updateField('email')}
            maxLength={200}
            autoComplete="email"
            placeholder="you@example.com"
          />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="text-sm font-semibold text-neutral-700">Phone (optional)</span>
        <input
          type="tel"
          className={inputClass}
          value={values.phone}
          onChange={updateField('phone')}
          maxLength={30}
          autoComplete="tel"
          placeholder="+91 00000 00000"
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-semibold text-neutral-700">Message</span>
        <textarea
          className={`${inputClass} min-h-36 resize-y`}
          value={values.message}
          onChange={updateField('message')}
          maxLength={2000}
          placeholder="Tell us about your visit, a pooja you would like to book, or a question about the temple"
        />
      </label>

      {status === 'error' && errorMessage && (
        <p role="alert" className="rounded-xl border border-error-100 bg-error-50 px-4 py-3 text-sm text-error-700">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex items-center gap-2 rounded-full bg-primary-700 px-7 py-3 text-sm font-semibold text-neutral-50 shadow-md transition hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === 'submitting' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {status === 'submitting' ? 'Sending...' : 'Send message'}
      </button>
    </form>
  );
}
