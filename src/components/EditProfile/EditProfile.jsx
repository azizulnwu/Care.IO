"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import {
  FaCircleExclamation,
  FaEnvelope,
  FaFloppyDisk,
  FaLink,
  FaLocationDot,
  FaLock,
  FaPhone,
  FaUser,
  FaXmark,
} from "react-icons/fa6";
import { updateUserProfile } from "@/action/server/auth";

// TODO: point this at your own server action (see the contract below).
// import { updateUserProfile } from "@/action/server/userData";

/**
 * updateUserProfile contract
 * --------------------------
 * Input : { name, phone, address, photo }   (all trimmed strings)
 * Output: { success: boolean, message?: string }
 *
 * The server action should identify the user from the server session,
 * never from a client-sent email or id, and map the fields to your
 * MongoDB document: name -> name, phone -> contact, address -> address,
 * photo -> image.
 */

/* ---------------------------------------------------------------------- */
/* Helpers                                                                 */
/* ---------------------------------------------------------------------- */
const PHONE_RE = /^(?:\+?88)?01[3-9]\d{8}$/; // Bangladesh mobile numbers

const isHttpUrl = (value) => {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
};

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "U";

const clean = (f) => ({
  name: (f.name ?? "").trim(),
  phone: (f.phone ?? "").trim(),
  address: (f.address ?? "").trim(),
  photo: (f.photo ?? "").trim(),
});

const confirmColors = {
  primary: "#1479C9",
  danger: "#e11d48",
  neutral: "#64748b",
};

/* ---------------------------------------------------------------------- */
/* Presentational field wrapper                                            */
/* ---------------------------------------------------------------------- */
const Field = ({ id, label, icon, required, error, hint, children }) => (
  <div className="form-control w-full">
    <label
      htmlFor={id}
      className="mb-1.5 flex items-center gap-2 text-sm font-medium text-[#132e49]"
    >
      <span aria-hidden="true" className="text-[#1479C9]">
        {icon}
      </span>
      <span>
        {label}
        {required && (
          <span aria-hidden="true" className="ml-0.5 text-rose-600">
            *
          </span>
        )}
      </span>
    </label>

    {children}

    {error ? (
      <p
        id={`${id}-error`}
        role="alert"
        className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-rose-700"
      >
        <FaCircleExclamation aria-hidden="true" className="mt-0.5 shrink-0" />
        {error}
      </p>
    ) : hint ? (
      <p id={`${id}-hint`} className="mt-1.5 text-xs text-[#132e49]/65">
        {hint}
      </p>
    ) : null}
  </div>
);

const inputClass = (hasError) =>
  `input input-bordered w-full bg-white text-sm text-[#041320] placeholder:text-[#132e49]/40 focus:outline-none focus:ring-4 ${
    hasError
      ? "border-rose-400 focus:border-rose-500 focus:ring-rose-200"
      : "border-[#132e49]/20 focus:border-[#1479C9] focus:ring-[#1479C9]/15"
  }`;

