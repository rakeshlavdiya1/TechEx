import { useState, type ChangeEvent, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import Button from '../components/Button'

interface FormValues { name: string; company: string; email: string; phone: string; area: string; message: string }
type Errors = Partial<Record<keyof FormValues, string>>

const empty: FormValues = { name: '', company: '', email: '', phone: '', area: '', message: '' }
const AREAS = ['Cybersecurity', 'Business operations', 'Smart workspace / custom solution', 'Something else']

function validate(v: FormValues): Errors {
  const e: Errors = {}
  if (v.name.trim().length < 2) e.name = 'Enter your full name.'
  if (v.company.trim().length < 2) e.company = 'Enter your company name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Enter a valid email address, like name@company.com.'
  if (v.phone.trim() && !/^[+\d][\d\s()-]{6,18}$/.test(v.phone.trim())) e.phone = 'Use digits only, for example +1 555 123 4567.'
  if (!v.area) e.area = 'Choose the area you need help with.'
  if (v.message.trim().length < 10) e.message = 'Tell us a little more — at least 10 characters.'
  return e
}

const field = 'w-full rounded-xl border bg-ink-800/70 px-4 py-3 text-white placeholder:text-slate-500 transition-colors focus:border-cyan-glow focus:outline-none focus:ring-2 focus:ring-cyan-glow/30'

export default function ContactForm() {
  const [values, setValues] = useState<FormValues>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({})
  const [sent, setSent] = useState(false)

  const change = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...values, [e.target.name]: e.target.value }
    setValues(next)
    if (touched[e.target.name as keyof FormValues]) setErrors(validate(next))
  }
  const blur = (name: keyof FormValues) => { setTouched((t) => ({ ...t, [name]: true })); setErrors(validate(values)) }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    setTouched({ name: true, company: true, email: true, phone: true, area: true, message: true })
    if (Object.keys(found).length === 0) setSent(true) // Replace with a real API call when a backend is available.
  }

  const reset = () => { setValues(empty); setErrors({}); setTouched({}); setSent(false) }

  const renderField = (name: keyof FormValues, label: string, props: { type?: string; autoComplete?: string; placeholder?: string; optional?: boolean }) => {
    const err = touched[name] ? errors[name] : undefined
    return (
      <div>
        <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-slate-200">{label}{props.optional && <span className="ml-1 font-normal text-slate-500">(optional)</span>}</label>
        <input id={name} name={name} type={props.type ?? 'text'} autoComplete={props.autoComplete} placeholder={props.placeholder} value={values[name]} onChange={change} onBlur={() => blur(name)} aria-invalid={!!err} aria-describedby={err ? `${name}-error` : undefined} className={`${field} ${err ? 'border-red-400/70' : 'border-white/10'}`} />
        {err && <p id={`${name}-error`} role="alert" className="mt-1.5 text-sm text-red-300">{err}</p>}
      </div>
    )
  }

  return (
    <div className="glass rounded-3xl p-6 sm:p-9">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div key="ok" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="py-10 text-center" role="status">
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 15, delay: 0.1 }} className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-400/15 text-emerald-300"><CheckCircle2 size={44} aria-hidden /></motion.span>
            <h3 className="mt-6 text-2xl font-semibold">Thank you, {values.name.split(' ')[0]}.</h3>
            <p className="mx-auto mt-3 max-w-md text-slate-400">We have your message about {values.area.toLowerCase()} and will reply to {values.email}.</p>
            <div className="mt-8"><Button variant="secondary" onClick={reset} arrow={false}>Send another message</Button></div>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0 }} className="grid gap-5 sm:grid-cols-2" aria-label="Contact form">
            {renderField('name', 'Name', { autoComplete: 'name', placeholder: 'Your full name' })}
            {renderField('company', 'Company', { autoComplete: 'organization', placeholder: 'Your company' })}
            {renderField('email', 'Email', { type: 'email', autoComplete: 'email', placeholder: 'name@company.com' })}
            {renderField('phone', 'Phone', { type: 'tel', autoComplete: 'tel', placeholder: '+1 555 123 4567', optional: true })}
            <div className="sm:col-span-2">
              <label htmlFor="area" className="mb-1.5 block text-sm font-medium text-slate-200">Business area</label>
              <select id="area" name="area" value={values.area} onChange={change} onBlur={() => blur('area')} aria-invalid={!!(touched.area && errors.area)} aria-describedby={touched.area && errors.area ? 'area-error' : undefined} className={`${field} ${touched.area && errors.area ? 'border-red-400/70' : 'border-white/10'}`}>
                <option value="">Select an area</option>
                {AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
              {touched.area && errors.area && <p id="area-error" role="alert" className="mt-1.5 text-sm text-red-300">{errors.area}</p>}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-200">Tell us about your requirement</label>
              <textarea id="message" name="message" rows={5} value={values.message} onChange={change} onBlur={() => blur('message')} placeholder="How does this work today, and what would you like to change?" aria-invalid={!!(touched.message && errors.message)} aria-describedby={touched.message && errors.message ? 'message-error' : undefined} className={`${field} resize-y ${touched.message && errors.message ? 'border-red-400/70' : 'border-white/10'}`} />
              {touched.message && errors.message && <p id="message-error" role="alert" className="mt-1.5 text-sm text-red-300">{errors.message}</p>}
            </div>
            <div className="sm:col-span-2"><Button type="submit" size="lg" className="w-full sm:w-auto">Start a Conversation</Button></div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