/* ---------------------------------------------------------------------- */
/* Component                                                               */
/* ---------------------------------------------------------------------- */
const EditProfile = ({ profile = {}, onCancel, onSuccess }) => {
  const router = useRouter();
  const { update } = useSession();

  const [form, setForm] = useState({
    name: profile.name ?? "",
    email: profile.email ?? "",
    phone: profile.phone ?? "",
    address: profile.address ?? "",
    photo: profile.photo ?? "",
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [photoFailed, setPhotoFailed] = useState(false);

  const baseline = clean(profile);
  const current = clean(form);
  console.log(current);
  const isDirty = Object.keys(baseline).some((k) => baseline[k] !== current[k]);

  const photoUrl = current.photo;
  const canPreview = Boolean(photoUrl) && isHttpUrl(photoUrl) && !photoFailed;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (name === "photo") setPhotoFailed(false);
  };

  const validate = () => {
    const found = {};

    if (!current.name) found.name = "Enter your full name.";
    else if (current.name.length < 2)
      found.name = "Your name must be at least 2 characters.";

    if (current.phone && !PHONE_RE.test(current.phone.replace(/[\s-]/g, "")))
      found.phone = "Enter a valid mobile number, like 01XXXXXXXXX.";

    if (current.photo && !isHttpUrl(current.photo))
      found.photo = "Enter a full image link starting with https://.";

    if (current.address.length > 250)
      found.address = "Keep your address under 250 characters.";

    return found;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saving) return;
    console.log(e.target.email.value);
    const found = validate();
    setErrors(found);

    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      toast.error("Please fix the highlighted fields.");
      document.getElementById(`edit-${firstInvalid}`)?.focus();
      return;
    }

    const confirmation = await Swal.fire({
      title: "Save changes?",
      text: "Your profile will be updated.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, save",
      cancelButtonText: "Keep editing",
      confirmButtonColor: confirmColors.primary,
      cancelButtonColor: confirmColors.neutral,
      reverseButtons: true,
    });
    if (!confirmation.isConfirmed) return;

    setSaving(true);
    const toastId = toast.loading("Saving your profile...");
    dataSaved();
  };

  const dataSaved = async () => {
    
    const res = await updateUserProfile(current, profile.email);
    console.log(res);
    if (!res?.success) {
      throw new Error(res?.message || "We couldn't update your profile.");
    }

    if (res.success === true) {
      console.log(res.success);
      signOut({ callbackUrl: "/login" });
      // router.push("/login");
    }
  };

  const handleCancel = async () => {
    if (saving) return;

    if (isDirty) {
      const discard = await Swal.fire({
        title: "Discard changes?",
        text: "Your unsaved changes will be lost.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Discard",
        cancelButtonText: "Keep editing",
        confirmButtonColor: confirmColors.danger,
        cancelButtonColor: confirmColors.neutral,
        reverseButtons: true,
      });
      if (!discard.isConfirmed) return;
    }

    onCancel?.();
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      {/* ---------- Photo ---------- */}
      <fieldset className="space-y-4" disabled={saving}>
        <legend className="mb-4 flex w-full items-center gap-3 text-base font-semibold text-[#041320]">
          <span>Profile photo</span>
          <span aria-hidden="true" className="h-px flex-1 bg-[#132e49]/10" />
        </legend>

        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
          <div
            className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#1479C9] text-2xl font-bold text-white shadow-md ring-4 ring-white outline outline-1 outline-[#132e49]/10"
            aria-hidden={!canPreview}
          >
            {canPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photoUrl}
                alt="Profile photo preview"
                referrerPolicy="no-referrer"
                onError={() => setPhotoFailed(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              getInitials(form.name)
            )}
          </div>

          <div className="w-full min-w-0 flex-1">
            <Field
              id="edit-photo"
              label="Photo link"
              icon={<FaLink />}
              error={errors.photo}
              hint={
                photoUrl && photoFailed && !errors.photo
                  ? "We couldn't load this image. Check the link and try again."
                  : "Paste a link to an image. Leave empty to show your initials."
              }
            >
              <input
                id="edit-photo"
                name="photo"
                type="url"
                inputMode="url"
                autoComplete="off"
                value={form.photo}
                onChange={handleChange}
                placeholder="https://example.com/photo.jpg"
                aria-invalid={Boolean(errors.photo)}
                aria-describedby={
                  errors.photo ? "edit-photo-error" : "edit-photo-hint"
                }
                className={inputClass(errors.photo)}
              />
            </Field>
          </div>
        </div>
      </fieldset>

      {/* ---------- Personal ---------- */}
      <fieldset className="space-y-5" disabled={saving}>
        <legend className="mb-4 flex w-full items-center gap-3 text-base font-semibold text-[#041320]">
          <span>Personal information</span>
          <span aria-hidden="true" className="h-px flex-1 bg-[#132e49]/10" />
        </legend>

        <div className="grid gap-5 md:grid-cols-2">
          <Field
            id="edit-name"
            label="Full name"
            icon={<FaUser />}
            required
            error={errors.name}
          >
            <input
              id="edit-name"
              name="name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              aria-required="true"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "edit-name-error" : undefined}
              className={inputClass(errors.name)}
            />
          </Field>

          <Field
            id="edit-email"
            label="Email address"
            icon={<FaEnvelope />}
            hint="Your email is your login, so it can't be changed here."
          >
            <div className="relative">
              <input
                id="edit-email"
                name="email"
                type="email"
                value={form.email}
                readOnly
                aria-readonly="true"
                aria-describedby="edit-email-hint"
                className="input input-bordered w-full cursor-not-allowed border-[#132e49]/10 bg-[#f1f4f7] pr-10 text-sm text-[#132e49]/70 focus:outline-none"
              />
              <FaLock
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#132e49]/45"
              />
            </div>
          </Field>
        </div>
      </fieldset>

      {/* ---------- Contact ---------- */}
      <fieldset className="space-y-5" disabled={saving}>
        <legend className="mb-4 flex w-full items-center gap-3 text-base font-semibold text-[#041320]">
          <span>Contact details</span>
          <span aria-hidden="true" className="h-px flex-1 bg-[#132e49]/10" />
        </legend>

        <Field
          id="edit-phone"
          label="Phone number"
          icon={<FaPhone />}
          error={errors.phone}
        >
          <input
            id="edit-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="01XXXXXXXXX"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "edit-phone-error" : undefined}
            className={`${inputClass(errors.phone)} tabular-nums`}
          />
        </Field>

        <Field
          id="edit-address"
          label="Address"
          icon={<FaLocationDot />}
          error={errors.address}
          hint={`${current.address.length}/250`}
        >
          <textarea
            id="edit-address"
            name="address"
            rows={3}
            autoComplete="street-address"
            value={form.address}
            onChange={handleChange}
            placeholder="House, road, area, district"
            aria-invalid={Boolean(errors.address)}
            aria-describedby={
              errors.address ? "edit-address-error" : "edit-address-hint"
            }
            className={`textarea textarea-bordered w-full resize-y bg-white text-sm text-[#041320] placeholder:text-[#132e49]/40 focus:outline-none focus:ring-4 ${
              errors.address
                ? "border-rose-400 focus:border-rose-500 focus:ring-rose-200"
                : "border-[#132e49]/20 focus:border-[#1479C9] focus:ring-[#1479C9]/15"
            }`}
          />
        </Field>
      </fieldset>

      {/* ---------- Actions ---------- */}
      <div className="flex flex-col gap-4 border-t border-[#132e49]/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p aria-live="polite" className="text-sm text-[#132e49]/70 sm:order-1">
          {isDirty ? "You have unsaved changes." : "No changes yet."}
        </p>

        <div className="flex flex-col-reverse gap-3 sm:order-2 sm:flex-row">
          <button
            type="button"
            onClick={handleCancel}
            disabled={saving}
            className="btn border border-[#132e49]/20 bg-white text-[#132e49] shadow-none hover:bg-[#f4f7fa] disabled:opacity-60"
          >
            <FaXmark aria-hidden="true" />
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving || !isDirty}
            aria-busy={saving}
            className="btn border-none bg-[#1479C9] text-white shadow-sm hover:bg-[#0f5f9f] disabled:bg-[#132e49]/15 disabled:text-[#132e49]/45"
          >
            {saving ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <FaFloppyDisk aria-hidden="true" />
            )}
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditProfile;
